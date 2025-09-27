import {useAuthStore} from "@/pages/dashboard/hooks/useAuthStore.ts";
import {useUpdateNote} from "@/pages/note/hooks/useNoteMutations.ts";
import {useNoteQuery} from "@/pages/note/hooks/useNoteQuery.ts";
import {useNoteStore} from "@/pages/note/hooks/useNoteStore.ts";
import {useNoteSyncLocal} from "@/pages/note/hooks/useNoteSyncLocal.ts";
import {type Editor} from "@tiptap/react";
import {useEffect, useState} from "react";
import isEqual from "lodash.isequal";

/**
 * A custom hook that manages the synchronization of a note's content between
 * the local editor and the server.
 *
 * This hook provides functionality to:
 * 1. Automatically send note content to the server when navigating away from the page.
 * 2. Determine the synchronization status of the note (`upToDate`, `behind`, `loading`).
 * 3. Manually sync the local note content to the server.
 *
 * Dependencies:
 * - Relies on hooks such as `useCurrentEditor`, `useAuthStore`, `useNoteStore`,
 *   `useNoteQuery`, `useNoteSyncLocal`, and `useUpdateNote` for accessing editor state,
 *   authentication, notes data, and synchronization utilities.
 */
export const useNoteSyncServer = (editor:Editor) => {
    const {accessToken} = useAuthStore();
    const {selectedNoteId} = useNoteStore();
    const {data: note} = useNoteQuery();
    const {getLocalSync, localSyncStatus} = useNoteSyncLocal(editor);
    const updateNote = useUpdateNote();
    const [serverSyncStatus, setServerSyncStatus] = useState<'upToDate' | 'behind' | 'loading' | 'error'>('upToDate');
    /**
     * OPTIMIZE: batch multiple sync requests with a queue instead of immediate mutate() calls
     * OPTIMIZE: handle offline mode gracefully (e.g., store updates locally and retry when online)
     * OPTIMIZE: extract serverSyncStatus into a small state machine for more predictable transitions
     * OPTIMIZE: add exponential backoff for retries on network/server errors
     */
    //before leaving the page, send the note content to the server
    useEffect(() => {
        if (!editor || !selectedNoteId || !accessToken) return;
        const handleUnload = () => {

            //@ts-ignore
            const url = import.meta.env.VITE_API_URL as string;
            try {
                const json = editor.getJSON();
                const blob = new Blob(
                    [JSON.stringify({note: {id: selectedNoteId, content: json}, accessToken})],
                    {type: 'application/json'},
                );
                navigator.sendBeacon(url + `/api/note/autosave`, blob);
            } catch {
                console.error('Failed to send autosave request');
            }
        };
        window.addEventListener('beforeunload', handleUnload);
        return () => window.removeEventListener('beforeunload', handleUnload);
    }, [editor, selectedNoteId, accessToken]);


    useEffect(() => {
        const local = getLocalSync();
        if (!note || !local) return;
        try {
            setServerSyncStatus(isEqual(local, note.content) ? 'upToDate' : 'behind');
        } catch {
            setServerSyncStatus('behind');
        }
    }, [note, selectedNoteId, getLocalSync]);


    const syncToServer = () => {
        if (serverSyncStatus == 'loading') return;
        if (!note) return;
        setServerSyncStatus('loading');
        updateNote.mutate({
            id: note.id,
            title: note.title,
            content: editor?.getJSON() ?? {
                type: 'doc',
                content: [{type: 'paragraph'}],
            },
        });
    };
    useEffect(() => {
        if (updateNote.status === 'success')
            setServerSyncStatus('upToDate');
        if (updateNote.status === 'error')
            setServerSyncStatus('error');
    }, [updateNote.status]);

    useEffect(() => {
        if (localSyncStatus === 'saving' || localSyncStatus === 'saved') {
            setServerSyncStatus((prev) =>
                prev === 'upToDate' ? 'behind' : prev,
            );
        }
    }, [localSyncStatus, setServerSyncStatus]);


    return {
        serverSyncStatus,
        setServerSyncStatus,
        syncToServer,
    };
};

