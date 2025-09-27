import {
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
    SidebarMenuAction,
} from '@/components/ui/sidebar.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import {Forward, Heart, MoreHorizontal, Trash2} from 'lucide-react';
import {useNoteStore} from '@/pages/note/hooks/useNoteStore.ts';
import {Link, useNavigate} from 'react-router';
import {useDeleteNote} from '@/pages/note/hooks/useNoteMutations.ts';
import type {Note} from '@/schemas.ts';

function NavNote({note}: { note: Note }) {
    const {isMobile} = useSidebar();
    const {setSelectedNoteId} = useNoteStore();
    const navigate = useNavigate();
    const deleteNote = useDeleteNote();

    const onClickNote = (noteId: string) => {
        setSelectedNoteId(noteId);
        navigate('/note');
    };

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <button onClick={() => onClickNote(note.id)}>
                    <Heart className="h-4 w-4 text-muted-foreground hover:text-primary"/>
                    <span>{note.title}</span>
                </button>
            </SidebarMenuButton>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                        <MoreHorizontal className="h-4 w-4"/>
                        <span className="sr-only">More</span>
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-48 rounded-lg"
                    side={isMobile ? 'bottom' : 'right'}
                    align={isMobile ? 'end' : 'start'}
                >
                    {note.isPublished && (
                        <>
                            <Link to={'/post/'+note.id}>
                            <DropdownMenuItem>
                                <Forward className="h-4 w-4 text-muted-foreground"/>
                                <span>View post</span>
                            </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator/>
                        </>
                    )}
                    <DropdownMenuItem onClick={() => deleteNote.mutate(note.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground"/>
                        <span>Delete Note</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    );
}

export default NavNote;
