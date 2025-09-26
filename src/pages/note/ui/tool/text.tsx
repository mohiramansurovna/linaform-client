import {Toggle} from '@/components/ui/toggle.tsx';
import {type Editor} from '@tiptap/react';
import {Bold, Italic, Underline, Strikethrough, Code, Highlighter} from 'lucide-react';
import {useCallback} from 'react';

export default function Text({editor}: { editor: Editor }) {
    const toggle = [
        {label: 'bold', command: 'toggleBold', icon: Bold},
        {label: 'italic', command: 'toggleItalic', icon: Italic},
        {label: 'underline', command: 'toggleUnderline', icon: Underline},
        {label: 'strike-through', command: 'toggleStrike', icon: Strikethrough},
        {label: 'code', command: 'toggleCode', icon: Code},
        {label: 'highlight', command: 'toggleHighlight', icon: Highlighter},
    ];
    const makeHandler = useCallback((command:string) => () => {
        //@ts-expect-error it will only use the exact command
        editor.chain().focus()[command]().run();
    }, [editor]);
    return (
        <>
            {toggle.map(each => (
                <Toggle
                    key={each.label}
                    pressed={editor.isActive(each.label)}
                    onPressedChange={makeHandler(each.command)}
                    className="size-7"
                    title={each.label}>
                    <each.icon/>
                </Toggle>
            ))}
        </>
    );
}
