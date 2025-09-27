import {useLikedPostsQuery} from '@/hooks/useSocialQuery.ts';
import Post from '@/pages/results/ui/post.tsx';
import {LoaderCircle} from 'lucide-react';
import { Link } from 'react-router';
function LikedPosts () {
    const {data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage} = useLikedPostsQuery();
    const posts = data?.pages.flatMap((page) => page.likes) ?? [];
    if (isLoading) {
        return <LoaderCircle/>;
    }
    return (
        <div className="flex flex-col gap-2 w-full px-20">
        <h1 className="text-5xl my-10 text-nowrap flex items-baseline justify-center font-delius-swash-caps">Your  <img
                src={"https://mohiramansurovna.github.io/linaform-client/heart.png"}
                alt="liked"
                className="size-15 translate-y-4"
            /> posts</h1>

            {posts.map((like) => (
                <Post post={like.note} key={like.note.id}/>
            ))}
            {posts.length === 0 && <p className='self-center text-center translate-y-1/2 text-muted-foreground'>Oops, looks liked you haven't like any post. <br/>
            <Link to='/results/search' className='hover:text-primary underline'> Try exploring</Link></p>}
            {hasNextPage && (
                <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                    {isFetchingNextPage ? 'Loading...' : 'Load more'}
                </button>
            )}
        </div>
    );
}

export default LikedPosts;