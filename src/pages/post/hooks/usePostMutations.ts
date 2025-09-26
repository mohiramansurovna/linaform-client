import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useAuthStore} from '@/pages/dashboard/hooks/useAuthStore.ts';
import {useParams} from 'react-router';


//@ts-ignore
const url=import.meta.env.VITE_API_URL as string;

export const usePostComment = () => {
    const queryClient = useQueryClient();
    const {accessToken} = useAuthStore();
    const {id} = useParams<{ id: string }>();
    return useMutation({
        mutationKey: ['postComment', id],
        mutationFn: async (content: string) => {
            return await fetch(url+`/api/post/${id}/comment`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({content}),
            }).then(async res => {
                if (!res.ok) {
                    throw new Error((await res.json()).error || 'Failed to post comment');
                }
                return true;
            });
        },
        onSuccess: async () => {
            return await queryClient.invalidateQueries({queryKey: ['post']}).then(() => {
                return true;
            }).catch(err => {
                console.log(err);
                return false;
            });
        },
    });
};

export const usePostView = () => {
    const {id} = useParams<{ id: string }>();
    return useMutation({
        mutationKey: ['postView', id],
        mutationFn: async () => {
            return await fetch(url+`/api/post/${id}/view`, {
                method: 'POST',
            }).then(async res => {
                if (!res.ok) {
                    console.log(res.status);
                }
            });
        },
    });
};

export const usePostLike = () => {
    const {id} = useParams<{ id: string }>();
    const {accessToken} = useAuthStore();
    return useMutation({
        mutationKey: ['postLike', id],
        mutationFn: async () => {
            return await fetch(url+`/api/post/${id}/like`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }).then(async res => {
                if (!res.ok) throw new Error("Failed to like");
                return res.json();
            });
        },
    });
};
export const usePostUnlike = () => {
    const {accessToken} = useAuthStore();
    return useMutation({
        mutationKey: ['postUnlike'],
        mutationFn: async (id: string) => {
            return await fetch(url+`/api/post/${id}/unlike`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }).then(async res => {
                if (!res.ok) {
                    console.log(res.status);
                }
            });
        },
    });
};