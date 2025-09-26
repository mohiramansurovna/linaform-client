import {Button} from "@/components/ui/button.tsx";
import {useNoteQuery} from "@/pages/note/hooks/useNoteQuery.ts";
import {useDeleteNote, useUpdateNote} from "@/pages/note/hooks/useNoteMutations.ts";
import MetadataDialog from '@/pages/note/ui/dialogs/metadata-dialog.tsx';
import {useState} from 'react';
import {ChevronsRight, CircleMinus, FilePen,} from 'lucide-react';
import {AnimatePresence, motion} from 'framer-motion';
import type {Editor} from '@tiptap/react';
import {LoadingButton} from '@/components/loading.tsx';

export default function File({editor}:{editor:Editor}) {
    const {data: note} = useNoteQuery();
    const updateNote = useUpdateNote();
    const [openMeta, setOpenMeta] = useState(false);
    const deleteNote = useDeleteNote();
    return note && (
        <>
            <Button variant="outline" onClick={() => setOpenMeta(true)}>
                <FilePen/> Edit
            </Button>
            <Button variant='outline' onClick={() =>deleteNote.mutate(note.id)}>
                <CircleMinus/> Delete
            </Button>
                <AnimatePresence mode="wait">
                    {note.isPublished ? (
                        <motion.div
                            key="published"
                            className="flex gap-2 h-full *:h-full"
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: 20}}
                            transition={{duration: 0.25}}
                        >
                            <LoadingButton
                                title="This note is already published. Click to unpublish"
                                variant="outline"
                                disabled={updateNote.isPending}
                                className={updateNote.isPending ? 'cursor-not-allowed' : ''}
                                onClick={() => {
                                    updateNote.mutate({
                                        id: note.id,
                                        title: note.title,
                                        content: note.content,
                                        isPublished: false,
                                    });
                                }}
                            >
                                Unpublish
                            </LoadingButton>

                            <a href={'/post/' + note.id}>
                                <Button className='h-full' disabled={!updateNote.isSuccess} variant="ghost">
                                    View Post <ChevronsRight className="inline size-5"/>
                                </Button>
                            </a>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="unpublished"
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: 20}}
                            transition={{duration: 0.25}}
                        >
                            <LoadingButton
                                className={'h-full'}
                                disabled={updateNote.isPending}
                                title="After publishing, the note and its future updates will be visible to the public."
                                onClick={() => {
                                    if(note.title=='New note'||note.description==""|| !note.tags){
                                        setOpenMeta(true)
                                        return
                                    }
                                    updateNote.mutate({
                                        id: note.id,
                                        title: note.title,
                                        content: editor?.getJSON() ?? note.content,
                                        isPublished: true,
                                        publishedAt:new Date(Date.now())
                                    });
                                }}
                            >
                                Publish
                            </LoadingButton>
                        </motion.div>
                    )}
                </AnimatePresence>
                <MetadataDialog open={openMeta} onOpenChange={setOpenMeta}/>
        </>
);
}
