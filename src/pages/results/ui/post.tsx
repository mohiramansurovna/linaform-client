import {type Post as PostType} from 'src/schemas';
import {useUserStore} from '@/pages/note/hooks/useUserStore.ts';
import {Link} from 'react-router';
import {cn} from '@/lib/utils.ts';

function Post({posts, containerClassName}: { posts: PostType[], containerClassName?: string }) {
    const {setSelectedUserId} = useUserStore();

    return (
        <ul className={cn("flex flex-col gap-4 px-6 pb-6 scrollbar-custom", containerClassName)}>
            {posts.map(post => (
                <li
                    key={post.id}
                    className="bg-white dark:bg-zinc-900 rounded-lg p-4 shadow-md flex flex-col justify-between"
                >
                    <Link
                        to={`/post/${post.id}`}
                        className="flex flex-col cursor-pointer justify-between"
                    >
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-lg line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-4">
                            {post.description}
                        </p>
                    </Link>

                    <div className="flex justify-between items-center text-sm text-zinc-500 dark:text-zinc-400 mt-4">
                        <button
                            onClick={() => setSelectedUserId(post.user.id)}
                            className="hover:underline"
                        >
                            {post.user.username}
                        </button>
                        <span>
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              })}
            </span>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default Post;
