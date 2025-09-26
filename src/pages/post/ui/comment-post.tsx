import {useRef, useState} from 'react';
import {Input} from '@/components/ui/input.tsx';
import {useAuthStore} from '@/pages/dashboard/hooks/useAuthStore.ts';
import {usePostComment} from '@/pages/post/hooks/usePostMutations.ts';
import AuthDialog from '@/pages/post/ui/auth-dialog.tsx';
import {LoadingButton} from '@/components/loading.tsx';

function CommentPost() {
    const inputRef = useRef<HTMLInputElement>(null);
    const {isAuthenticated} = useAuthStore();
    const [authDialog, setAuthDialog] = useState(false);
    const postCommentMutation = usePostComment();

    const postComment = () => {
        if (!inputRef.current) return;
        const value = inputRef.current.value.trim();
        if (!value) return;
        inputRef.current.value = '';
        if (!isAuthenticated) {
            setAuthDialog(true);
            return;
        }
        postCommentMutation.mutate(value);
    };

    return (
        <>
            <div className="flex items-center gap-2 mt-4">
                <Input
                    ref={inputRef}
                    placeholder="Write a comment..."
                    className="flex-1"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            postComment();
                        }
                    }}
                />
                <LoadingButton
                    disabled={postCommentMutation.isPending}
                    onClick={postComment}
                >
                    Post
                </LoadingButton>
            </div>
            <AuthDialog open={authDialog} onOpenChange={setAuthDialog}/>
        </>
    );
}

export default CommentPost;
