import {useQuery} from '@tanstack/react-query';

//@ts-ignore
const url=import.meta.env.VITE_API_URL as string;
export const useCheckServer=()=>{
    return useQuery({
        queryKey:['checkServer'],
        queryFn:async()=>{
            const res=await fetch(url+'/api/');
            return res.ok;
        },
        retryDelay:5000,
        retry: (failureCount) => failureCount < 14,
    })
}