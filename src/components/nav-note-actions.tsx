import {Loader, PenSquare} from 'lucide-react';
import {
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '../components/ui/sidebar';
import {useCreateNote} from '@/pages/note/hooks/useNoteMutations';
import {useNavigate} from 'react-router';
import {SearchInput} from '@/components/search-input.tsx';
import type {Dispatch, SetStateAction} from 'react';

export function NavNoteActions({value,setValue}: { value: string, setValue: Dispatch<SetStateAction<string>>}) {
    const createNote = useCreateNote();
    const navigate = useNavigate();

    const handleCreateNote = () => {
        createNote.mutate();
        navigate('/note');
    };

    return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        disabled={createNote.isPending}
                        tooltip="Create new"
                        onClick={handleCreateNote}
                    >
                        {createNote.isPending ? (
                            <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                            <PenSquare className="h-4 w-4" />
                        )}
                        <span>Create Note</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SearchInput Component={SidebarInput} classname="bg-transparent dark:bg-transparent border-none " value={value} setValue={setValue} placeholder={'Search notes...'} />
                </SidebarMenuItem>
            </SidebarMenu>
    );
}
