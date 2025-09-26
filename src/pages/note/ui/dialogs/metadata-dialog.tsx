import React, {useRef, useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter, DialogDescription,
} from '@/components/ui/dialog.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Textarea} from '@/components/ui/textarea.tsx';
import {Button} from '@/components/ui/button.tsx';
import {useUpdateNote} from '@/pages/note/hooks/useNoteMutations.ts';
import {useNoteStore} from '@/pages/note/hooks/useNoteStore.ts';
import {useNoteQuery} from '@/pages/note/hooks/useNoteQuery.ts';
import Tags from '@/pages/note/ui/dialogs/tags.tsx';
import type {Tag} from '@/schemas.ts';


function MetadataDialog({
                            open,
                            onOpenChange,
                        }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const [error, setError] = useState<string>();
    const updateNote = useUpdateNote();
    const {selectedNoteId} = useNoteStore();
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const {data: note} = useNoteQuery();
    const [selectedTags, setSelectedTags] = useState<Tag[]>(note?.tags || []);
    return note && (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="overflow-y-scroll scrollbar-custom max-h-screen">
                <DialogHeader>
                    <DialogTitle>Post details</DialogTitle>
                </DialogHeader>
                {error && <p className="text-red-500">{error}</p>}
                <DialogTitle>Title</DialogTitle>
                <Input defaultValue={note.title} type="text" ref={titleRef}/>
                <DialogDescription>Other users will be able to find your post with title</DialogDescription>
                <DialogTitle>Description</DialogTitle>

                <Textarea
                    defaultValue={note.description ?? ""}
                    ref={descriptionRef}
                    className='scrollbar-custom'
                /><DialogDescription>Write brief description about your overall post</DialogDescription>
                <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>

                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={() => {
                        setError(undefined);
                        if (titleRef.current && descriptionRef.current && selectedNoteId) {
                            const title = titleRef.current.value.trim();
                            const description = descriptionRef.current.value.trim();
                            if (title.length == 0) {
                                titleRef.current.focus();
                                setError('Title is required');
                                return;
                            }
                            if (description.length === 0) {
                                descriptionRef.current.focus();
                                setError('Description is required');
                                return;
                            }
                            updateNote.mutate({
                                id: selectedNoteId,
                                title,
                                description,
                                tags: selectedTags,
                            });
                            onOpenChange(false);
                        }
                    }}>Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(MetadataDialog);
