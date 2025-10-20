import {AppSidebar} from '@/components/app-sidebar';
import {SidebarProvider, SidebarInset} from '@/components/ui/sidebar';
import {useRefreshTokenQuery} from './hooks/useRefreshTokenQuery';
import {useEffect} from 'react';
import {useAuthStore} from './hooks/useAuthStore';
import {Outlet} from 'react-router';
import {useNotificationStore} from '@/hooks/useNotificationStore.ts';
import AuthRibbon from '@/components/auth-ribbon.tsx';
import UserDialog from '@/components/user-dialog.tsx';
import CheckServer from '@/components/check-server.tsx';

export default function DashboardPage() {
    const {clearAuth, setToken, isAuthenticated} = useAuthStore();
    const {data: token, status, error} = useRefreshTokenQuery();
    const {addNotification} = useNotificationStore();
    useEffect(() => {
        if (status == 'error') {
            console.log(error);
            clearAuth();
            return;
        }
        if (status == 'success') {
            setToken(token);
        }
    }, [status, token, setToken, clearAuth, error]);
    useEffect(() => {
        addNotification("Welcome to our app", 'success');
    }, []);
    if (!isAuthenticated)
        return (
            <>
                <CheckServer/>
                <AuthRibbon/>
                <UserDialog/>
                <Outlet/>
            </>
        );
    else return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Outlet/>
            </SidebarInset>
            <UserDialog/>
            <CheckServer/>
        </SidebarProvider>
    );
}
