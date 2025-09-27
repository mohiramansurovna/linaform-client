import {usePostQuery} from '@/pages/post/hooks/usePostQuery.ts';
import {usePostView} from '@/pages/post/hooks/usePostMutations.ts';
import {useEffect} from 'react';
import {Eye} from 'lucide-react';
import LikeButton from '@/pages/post/ui/like-button.tsx';
import {useUserStore} from '@/pages/note/hooks/useUserStore.ts';
function Header() {
    const {data: post} = usePostQuery();
    const {setSelectedUserId} = useUserStore()
    //view
    const postViewMutation = usePostView();
    useEffect(() => {
        const timeout = setTimeout(() => {
            postViewMutation.mutate();
        }, 10000);
        return () => clearTimeout(timeout);
    }, []);


    if (!post) return null;
    return (
        <header className="max-w-3xl mx-auto py-6 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-start">
            <div className='w-full'>
                <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">
                    {post.title}
                </h1>
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
                    <button onClick={()=>setSelectedUserId(post.user.id)} className="font-medium cursor-pointer">{post.user.username}</button>
                    <span>•</span>
                    <span>
        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })}
      </span>
                </div>
                {post.description && (
                    <p className="mt-4 text-zinc-700 dark:text-zinc-300 w-full line-clamp-3">
                        {post.description}
                    </p>
                )}
                <div className={"flex items-center w-full justify-end gap-4"}>
                    <span className="mt-4 flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-300"><Eye size={20}/> {post.views}</span>
                    <LikeButton likes={post.likes} postId={post.id}/>
                </div>

            </div>
        </header>

    );
}

export default Header;