import {debounce} from "@/lib/debounce.ts";
import {useNoteStore} from "@/pages/note/hooks/useNoteStore.ts";
import {useCurrentEditor} from "@tiptap/react";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
/**
 * A custom hook that handles the local synchronization of note content with the browser's localStorage.
 * It monitors editor updates, saves note content locally, and provides the synchronization status.
 */
export const useNoteSyncLocal = () => {
    const {selectedNoteId} = useNoteStore();
    const {editor} = useCurrentEditor();
    const [localSyncStatus, setLocalSyncStatus] = useState<'saving' | 'saved' | 'idle'>('idle');
    /**
     * OPTIMIZE: replace custom debounce with `use-debounce` or `useDebouncedCallback` to avoid stale closure bugs
     * OPTIMIZE: consider using editor.storage or IndexedDB instead of localStorage for faster/more reliable caching
     * OPTIMIZE: switch from multiple useState calls to useReducer for clearer status state transitions
     * OPTIMIZE: expose an "immediateSave" method for edge cases (e.g., critical autosave)
     */

    const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedSave = useMemo(() =>
            debounce(() => {
                if (!editor) return;
                const content = editor.getJSON();
                localStorage.setItem(`note-${selectedNoteId}`, JSON.stringify(content));
                setLocalSyncStatus('saved');
                if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
                idleTimeoutRef.current = setTimeout(() => {
                    setLocalSyncStatus('idle');
                }, 3000);
            }, 3000),
        [selectedNoteId, editor]);

    const saveToLocal = useCallback(() => {
        setLocalSyncStatus('saving');
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
        debouncedSave();
    }, [debouncedSave]);

    // this is for an update
    useEffect(() => {
        if (!editor) return;

        editor.on('update', saveToLocal);
        return () => {
            editor.off('update', saveToLocal);
            if (idleTimeoutRef.current) {
                clearTimeout(idleTimeoutRef.current);
            }
        };
    }, [editor, saveToLocal]);

    const getLocalSync = useCallback(() => {
            try {
                const backup = localStorage.getItem(`note-${selectedNoteId}`);

                return backup ? JSON.parse(backup) : null;
            } catch {
                return null;
            }
        }, [selectedNoteId],
    );
    const clearLocalSync = () => {
        localStorage.removeItem(`note-${selectedNoteId}`);
    };

    return {
        localSyncStatus,
        getLocalSync,
        clearLocalSync,
    };
};