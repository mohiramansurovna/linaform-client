import { useQuery } from '@tanstack/react-query';
import type {Post} from '@/schemas.ts';
import {useParams} from 'react-router';


//@ts-ignore
const url=import.meta.env.VITE_API_URL as string;

export function useSimilarPostsQuery() {
    const {id}=useParams<{id:string}>()
    return useQuery<Post[]>({
        queryKey: ['similar-posts', id],
        queryFn: async () => {
            const res=await fetch(url+`/api/post/${id}/similar`);
            return res.json();
        },
        enabled:!!id,
    });
}
