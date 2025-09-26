import {type Post as PostType} from 'src/schemas';
import {useUserStore} from '@/pages/note/hooks/useUserStore.ts';

function Post({post}: { post: PostType }) {
    const {setSelectedUserId} = useUserStore();
    return (
        <li
            className="w-full bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden max-h-[400px] flex flex-col"
        >
            <a
                href={`/post/${post.id}`}
                className="flex flex-col justify-between p-4 h-full"
            >

                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-lg line-clamp-2">
                    {post.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-4">
                    {post.description}
                </p>

                <div className="flex justify-between items-center text-sm text-zinc-500 dark:text-zinc-400 mt-4">
                    <button
                        onClick={() => setSelectedUserId(post.user.id)}
                        className="hover:underline"
                    >
                        {post.user.username}
                    </button>
                    <span>
                                        {new Date(post.publishedAt).toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            },
                                        )}
                                    </span>
                </div>

            </a>
        </li>
    );
}

export default Post;