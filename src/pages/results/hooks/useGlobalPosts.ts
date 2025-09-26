import {useInfiniteQuery} from '@tanstack/react-query';
import type {Post} from '@/schemas.ts';

export const useSearchGlobalPosts = (term:string|null) => {
    return useInfiniteQuery({
        queryKey:['seachGlobalPosts'],
        queryFn: async({pageParam=1})=>{
            const res=await fetch(`/api/post/search/${pageParam}?search=${term}`);
            return await res.json() as {posts:Post[], nextPage:number|null}
        },
        initialPageParam:1,
        getNextPageParam:(lastPage)=>lastPage.nextPage,
        enabled:!!term,
    })
}

export const usePopularGlobalPosts=()=>{
    return useInfiniteQuery({
        queryKey:['popularGlobalPosts'],
        queryFn:async({pageParam=1})=>{
            const res=await fetch(`/api/post/popular/${pageParam}`)
            return await res.json() as {posts:Post[], nextPage:number|null}
        },
        initialPageParam:1,
        getNextPageParam:(lastPage)=>lastPage.nextPage
    })
}