import {usePostQuery} from '@/pages/post/hooks/usePostQuery.ts';
import {useSimilarPostsQuery} from '@/pages/post/hooks/useSimilarPostsQuery.ts';
import Post from '@/pages/results/ui/post.tsx';

function Footer() {
    const {data: post} = usePostQuery();
    const {data: similarPosts, isLoading} = useSimilarPostsQuery();
    if (!post) return null;

    return (
        <footer className="max-w-3xl mx-auto py-8 border-t border-zinc-200 dark:border-zinc-700 mt-8">
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Read more from {post.user.username}
            </h1>
            <h2 className="text-zinc-500 dark:text-zinc-400 text-sm">
                Similar articles
            </h2>

            {isLoading && (
                <div className="mt-2 text-sm text-zinc-500">Loading...</div>
            )}

            {similarPosts && similarPosts.length > 0 && (
                <Post containerClassName={"mt-6 flex flex-col gap-6"} posts={similarPosts}/>

            )}
        </footer>
    );
}

export default Footer;
