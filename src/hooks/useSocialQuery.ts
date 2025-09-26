import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {useAuthStore} from '@/pages/dashboard/hooks/useAuthStore.ts';
import type {Post, User} from '@/schemas.ts';

export const useLikedPostsQuery = () => {
    const { accessToken } = useAuthStore();

    return useInfiniteQuery({
        queryKey: ['likedPosts'],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await fetch(`/api/social/likedPosts/${pageParam}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return await res.json() as { likes: { note: Post }[]; nextPage: number | null };
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};



export const useAuthorsQuery = () => {
    const {accessToken} = useAuthStore();

    return useQuery({
        queryKey: ['following'],
        queryFn: async () => {
            const res = await fetch(`/api/social/following`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!res.ok) throw new Error('Failed to authors notes');
            return await res.json() as User[]
        },
    });
};

type SelectedUser={
    id:string,
    username:string,
    email:string,
    followers:{
        id:string,
        username:string,
    }[],
    following:{
        id:string,
        username:string,
    }[],
}
export const useUserQuery = (userId:string|null) => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch('/api/social/user/'+userId);
            return await res.json() as SelectedUser;
        },
        //BBUILD:make it faster
        enabled: !!userId

    });
}
export const useAuthorPosts=(authorId:string|null)=>{
    return useInfiniteQuery({
        queryKey: ['authorPosts'],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await fetch(`/api/social/authorPosts/${authorId}/${pageParam}`);
            return await res.json() as { posts:Post[]; nextPage: number | null };
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        enabled:!!authorId,
    });
}