import {useAuthorPosts, useUserQuery} from '@/hooks/useSocialQuery.ts';
import type {Post as PostType} from '@/schemas.ts';
import Post from "./post.tsx";
import {LoaderCircle} from 'lucide-react';
import {Link, useSearchParams} from 'react-router';
import {useEffect, useMemo, useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar.tsx';

function AuthorPosts() {
    const [searchParams] = useSearchParams();
    const authorId = searchParams.get('authorId');
    const {data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage} = useAuthorPosts(authorId);
    const {data: author} = useUserQuery(authorId);
    const basePosts = useMemo(() => data?.pages.flatMap((page) => page.posts) ?? [], [data?.pages]);
    const [filter, setFilter] = useState("recent");
    const [posts, setPosts] = useState<PostType[]>(basePosts ?? []);

    useEffect(() => {
        setPosts(basePosts);
    }, [basePosts]);

    useEffect(() => {
        if (filter === "recent") {
            setPosts(basePosts);
        } else if (filter === "popular") {
            setPosts([...basePosts].sort((a, b) => b.likes.length - a.likes.length));
        }
    }, [filter, basePosts]);
    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <LoaderCircle className="animate-spin size-10 text-zinc-500"/>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 w-full mx-auto px-20">
            <header className="flex items-center gap-6 w-full mt-10">
                <Avatar className='size-20 rounded-full'>
                    <AvatarImage src={'https://cdn.culture.ru/images/becb4d30-310b-5a5b-94be-56e086848ebf'} alt={author?.username} />
                    <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold">{author?.username}</h1>
                    <div className="flex gap-6 text-zinc-500 text-sm">
            <span>
              <strong className="text-zinc-900 dark:text-zinc-100">{posts.length}</strong> Posts
            </span>
                        <span>
              <strong className="text-zinc-900 dark:text-zinc-100">{author?.followers.length ?? 0}</strong> Subscribers
            </span>
                    </div>
                </div>
            </header>

            <nav className="flex justify-center gap-6 border-b border-zinc-200 dark:border-zinc-800 text-sm">
                <button
                    onClick={() => setFilter("recent")}
                    className={`pb-2 transition-colors ${
                        filter === "recent"
                            ? "border-b-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100"
                            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                >
                    Recent
                </button>
                <button
                    onClick={() => setFilter("popular")}
                    className={`pb-2 transition-colors ${
                        filter === "popular"
                            ? "border-b-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100"
                            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                >
                    Popular
                </button>
            </nav>

            {/* --- Posts Section --- */}
            <section className="flex flex-col gap-4">
                {posts.map((post) => (
                    <Post post={post} key={post.id}/>
                ))}

                {posts.length === 0 && (
                    <p className="self-center text-center text-zinc-500 py-20">
                        Oops, looks like this author has no posts yet. <br/>
                        <Link to="/results/search" className="hover:text-zinc-900 dark:hover:text-zinc-100 underline">
                            Try exploring
                        </Link>
                    </p>
                )}

                {hasNextPage && (
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="mx-auto mt-6 text-sm px-4 py-2 border rounded-md text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                    >
                        {isFetchingNextPage ? 'Loading...' : 'Load more'}
                    </button>
                )}
            </section>
        </div>
    );
}

export default AuthorPosts;
