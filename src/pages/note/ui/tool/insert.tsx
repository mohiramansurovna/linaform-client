import {ImageIcon, Link,} from 'lucide-react';
import React, {lazy} from 'react';

const ImageDialog = lazy(() => import('@/pages/note/ui/dialogs/image-dialog.tsx'));
const LinkDialog = lazy(() => import('@/pages/note/ui/dialogs/link-dialog.tsx'));
import { Toggle } from '@/components/ui/toggle.tsx';
import type {Editor} from "@tiptap/react";

export default function Insert({editor}: {editor: Editor}) {
    const [imageDialog, setImageDialog] = React.useState(false);
    const [linkDialog, setLinkDialog]=React.useState(false);
    const buttons = [
        {
            onclick: () => setImageDialog(true),
            icon: ImageIcon,
            label: 'Insert Image',
            pressed:editor.isActive('image')
        },
        {
            icon:Link,
            onclick:()=>setLinkDialog(true),
            label:'Insert Link',
            pressed:editor.isActive('link')
        }
    ];

    return (
        <>
            {buttons.map((button, index) => (
                <Toggle title={button.label} key={index} pressed={button.pressed} onPressedChange={button.onclick}>
                    <button.icon />
                </Toggle>
            ))}
            <ImageDialog open={imageDialog} onOpenChange={setImageDialog} editor={editor} />
            <LinkDialog
                open={linkDialog}
                onOpenChange={setLinkDialog}
                editor={editor}
                defaultValue={{
                    url: editor.getAttributes('link').href || '',
                    color:
                        editor.getAttributes('link').class?.match(/text-(\w+)-500/)?.[1] || 'blue',
                    underline: editor.isActive('underline'),
                }}
            />
        </>
    );
}
