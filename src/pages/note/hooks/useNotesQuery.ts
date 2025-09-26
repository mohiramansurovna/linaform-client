import type { Note } from '@/schemas';
import {useAuthStore} from '@/pages/dashboard/hooks/useAuthStore';
import {useQuery } from '@tanstack/react-query';

type NotesResponse = {
    notes: Note[];
    total: number;
    page: number;
    limit: number;
};

export const useNotesQuery = (page: number, limit = 7) => {
    const { accessToken } = useAuthStore();

    return useQuery<NotesResponse>({
        queryKey: ['notes', page],
        queryFn: async () => {
            const res = await fetch(`/api/note?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!res.ok) throw new Error('Failed to fetch notes');
            return res.json();
        }
    });
};



export const useNotesSearchQuery = (search: string, page:number, limit=7) =>{
    const {accessToken}=useAuthStore();
    return useQuery<NotesResponse>({
        queryKey:['notesSearch', search, page],
        queryFn:async()=>{
            return await fetch(`/api/note/search?term=${search}&page=${page}&limit=${limit}`,{
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                }
            }).then(async res=>{
                if(res.status===404) return [];
                if(!res.ok) throw new Error((await res.json()).error);
                return res.json();
            })
        },
        enabled:!!search,
    })
}
