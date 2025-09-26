import {useAuthStore} from "@/pages/dashboard/hooks/useAuthStore.ts";
import {usePostLike, usePostUnlike} from "@/pages/post/hooks/usePostMutations.ts";
import {Heart} from "lucide-react";
import {useState} from "react";
import AuthDialog from "@/pages/post/ui/auth-dialog.tsx";
import {queryClient} from '@/lib/react-query.ts';
import type {Post} from '@/schemas.ts';

type Like = {
    id: string,
    userId: string,
    noteId: string
}

function LikeButton({likes, postId}: { likes: Like[], postId: string }) {
    const {user} = useAuthStore();
    const [open, setOpen] = useState(false);
    const postLikeMutation = usePostLike();
    const postUnlikeMutation = usePostUnlike();


    const like = likes.find((l) => l.userId === user?.id);


    const toggleLike = async () => {
        if (!user) {
            setOpen(true);
            return;
        }
        if (like) {
            queryClient.setQueryData(['post'], (oldData: Post) => {
                if (!oldData.likes) return oldData;
                return {
                    ...oldData,
                    likes: oldData.likes.filter((l) => l.id !== like.id),
                };
            });
            postUnlikeMutation.mutate(like.id, {
                onSuccess: () => {
                    queryClient.invalidateQueries({queryKey: ['postUnlike']});
                },
                onError: () => {
                    queryClient.invalidateQueries({queryKey: ['postUnlike']});
                },
            });
        } else {
            const tempLike = {id: "temp-id", userId: user.id, noteId: postId};
            postLikeMutation.mutate(undefined, {
                onSuccess: () => {
                    queryClient.invalidateQueries({queryKey: ['postLike']});
                    queryClient.setQueryData(['post'], (oldData: Post) => {
                        if (!oldData.likes) return oldData;
                        return {
                            ...oldData,
                            likes: [...oldData.likes, tempLike],
                        };
                    });
                },
                onError: () => {
                    queryClient.invalidateQueries({queryKey: ['postLike']});
                },
            });
        }
    };

    return (
        <>
            <button
                className="mt-4 flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-300"
                onClick={toggleLike}
            >
                <Heart
                    className={`${like && "fill-red-600"} text-red-600`}
                    size={20}
                />
                {likes.length}
            </button>

            <AuthDialog open={open} onOpenChange={setOpen}/>
        </>
    );
}

export default LikeButton;
