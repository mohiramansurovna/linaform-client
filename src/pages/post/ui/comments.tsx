import {usePostQuery} from '@/pages/post/hooks/usePostQuery.ts';
import {useCallback} from 'react';
import CommentPost from '@/pages/post/ui/comment-post.tsx';
import {useUserStore} from '@/pages/note/hooks/useUserStore.ts';

function Comments() {
    const {data: post} = usePostQuery();
    const {setSelectedUserId} = useUserStore();
    const dateGet = useCallback((createdAt: Date) => {
        return new Date(createdAt).toLocaleString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'short',
        });
    }, []);

    if (!post || !post.comments) return null;

    return (
        <section className="max-w-3xl mx-auto py-8 border-t border-zinc-200 dark:border-zinc-700 mt-8">
            <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
                Comments
            </h2>

            <div className="space-y-4">
                {post.comments.map(comment => (
                    <div key={comment.id}
                         className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800">
                        <div className="flex justify-between items-center mb-2">
                          <button onClick={()=>setSelectedUserId(comment.user.id)} className="font-medium text-zinc-900 dark:text-zinc-100">
                            {comment.user.username}
                          </button>
                            <span className="text-sm text-zinc-500 dark:text-zinc-400">
                            {dateGet(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-zinc-700 dark:text-zinc-300">{comment.content}</p>
                    </div>
                ))}
            </div>

            <CommentPost/>
        </section>
    );
}

export default Comments;
