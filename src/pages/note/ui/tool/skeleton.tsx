import React, {Suspense} from 'react';
import {Skeleton} from '@/components/ui/skeleton.tsx';

function SkeletonTab({children}: { children: React.ReactNode }) {
    return (
        <Suspense fallback={
            <div className={'w-full h-8 flex gap-4'}>
                <Skeleton>
                    <div className="w-16 h-full rounded-lg"></div>
                </Skeleton>
                <Skeleton>
                    <div className="w-10 h-full rounded-lg"></div>
                </Skeleton>
                <Skeleton>
                    <div className="w-12 h-full rounded-lg"></div>
                </Skeleton>
                <Skeleton>
                    <div className="w-14 h-full rounded-lg"></div>
                </Skeleton>
            </div>
        }>
            {children}
        </Suspense>
    );
}

export default SkeletonTab;