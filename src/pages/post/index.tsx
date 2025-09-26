import Header from "@/pages/post/ui/header";
import Content from "@/pages/post/ui/content";
import Footer from '@/pages/post/ui/footer.tsx';
import Comments from '@/pages/post/ui/comments.tsx';
import {SidebarTrigger} from '@/components/ui/sidebar.tsx';
import {useAuthStore} from '@/pages/dashboard/hooks/useAuthStore.ts';

function Posts() {
    const {isAuthenticated}=useAuthStore()
    return (
        <div className="min-h-screen">
            {isAuthenticated && <SidebarTrigger className='fixed'/>}
            <Header />
            <Content />
            <Footer />
            <Comments />
        </div>

    );
}
export default Posts;
