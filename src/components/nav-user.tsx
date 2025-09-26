import {useMutation} from '@tanstack/react-query';
import {useAuthStore} from '@/pages/dashboard/hooks/useAuthStore';
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
    ChevronsUpDown,
    Sparkles,
    BadgeCheck,
    CreditCard,
    Bell,
    LogOut,
    Loader2,
} from 'lucide-react';
import {useSidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton} from './ui/sidebar';
export function NavUser({user}: {user: {name: string; email: string; avatar: string}}) {
    const {isMobile} = useSidebar();
    const {clearAuth} = useAuthStore();

    const logoutMutation = useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Logout failed');
        },
        onSuccess: () => {
            clearAuth();
        },
        onError: err => {
            console.error('Logout failed', err);
        },
    });

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size='lg'
                            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                            <Avatar className='h-8 w-8 rounded-lg'>
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                            </Avatar>
                            <div className='grid flex-1 text-left text-sm leading-tight'>
                                <span className='truncate font-medium'>{user.name}</span>
                                <span className='truncate text-xs'>{user.email}</span>
                            </div>
                            <ChevronsUpDown className='ml-auto size-4' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                        side={isMobile ? 'bottom' : 'right'}
                        align='end'
                        sideOffset={4}>
                        <DropdownMenuLabel className='p-0 font-normal'>
                            <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                <Avatar className='h-8 w-8 rounded-lg'>
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                                </Avatar>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-medium'>{user.name}</span>
                                    <span className='truncate text-xs'>{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkles />
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
                            <LogOut />
                            Log out
                            {logoutMutation.isPending && (
                                <Loader2 className='inline mx-2 animate-spin' size={10} />
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
