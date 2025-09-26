import {useQuery} from '@tanstack/react-query';
import type {RecommendedNoteByTag, Tag} from '@/schemas.ts';

//@ts-ignore
const url=import.meta.env.VITE_API_URL as string;

export const useTagsQuery = () => {
    return useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await fetch(url+'/api/tags');
            return await res.json() as Tag[];
        }
    })
}

export const useRecommendedNoteByTagQuery=(tags:Tag[])=>{
    return useQuery({
        queryKey:['recommendByTags',tags],
        queryFn:async()=>{
            const res=await fetch(url+'/api/tags/posts');
            return await res.json() as RecommendedNoteByTag[];
        }
})
}
