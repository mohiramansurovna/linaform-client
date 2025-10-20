import {useLikedPostsQuery} from '@/hooks/useSocialQuery.ts';
import Post from '@/pages/results/ui/post.tsx';
import {LoaderCircle} from 'lucide-react';
import {Link} from 'react-router';

function LikedPosts() {
    const {data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage} = useLikedPostsQuery();
    const likes = data?.pages.flatMap(page => page.likes) ?? [];
    const posts = likes.flatMap(like => like.note);

    if (isLoading) return <LoaderCircle className="m-auto"/>;

    return (
        <div className="flex flex-col items-center h-full">
            <div className="fixed text-5xl font-delius-swash-caps top-0 w-[70%] bg-background border-b border-border h-30 flex flex-row justify-center items-center ">
                Your <img
                src="https://mohiramansurovna.github.io/linaform-client/heart.png"
                alt="liked"
                className="inline size-18"
            /> posts
            </div>
            {/* Scrollable posts */}
            <Post posts={posts} containerClassName="flex-1 mt-34 w-[70%] overflow-y-auto"/>

            {likes.length === 0 && (
                <p className="self-center text-center mt-4 text-muted-foreground">
                    Oops, looks like you haven't liked any post.<br/>
                    <Link to="/results/search" className="hover:text-primary underline">
                        Try exploring
                    </Link>
                </p>
            )}

            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="mx-auto my-4 px-4 py-2 rounded bg-primary text-white"
                >
                    {isFetchingNextPage ? 'Loading...' : 'Load more'}
                </button>
            )}
        </div>
    );
}

export default LikedPosts;
