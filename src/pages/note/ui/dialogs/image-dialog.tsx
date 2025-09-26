import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import type { Editor } from '@tiptap/core';
import { CircleQuestionMark } from 'lucide-react';

function ImageDialog({
    open,
    onOpenChange,
    editor,    
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editor:Editor
}) {
    const [url, setUrl]=React.useState<string>('');
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Insert Link for the Image</DialogTitle>
                </DialogHeader>
                <a className='text-zinc-600  text-xs hover:underline font-semibold'>
                    <CircleQuestionMark size={14} className='inline mr-1' />
                    Learn how to insert image urls
                </a>
                <Input type='url' value={url} onChange={(e)=>setUrl(e.target.value)} placeholder='https://example.com' />
                <DialogFooter>
                    <Button variant='secondary'>Cancel</Button>
                    <Button onClick={() => {
                        if (url && editor) {
                            editor.chain().focus().setImage({src: url}).run();
                            onOpenChange(false);
                        }
                    }}>Insert</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export default React.memo(ImageDialog)
