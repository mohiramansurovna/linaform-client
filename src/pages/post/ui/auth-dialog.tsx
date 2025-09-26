import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Link} from 'react-router';

function AuthDialog({
                        open,
                        onOpenChange,
                    }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-900">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-center text-zinc-900 dark:text-zinc-100">
                        Sign in required
                    </DialogTitle>
                </DialogHeader>

                <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    You need to sign in to like, subscribe, or post a comment.
                </p>
                <img
                    src={"/auth-dialog.svg"}
                    alt="Sign in required"
                    className="mx-auto w-1/2"
                />
                <DialogFooter>
                    <Link to="/login" className="w-full">
                        <Button variant="default" className="w-full">
                            Sign In
                        </Button>
                    </Link>
                    <Link to="/register" className="w-full">
                        <Button variant="outline" className="w-full">
                            Register
                        </Button>
                    </Link>
                </DialogFooter>

                <div className="mt-4 flex justify-center">
                    <Button
                        variant="ghost"
                        className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                        onClick={() => onOpenChange(false)}
                    >
                        Continue Without Account
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(AuthDialog);
