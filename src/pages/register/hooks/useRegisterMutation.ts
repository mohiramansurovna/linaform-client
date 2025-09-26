import type { RegisterSchema } from '@/schemas';
import {useMutation} from '@tanstack/react-query';
import { z } from 'zod';
export function useRegisterMutation() {
    return useMutation({
        mutationFn: async (data:z.infer<typeof RegisterSchema>) => {
            return await fetch('/api/auth/register', {
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
