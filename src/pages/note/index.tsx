import ToolBarMenu from "@/pages/note/ui/toolbar.tsx";
import Content from '@/pages/note/ui/content.tsx';
import {useNoteStore} from '@/pages/note/hooks/useNoteStore.ts';
import {SquareDashedMousePointer} from 'lucide-react';
import {StarterKit} from '@tiptap/starter-kit';
import {Highlight} from '@tiptap/extension-highlight';
import {TextAlign} from '@tiptap/extension-text-align';
import {BackgroundColor, Color, FontSize, TextStyle} from '@tiptap/extension-text-style';
import {FontFamily} from '@tiptap/extension-font-family';
import {Image} from '@tiptap/extension-image';
import {Markdown} from "@tiptap/markdown"
import {useEditor} from '@tiptap/react';
export default function NotesPage() {
    const {selectedNoteId} = useNoteStore();
    const editor=useEditor({
        editable:!!selectedNoteId,
        extensions:[
            StarterKit,
            Highlight,
            TextAlign.configure({types: ['heading', 'paragraph']}),
            TextStyle,
            FontFamily,
            FontSize,
            Color,
            BackgroundColor,
            Image,
            Markdown]
    });
    return editor&&(
        <>
            <main className="flex flex-col">
                <ToolBarMenu editor={editor}/>
                <Content editor={editor}/>
            </main>
            {
                !selectedNoteId &&
                <div className="text-muted-foreground flex flex-col items-center justify-center h-full gap-4">
                    <SquareDashedMousePointer size={44}/>
                    No note is selected to open
                </div>
            }
        </>
    )
        ;
}
