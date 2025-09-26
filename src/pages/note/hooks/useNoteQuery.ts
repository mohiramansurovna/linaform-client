import {useAuthStore} from '@/pages/dashboard/hooks/useAuthStore';
import {useNoteStore} from './useNoteStore';
import {useQuery} from '@tanstack/react-query';
import {NoteSchema, type Note} from '@/schemas';

//@ts-ignore
const url=import.meta.env.VITE_API_URL as string;

export const useNoteQuery = () => {
    const {accessToken} = useAuthStore();
    const {selectedNoteId} = useNoteStore();

    return useQuery({
        queryKey: ['note', selectedNoteId],
        queryFn: async () => {
            const res = await fetch(url+`/api/note/${selectedNoteId}`, {
                headers: {Authorization: `Bearer ${accessToken}`},
            });
            if (!res.ok) throw new Error('Failed to fetch note');
            const validation = NoteSchema.safeParse(await res.json());
            if (!validation.success) throw new Error('Note is not in expected schema');
            return validation.data as Note;
        },
        enabled: !!selectedNoteId,
        staleTime: 1000 * 60,
        //I am disabling retry when a token is expired
        retry: (_, error: Error) => {
            return !error.message.includes('Unauthorized');
        },
    });
};
