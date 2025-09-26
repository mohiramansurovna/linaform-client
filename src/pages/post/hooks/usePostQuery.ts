import {useQuery} from "@tanstack/react-query";
import {useParams} from 'react-router';
import {type Post} from "@/schemas";

//@ts-ignore
const url=import.meta.env.VITE_API_URL as string;

export const usePostQuery = () => {
    const {id}=useParams<{id:string}>()
    return useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res=await fetch(url+'/api/post/'+id)
            if(!res.ok) throw new Error('Failed to fetch post')
            return await res.json() as Post;

        },
    })
}