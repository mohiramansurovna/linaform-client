import {useMutation} from '@tanstack/react-query';

export const useTagsCreate = () => {
    return useMutation({
        mutationFn: async (label:string) => {
            const res=await fetch('/api/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({label}),
            });
            return await res.json();
        },
        onSuccess: (data) => {
            return data.tag;
        },
        onError: (err) => {
            console.error('failed to create', err);
        },
    });
}

export const useTagsDelete = () => useMutation({mutationFn: async (id:string) => {
   await fetch(`/api/tags/${id}`, {
        method: 'DELETE',
    })
}});