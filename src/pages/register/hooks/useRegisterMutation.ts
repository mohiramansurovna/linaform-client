import type { RegisterSchema } from '@/schemas';
import {useMutation} from '@tanstack/react-query';
import { z } from 'zod';

//@ts-ignore
const url=import.meta.env.VITE_API_URL as string;

export function useRegisterMutation() {
    return useMutation({
        mutationFn: async (data:z.infer<typeof RegisterSchema>) => {
            return await fetch(url+'/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(async res => {
                if (!res.ok) {
                    throw new Error((await res.json()).error);
                
                }
                return await res.json();
            });
        },
    });
}
