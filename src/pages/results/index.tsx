import {useParams} from 'react-router';
import LikedPosts from '@/pages/results/ui/likes.tsx';
import AuthorPosts from '@/pages/results/ui/author.tsx';
import SearchPosts from '@/pages/results/ui/search.tsx';
import {SidebarTrigger} from '@/components/ui/sidebar.tsx';

function Results() {
    const {type} = useParams<{ type: string }>();
    return <div className='w-full h-full'>
        <SidebarTrigger/>
        {
            type == 'likes' ? <LikedPosts/> :
                type == 'author' ? <AuthorPosts/> :
                    type == 'search' && <SearchPosts/>
        }
    </div>;
}

export default Results;