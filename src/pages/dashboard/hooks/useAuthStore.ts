import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {z} from 'zod';
import type {UserSchema} from '@/schemas';

type User = z.infer<typeof UserSchema>;

type AuthState = {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    setAuth: (token: string, user: User) => void;
    setToken: (token: string) => void;
    clearAuth: () => void;
    initializeFromStorage: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,

            setAuth: (token, user) =>
                set({
                    accessToken: token,
                    user,
                    isAuthenticated: true,
                }),

            setToken: token =>
                set(state => ({
                    accessToken: token,
                    isAuthenticated: !!token,
                    user: state.user, // Preserve user
                })),

            clearAuth: () =>
                set({
                    accessToken: null,
                    user: null,
                    isAuthenticated: false,
                }),

            initializeFromStorage: () => {
                const state = get();
                if (state.accessToken && !state.isAuthenticated) {
                    set({isAuthenticated: true});
                }
            },
        }),
        {
            name: 'auth-store',
            partialize: state => ({
                accessToken: state.accessToken,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
