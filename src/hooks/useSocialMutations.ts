import {useMutation} from '@tanstack/react-query';
import {queryClient} from '@/lib/react-query.ts';
import {useAuthStore} from '@/pages/dashboard/hooks/useAuthStore.ts';

export const useFollowMutation = () => {
    const {accessToken} = useAuthStore();
    return useMutation({
        mutationKey: ['follow'],
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/social/follow/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user']});
        },
        onError: (err) => {
            console.error('failed to follow', err);
        },
    });
};
export const useUnfollowMutation = () => {
    const {accessToken} = useAuthStore();
    return useMutation({
        'mutationKey': ['unfollow'],
        'mutationFn': async (id: string) => {
            const res = await fetch(`/api/social/unfollow/${id}`, {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            return await res.json();
        },
        'onSuccess': () => {
            queryClient.invalidateQueries({'queryKey': ['user']});
        },
    });
};