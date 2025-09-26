import {
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
    SidebarMenuAction,
} from '@/components/ui/sidebar.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import {MoreHorizontal, Trash2} from 'lucide-react';
import {useNavigate} from 'react-router';
import type {User} from '@/schemas.ts';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar.tsx';

function NavAuthor({author}: { author: User }) {
    const {isMobile} = useSidebar();
    const navigate = useNavigate();
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <button onClick={()=>navigate('/results/author?authorId='+author.id)}>
                    <Avatar className='size-6 rounded-full'>
                        <AvatarImage src={'https://cdn.culture.ru/images/becb4d30-310b-5a5b-94be-56e086848ebf'} alt={author.username} />
                        <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                    </Avatar>
                    <span>{author.username}</span>
                </button>
            </SidebarMenuButton>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                        <MoreHorizontal className="h-4 w-4"/>
                        <span className="sr-only">More</span>
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-48 rounded-lg"
                    side={isMobile ? 'bottom' : 'right'}
                    align={isMobile ? 'end' : 'start'}
                >
                    <DropdownMenuItem>
                        <Trash2 className="h-4 w-4 text-muted-foreground"/>
                        <span>Unsubscribe</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    );
}

export default NavAuthor;
