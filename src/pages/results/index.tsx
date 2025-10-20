import {useParams} from 'react-router';
import LikedPosts from '@/pages/results/ui/likes.tsx';
import AuthorPosts from '@/pages/results/ui/author.tsx';
import SearchPosts from '@/pages/results/ui/search.tsx';
import {SidebarTrigger} from '@/components/ui/sidebar.tsx';
import {useAuthStore} from '@/pages/dashboard/hooks/useAuthStore.ts';

function Results() {
    const {type} = useParams<{ type: string }>();
    const {isAuthenticated} = useAuthStore();
    return (
        <>
            {isAuthenticated&&<SidebarTrigger className='z-60 fixed'/>}
                {type === 'likes' && <LikedPosts />}
                {type === 'author' && <AuthorPosts />}
                {type === 'search' && <SearchPosts />}
        </>
    );
}

export default Results;
