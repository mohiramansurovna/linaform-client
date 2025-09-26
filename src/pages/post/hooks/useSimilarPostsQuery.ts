import { useQuery } from '@tanstack/react-query';
import type {Post} from '@/schemas.ts';
import {useParams} from 'react-router';


export function useSimilarPostsQuery() {
    const {id}=useParams<{id:string}>()
    return useQuery<Post[]>({
        queryKey: ['similar-posts', id],
        queryFn: async () => {
            const res=await fetch(`/api/post/${id}/similar`);
            return res.json();
        },
        enabled:!!id,
    });
}
