import {useAuthStore} from '@/pages/dashboard/hooks/useAuthStore';
import type {LoginResponceSchema, LoginSchema} from '@/schemas';
import {useMutation} from '@tanstack/react-query';
import {z} from 'zod';
export function useLoginMutation() {
    const {setAuth} = useAuthStore();
    return useMutation({
        mutationFn: async (data: z.infer<typeof LoginSchema>) => {
            return await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            }).then(async res => {
                if (!res.ok) {
                    throw new Error((await res.json()).error);
                }
                return await res.json();
            });
        },
        onSuccess: (data: z.infer<typeof LoginResponceSchema>) => {
            setAuth(data.accessToken, data.user);
            localStorage.setItem('token', data.accessToken);
        },
    });
}
