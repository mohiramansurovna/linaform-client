import {Button} from '@/components/ui/button.tsx';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip.tsx';
import {useNoteSyncLocal} from "@/pages/note/hooks/useNoteSyncLocal.ts";
import {useNoteSyncServer} from "@/pages/note/hooks/useNoteSyncServer.ts";
import {Undo, Redo, Clock, CheckCheck, Loader2, ClockAlert} from 'lucide-react';
import React from 'react';
import {type Editor} from '@tiptap/react';
import {useNoteQuery} from '../../hooks/useNoteQuery.ts';

function Metadata({editor}: { editor: Editor }) {
    const {data: note} = useNoteQuery();
    const {localSyncStatus} = useNoteSyncLocal();
    const {serverSyncStatus, syncToServer} = useNoteSyncServer();
    return (
        note && (
            <>
                <div className='w-36 flex items-baseline gap-0'>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className="size-7"
                            disabled={!editor.can().undo()}
                            onClick={() => editor.commands.undo()}>
                            <Undo/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Undo last action</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className="size-7"
                            disabled={!editor.can().redo()}
                            onClick={() => editor.commands.redo()}>
                            <Redo/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Redo last action</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="w-22 mx-0 text-center">
                            {localSyncStatus === 'saving' && (
                                <p className="text-sm text-yellow-500">Saving</p>
                            )}
                            {localSyncStatus === 'saved' && (
                                <p className="text-sm text-green-500">Saved</p>
                            )}
                            {localSyncStatus === 'idle' && (
                                <p className="text-sm text-gray-500">Idle</p>
                            )}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        {localSyncStatus === 'saving' && <p>Saving to local backup...</p>}
                        {localSyncStatus === 'saved' && <p>Saved locally</p>}
                        {localSyncStatus === 'idle' && <p>No changes yet</p>}
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            aria-label="Sync Note with Server"
                            variant="ghost"
                            onClick={syncToServer}>
                            {serverSyncStatus == 'behind' ? (
                                <Clock className="text-gray-500"/>
                            ) : serverSyncStatus == 'upToDate' ? (
                                <CheckCheck className="text-emerald-500"/>
                            ) : serverSyncStatus == 'loading' ? (
                                <Loader2 className="text-blue-500 animate-spin"/>
                            ) : (
                                <ClockAlert className="text-red-500"/>
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {serverSyncStatus == 'behind' ? (
                            <p>Sync changes to server</p>
                        ) : serverSyncStatus == 'upToDate' ? (
                            <p>Up to date with server</p>
                        ) : serverSyncStatus == 'loading' ? (
                            <p>Syncing changes to server...</p>
                        ) : (
                            <p>Sync failed</p>
                        )}
                    </TooltipContent>
                </Tooltip>
                </div>
                <div className="md:w-full flex items-end flex-col ">
                    <p className=" md:text-2xl w-auto text-nowrap max-w-full text-ellipsis">
                        {note.title}
                    </p>
                    <p className='md:hidden block text-xs text-muted-foreground'>{note.createdAt.toLocaleDateString('GB',{
                         day:'2-digit',
                         month:'short',
                         year:'numeric'
                    })}</p>
                    <p className="text-muted-foreground text-xs md:block hidden">
                            created:
                        <span className='ml-2'>{note.createdAt.toLocaleDateString(undefined, {
                            hour: '2-digit',
                            minute: '2-digit',
                            day: '2-digit',
                            month: 'short',
                            hour12: false,
                        })}</span>
                    </p>
                    <p className="text-muted-foreground text-xs md:block hidden">
                        updated:
                        <span className="ml-2">{note.updatedAt.toLocaleDateString(undefined, {
                            hour: '2-digit',
                            minute: '2-digit',
                            day: '2-digit',
                            month: 'short',
                            hour12: false,
                        })}</span>
                    </p>
                </div>

            </>
        )
    );
}

export default React.memo(Metadata);
