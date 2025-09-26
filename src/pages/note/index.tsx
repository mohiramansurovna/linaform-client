import ToolBarMenu from "@/pages/note/ui/toolbar.tsx";
import {EditorProvider} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import {TextStyle, FontSize, Color, BackgroundColor} from '@tiptap/extension-text-style';
import Image from '@tiptap/extension-image';
import Content from '@/pages/note/ui/content.tsx';
import {useNoteStore} from '@/pages/note/hooks/useNoteStore.ts';
import {SquareDashedMousePointer} from 'lucide-react';

export default function NotesPage() {
    const {selectedNoteId} = useNoteStore();
    return (
        <EditorProvider
            extensions={[
                StarterKit,
                Highlight,
                TextAlign.configure({types: ['heading', 'paragraph']}),
                TextStyle,
                FontFamily,
                FontSize,
                Color,
                BackgroundColor,
                Image,
            ]}
        >
            <main className="flex flex-col">
                <ToolBarMenu/>
                <Content/>
            </main>
            {!selectedNoteId &&
                <div className="text-muted-foreground flex flex-col items-center justify-center h-full gap-4">
                    <SquareDashedMousePointer size={44}/>
                    No note is selected to open
                </div>}
        </EditorProvider>);
}
