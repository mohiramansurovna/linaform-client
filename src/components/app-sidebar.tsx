import {useState, type ComponentProps, useEffect} from 'react';
import {NavNotes, Notes} from '../components/nav-notes';
import {NavUser} from '../components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    useSidebar,
} from '../components/ui/sidebar';
import {useAuthStore} from '@/pages/dashboard/hooks/useAuthStore';
import ThemeSwitcher from '@/components/theme-switcher.tsx';
import {
    Notifications,
    NavNotifications,
} from '@/components/nav-notifications.tsx';
import {NavPosts, Posts} from '@/components/nav-posts.tsx';
import {useIsMobile} from '@/hooks/use-mobile.ts';
import {useLocation} from 'react-router';

export function AppSidebar({...props}: ComponentProps<typeof Sidebar>) {
    const {open} = useSidebar();
    const isMobile = useIsMobile();
    const user = useAuthStore((state) => state.user);

    const userData = {
        name: user?.username ?? '',
        email: user?.email ?? '',
        avatar: 'https://cdn.culture.ru/images/becb4d30-310b-5a5b-94be-56e086848ebf',
    };

    const [nav, setNav] = useState<'notifications' | 'notes' | 'posts'>('notifications');
    const location=useLocation();
    useEffect(() => {
        const path=location.pathname.split('/')[1];
        if(path=='note')setNav('notes');
        else if(path=='post'||path=='results')setNav('posts');
        else setNav('notifications');

    }, [location]);
    return (
        <Sidebar
            collapsible="icon"
            className="shadow-lg shadow-zinc-900/20 dark:shadow-zinc-100/20 z-40"
            {...props}
        >
            <SidebarHeader
                className="flex gap-2"
                style={{
                    flexDirection: isMobile ? 'row' : open ? 'row' : 'column',
                }}
            >
                <ThemeSwitcher/>
                <Notes setNav={setNav} nav={nav}/>
                <Posts setNav={setNav} nav={nav}/>
                <Notifications setNav={setNav}/>
            </SidebarHeader>

            <SidebarContent>
                {nav === 'notes' ? (
                        <NavNotes/>
                ) : nav === 'notifications' ? (
                    <NavNotifications/>
                ) : (
                    <NavPosts/>
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={userData}/>
            </SidebarFooter>
        </Sidebar>
    );
}
