import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter, DialogDescription,
} from '@/components/ui/dialog.tsx';
import {Button} from '@/components/ui/button.tsx';
import {useUserStore} from '@/pages/note/hooks/useUserStore.ts';
import {useUserQuery} from '@/hooks/useSocialQuery.ts';
import {Skeleton} from '@/components/ui/skeleton.tsx';
import {useFollowMutation, useUnfollowMutation} from '@/hooks/useSocialMutations.ts';
import {useAuthStore} from '@/pages/dashboard/hooks/useAuthStore.ts';

function UserDialog() {
    const {selectedUserId, setSelectedUserId} = useUserStore();
    const {data, isFetching} = useUserQuery(selectedUserId || null);
    const {user} = useAuthStore();

    const followMutation = useFollowMutation();
    const unfollowMutation = useUnfollowMutation();
    const isFollowed = data?.followers.some(f => f.id === user?.id) ?? false;

    return (
        <Dialog
            open={!!selectedUserId}
            onOpenChange={() => setSelectedUserId(null)}
        >
            <DialogContent className="overflow-y-scroll scrollbar-custom max-h-screen">
                <DialogHeader className="flex flex-col items-center gap-4">

                    {!isFetching ? (
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">
                            {data?.username?.charAt(0).toUpperCase()}
                        </div>
                    ) : (
                        <Skeleton className="w-20 h-20 rounded-full"/>
                    )}
                    <DialogTitle className="text-lg font-semibold">
                        {!isFetching ? (
                            data?.username
                        ) : (
                            <Skeleton className="h-6 w-40 rounded-md"/>
                        )}
                    </DialogTitle>

                    <div className="flex gap-10 mt-2 text-sm text-gray-600">
                        <div className="flex flex-col items-center">
                            {!isFetching ? (
                                <>
                                    <span className="font-bold">
                                        {data?.followers?.length || 0}
                                    </span>
                                    <span>Followers</span>
                                </>
                            ) : (
                                <>
                                    <Skeleton className="h-4 w-8 mb-1 rounded-sm"/>
                                    <Skeleton className="h-3 w-16 rounded-sm"/>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col items-center">
                            {!isFetching ? (
                                <>
                                    <span className="font-bold">
                                        {data?.following?.length || 0}
                                    </span>
                                    <span>Following</span>
                                </>
                            ) : (
                                <>
                                    <Skeleton className="h-4 w-8 mb-1 rounded-sm"/>
                                    <Skeleton className="h-3 w-16 rounded-sm"/>
                                </>
                            )}
                        </div>
                    </div>
                </DialogHeader>
                <DialogDescription></DialogDescription>

                {user &&
                    <DialogFooter className="flex justify-end gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => setSelectedUserId(null)}
                        >
                            Cancel
                        </Button>

                        <Button
                            disabled={isFollowed ? unfollowMutation.isPending : followMutation.isPending}
                            onClick={() => {
                                if (!selectedUserId) return;
                                if (isFollowed) {
                                    unfollowMutation.mutate(selectedUserId);
                                } else {
                                    followMutation.mutate(selectedUserId);
                                }
                            }}
                        >
                            {isFollowed ? "Unfollow" : "Follow"}
                        </Button>
                    </DialogFooter>
                }
            </DialogContent>
        </Dialog>

    );
}

export default React.memo(UserDialog);
