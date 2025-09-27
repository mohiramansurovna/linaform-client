import {useNoteSyncLocal} from "@/pages/note/hooks/useNoteSyncLocal.ts";
import {useEffect} from 'react';
import {type Editor, EditorContent} from '@tiptap/react';
import {useNoteQuery} from '../hooks/useNoteQuery.ts';
import {useSyncFonts} from '@/hooks/useSyncFonts.ts';
import {remapColors} from '@/lib/normalize-colors.ts';
import {useThemeStore} from '@/hooks/useThemeStore.ts';
import {LoadingSmall} from '@/components/loading.tsx';

/**
 * Renders the content of the current note using an editor instance. It manages the synchronization of note content
 * and resets the editor content when switching between notes.
 *
 * This component uses hooks to fetch the current note data and editor instance, and initializes the editor content
 * with either the locally synced backup or the note content. If no note is selected, it displays a message indicating
 * that no note is selected.
 */

export default function Content({editor}:{editor:Editor}) {
    const {data: note, isLoading, isError} = useNoteQuery();

    const {getLocalSync} = useNoteSyncLocal(editor);
    const {syncFonts} = useSyncFonts();
    const {theme} = useThemeStore();

    //this loads all fonts
    useEffect(() => {
        if (note) {
            syncFonts(note.content);
        }
    }, [syncFonts, note]);

    //this resets the content when I move to a different note
    useEffect(() => {
        if (editor && note) {
            const content = note.content || {
                type: 'doc',
                content: [{type: 'paragraph', content: []}],
            };
            const backup = getLocalSync();
            if (backup) {
                editor.commands.setContent(backup);
            } else if (content) {
                editor.commands.setContent(content);
            }
        }
    }, [note, editor, getLocalSync]);

    useEffect(() => {
        if (!editor || !note) return;
        const result = remapColors(editor.getJSON(), theme == 'dark');
        editor.commands.setContent(result);
    }, [theme, editor, note]);

    useEffect(() => {
        if (!editor) return;
        editor.setEditable(note != null);
    }, [note, editor]);

    if (isError) return <div>Error</div>;
    return editor && note && (
        <LoadingSmall isLoading={isLoading}>
            <div
                className="min-h-[85vh] relative bg-card min-w-2/3 max-w-[75vw] overflow-x-hidden self-center px-6 py-4 my-2 shadow-2xl cursor-text"
                onClick={() => editor?.chain().focus().run()}>
                <EditorContent
                    editor={editor}
                   className="
  [&_.ProseMirror]:focus:outline-none
  [&_.ProseMirror]:text-base
  [&_.ProseMirror]:text-primary
  [&_.ProseMirror]:leading-relaxed
  [&_.ProseMirror]:min-h-[80vh]
  [&_.ProseMirror]:whitespace-pre-wrap
"
                />
            </div>
        </LoadingSmall>
    );
}
