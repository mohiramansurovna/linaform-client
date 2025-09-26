import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import React, {useState} from 'react';
import {Label} from '@/components/ui/label.tsx';
import { useCurrentEditor } from '@tiptap/react';

function LinkDialog({
    open,
    onOpenChange,
    defaultValue={
    url: '',
    color: 'blue',
    underline: true,
    }
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultValue?:{
        url: string;
        color: 'blue' | 'emerald' | 'amber' | 'gray' | 'purple';
        underline: boolean;
    };
}) {
    const {editor}=useCurrentEditor();
    const [url, setUrl] = useState(defaultValue.url);
    const [color, setColor] = useState<'blue' | 'emerald' | 'amber' | 'gray' | 'purple'>(defaultValue.color);
    const [underline, setUndeline] = useState(defaultValue.underline);
    const addLink = (inside: {url: string | null; color: string; underline: boolean} | null) => {
        if (!editor) return;
        editor.chain().focus();
        if (inside?.url) {
            editor
                .chain()
                .focus()
                .setLink({
                    href: inside.url,
                    class: `text-${inside.color}-500 ${inside.underline ? 'underline' : ''}`,
                })
                .run();
        } else {
            editor.chain().focus().unsetLink().run();
        }
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Insert Link</DialogTitle>
                </DialogHeader>

                <Input
                    type='url'
                    placeholder='https://example.com'
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
                <div className='flex gap-2 items-center'>
                    <input
                        type='button'
                        onClick={() => setColor('blue')}
                        name='color'
                        className={`${
                            color == 'blue'
                                ? 'size-5 outline-2 border-2 border-white outline-blue-500'
                                : 'size-4'
                        } rounded-full bg-blue-500 `}
                    />
                    <input
                        type='button'
                        onClick={() => setColor('emerald')}
                        name='color'
                        className={`${
                            color == 'emerald'
                                ? 'size-5 outline-2 border-2 border-white outline-emerald-500'
                                : 'size-4'
                        } rounded-full bg-emerald-500 `}
                    />
                    <input
                        type='button'
                        onClick={() => setColor('amber')}
                        name='color'
                        className={`${
                            color == 'amber'
                                ? 'size-5 outline-2 border-2 border-white outline-amber-500'
                                : 'size-4'
                        } rounded-full bg-amber-500 `}
                    />
                    <input
                        type='button'
                        onClick={() => setColor('gray')}
                        name='color'
                        className={`${
                            color == 'gray'
                                ? 'size-5 outline-2 border-2 border-white outline-gray-500'
                                : 'size-4'
                        } rounded-full bg-gray-500 `}
                    />
                    <input
                        type='button'
                        onClick={() => setColor('purple')}
                        name='color'
                        className={`${
                            color == 'purple'
                                ? 'size-5 outline-2 border-2 border-white outline-purple-500'
                                : 'size-4'
                        } rounded-full bg-purple-500 `}
                    />
                </div>
                
                <Label className='text-sm w-full font-medium mt-2'>
                    <Input
                    className='size-4 mr-2'
                        type='checkbox'
                        onChange={() => setUndeline(!underline)}
                        defaultChecked={true}
                    />
                    Underline
                </Label>
                <DialogFooter>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            setUrl('');
                            addLink(null);
                            onOpenChange(false);
                        }}>
                        Remove
                    </Button>
                    <Button
                        onClick={() => {
                            addLink({
                                url,
                                color,
                                underline
                            });
                            onOpenChange(false);
                        }}>
                        Apply
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export default React.memo(LinkDialog)