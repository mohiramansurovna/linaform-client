import {useAuthStore} from '@/pages/dashboard/hooks/useAuthStore';
import {type Note, type UpdateNote} from '@/schemas';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNoteStore} from './useNoteStore';

export const useCreateNote = () => {
    const queryClient=useQueryClient();
    const {accessToken}=useAuthStore();
    const {setSelectedNoteId}=useNoteStore();
    return useMutation({
        mutationKey:['createNote'],
        mutationFn:async()=>{
            return await fetch('/api/note/', {
                method: 'POST',
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                    'Content-Type':'application/json',
                },
            }).then(async res => {
                if (!res.ok){
                    throw new Error((await res.json()).error || 'Failed to create note');
                }
                return (await res.json()) as Note;
            });
        },
        onSuccess: (note: Note) => {
            queryClient.invalidateQueries({queryKey: ['notes']});
            setSelectedNoteId(note.id);
        },
    });
};

export const useUpdateNote = () => {
    const queryClient = useQueryClient();
    const {accessToken} = useAuthStore();
    return useMutation({
        mutationKey: ['updateNote'],
        mutationFn: async ({id, ...data}: {id: string} & UpdateNote) => {
            await fetch(`/api/note/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(res => {
                if (!res.ok) throw new Error(res.status.toString());
                return;
            });
        },
        onError: statusCode => {
            console.log('Update failed', statusCode);
        },
        onSuccess: (_, {id}) => {
            queryClient.invalidateQueries({queryKey: ['note', id]});
            queryClient.invalidateQueries({queryKey: ['notes']});
        },
    });
};

export const useDeleteNote = () => {
    const queryClient = useQueryClient();
    const {accessToken} = useAuthStore();
    const {setSelectedNoteId} = useNoteStore();
    return useMutation({
        mutationKey: ['deleteNote'],
        mutationFn: async (id: string) => {
            await fetch(`/api/note/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then(res => {
                if (!res.ok) throw new Error(res.status.toString());
                return;
            });
        },
        onError: statusCode => {
            console.log('Delete failed', statusCode);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']});
            setSelectedNoteId(null);
        },
    });
};
