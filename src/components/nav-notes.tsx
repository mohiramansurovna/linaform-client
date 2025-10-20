import {type Dispatch, type SetStateAction} from 'react';
import {AlertCircle, ChevronsLeft, ChevronsRight, Pen} from 'lucide-react';
import {MoreHorizontal} from 'lucide-react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarSeparator, useSidebar,
} from '../components/ui/sidebar';
import {useNotesQuery, useNotesSearchQuery} from '@/pages/note/hooks/useNotesQuery';
import {useState} from 'react';
import NavNote from '@/components/nav-note.tsx';
import {NavNoteActions} from '@/components/nav-note-actions.tsx';

export function NavNotes() {
    const [page, setPage] = useState(1);
    const {data, isLoading, error} = useNotesQuery(page);
    const notes = data?.notes ?? [];
    const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

    const [term, setTerm] = useState('');
    const [searchPage, setSearchPage] = useState(1);
    const {data: searchData, isLoading: searchLoading, error: searchError} = useNotesSearchQuery(term, searchPage);
    const searchNotes = searchData?.notes ?? [];
    const totalSearchPages = searchData ? Math.ceil(searchData.total / searchData.limit) - 1 : 1;

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel></SidebarGroupLabel>
            <NavNoteActions value={term} setValue={setTerm}/>
            <SidebarSeparator/>
            <SidebarGroupLabel>Notes</SidebarGroupLabel>
            <SidebarMenu className="max-h-[calc(100vh-12rem)] overflow-y-none">
                {(isLoading || (searchLoading && term !== '')) ? (
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-muted-foreground">
                            <MoreHorizontal className="h-4 w-4"/>
                            <span>Loading...</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ) : (error || (searchError && term !== '')) ? (
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-destructive">
                            <AlertCircle className="h-4 w-4"/>
                            <span>{(error || searchError)?.message}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ) : term === '' ?
                    (notes?.length ? <>
                        {notes.map((note) => (
                            <NavNote note={note} key={note.id}/>
                        ))}
                        {totalPages > 1 && (
                            <div className="flex justify-center *:w-full">
                                <button
                                    className="place-items-center"
                                    disabled={page === 1}
                                    onClick={() => setPage((p) => p - 1)}
                                ><ChevronsLeft color={page == 1 ? '#71717b50' : '#8e51ff'} size={20}/></button>
                                <MoreHorizontal color={'#8e51ff'} size={20}/>
                                <button
                                    className="place-items-center"
                                    disabled={page === totalPages}
                                    onClick={() => setPage((p) => p + 1)}
                                ><ChevronsRight color={page == totalPages ? '#71717b50' : '#8e51ff'} size={20}/></button>
                            </div>
                        )}
                    </> : <p className="text-gray-500 self-center text-sm p-2">No notes found</p>) :
                    (searchNotes?.length ?
                        <>
                            {searchNotes.map((note) => (
                                <NavNote note={note} key={note.id}/>
                            ))}
                            {totalSearchPages > 1 && (
                                <div className="flex justify-center *:w-full">
                                    <button
                                        className="place-items-center"
                                        disabled={searchPage === 1}
                                        onClick={() => setSearchPage((p) => p - 1)}
                                    ><ChevronsLeft color={searchPage == 1 ? '#71717b50' : '#8e51ff'} size={20}/></button>
                                    <MoreHorizontal color={'#8e51ff'} size={20}/>
                                    <button
                                        className="place-items-center"
                                        disabled={searchPage === totalSearchPages}
                                        onClick={() => setSearchPage((p) => p + 1)}
                                    ><ChevronsRight color={searchPage == totalSearchPages ? '#71717b50' : '#8e51ff'} size={20}/></button>
                                </div>
                            )}
                        </>
                        : <p className="text-gray-500 text-sm p-2">No matches</p>)
                }

            </SidebarMenu>
        </SidebarGroup>
    );
}

export function Notes({setNav, nav}: {
    setNav: Dispatch<SetStateAction<'notifications' | 'notes' | 'posts'>>;
    nav: 'notes' | string;
}) {
    const isActive = nav === 'notes';
    const {setOpen} =useSidebar()
    return (
        <button
            onClick={() =>{ setNav('notes'); setOpen(true)}}
            title="Notes"
            className={`
        grid place-items-center size-8 rounded-2xl shadow-md transition
        hover:scale-105 hover:bg-zinc-200 dark:hover:bg-zinc-700
        ${isActive ? 'bg-zinc-100 dark:bg-zinc-800' : ''}
      `}
        >
            <Pen
                className={`h-5 w-5 ${isActive ? 'text-violet-500' : 'text-zinc-500 dark:text-zinc-800'}`}
            />
        </button>
    );
}
