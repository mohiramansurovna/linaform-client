import {AlertCircle, BookOpenText, Compass, Heart, MoreHorizontal} from 'lucide-react';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton, SidebarMenuItem, SidebarSeparator,
} from '../components/ui/sidebar';
import type {Dispatch, SetStateAction} from 'react';
import {useNavigate} from 'react-router';
import {useAuthorsQuery} from '@/hooks/useSocialQuery.ts';
import NavAuthor from '@/components/nav-author.tsx';
import type {User} from '@/schemas.ts';

export function NavPosts() {
    const navigate = useNavigate();
    const {data, isLoading, error} = useAuthorsQuery();
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
                <SidebarGroupLabel></SidebarGroupLabel>
                <SidebarMenuButton onClick={() => navigate('/results/likes')}>
                    <Heart className="text-sidebar-foreground"/>
                    <span>Favorites</span>
                </SidebarMenuButton>
                <SidebarMenuButton onClick={() => navigate('/results/search')}>
                    <Compass className="text-sidebar-foreground"/>
                    <span>Explore</span>
                </SidebarMenuButton>
                <SidebarSeparator/>
                <SidebarGroupLabel>Your Fav Authors</SidebarGroupLabel>
                {isLoading && (
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-muted-foreground">
                            <MoreHorizontal className="h-4 w-4"/>
                            <span>Loading...</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )}
                {error && (
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-destructive">
                            <AlertCircle className="h-4 w-4"/>
                            <span>{error.message}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )}
                {data&& data.length>0?data.map((author: User) => (
                    <NavAuthor author={author} key={author?.id}/>
                )):<p className="text-gray-500 self-center text-sm p-2">No authors found</p>}
            </SidebarMenu>
        </SidebarGroup>
    );
}

export function Posts({setNav, nav}: { setNav: Dispatch<SetStateAction<'notifications' | 'notes' | 'posts'>>, nav: "notes" | string }) {
    return (
        <button
            onClick={() => setNav('posts')}
            className="place-items-center rounded-2xl size-8  shadow-md transition hover:scale-105 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            title="Posts"
        >
            {nav === 'posts' ? (
                <BookOpenText className="h-5 w-5 text-emerald-600"/>
            ) : (
                <BookOpenText className="h-5 w-5 text-zinc-500 dark:text-zinc-800"/>
            )}
        </button>
    );
}
