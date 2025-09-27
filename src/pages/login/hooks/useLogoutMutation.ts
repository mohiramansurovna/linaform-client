import {useMutation} from '@tanstack/react-query';
import {useAuthStore} from '@/pages/dashboard/hooks/useAuthStore.ts';
//@ts-ignore
const url = import.meta.env.VITE_API_URL as string;

export const useLogoutMutation = () => {
    const {clearAuth} = useAuthStore();
    return useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            const res = await fetch(url + '/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Logout failed');
        },
        onSuccess: () => {
            clearAuth();
        },
        onError: err => {
            console.error('Logout failed', err);
        },
    });
};