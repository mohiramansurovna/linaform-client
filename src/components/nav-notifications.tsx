import {Bell, BellMinus, BellRing, Minus} from 'lucide-react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    // useSidebar,
} from '../components/ui/sidebar';
import {useNotificationStore} from '@/hooks/useNotificationStore.ts';
import type {Dispatch, SetStateAction} from 'react';

export function NavNotifications() {
    // const {isMobile} = useSidebar();
    const {notifications, removeNotification, clearNotifications} = useNotificationStore();
    //BBUILD: create toast notifications+server notifications+css
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel></SidebarGroupLabel>
            <SidebarGroupLabel className="text-sidebar-foreground">
                {notifications.length == 0 ? (
                    <span className='text-gray-500'>No new notifications</span>
                ) : (
                    <span className='flex justify-between w-full'>Notifications
                        <button onClick={clearNotifications}>
                            <BellMinus className="text-sidebar-foreground size-4 "/>
                        </button>
                    </span>

                )}
            </SidebarGroupLabel>
            <SidebarMenu>

                {notifications?.map(notification => (
                    <SidebarMenuItem key={notification.date}>
                        <SidebarMenuButton asChild>
                            <div className="flex items-center justify-between text-sidebar-foreground">
                                <BellRing className="w-4 h-4"/>
                                <span className="truncate">{notification.message}</span>
                                <button
                                    onClick={() => removeNotification(notification.id)}
                                    className="p-1"
                                >
                                    <Minus className="w-4 h-4"/>
                                </button>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}

            </SidebarMenu>
        </SidebarGroup>
    );
}

export function Notifications({setNav}: { setNav: Dispatch<SetStateAction<'notifications' | 'notes' | 'posts'>> }) {
    const {notifications} = useNotificationStore();
    return (
        <button
            onClick={() => setNav('notifications')}
            className="place-items-center rounded-2xl size-8  shadow-md transition hover:scale-105 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            title="Notifications"
        >
            {notifications.length > 0 ? (
                <BellRing className="h-5 w-5 text-blue-400"/>
            ) : (
                <Bell className="h-5 w-5 text-zinc-500 dark:text-zinc-800"/>
            )}
        </button>
    );
}