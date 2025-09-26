import {create} from 'zustand';
import {uuid, type ZodUUID} from 'zod/v4';

export type Notification = { id:ZodUUID, message: string, type: 'success' | 'error', date:number }

type NotificationStore = {
    notifications: Notification[],
    addNotification: (message:string, type:'success'|'error') => void,
    removeNotification: (id:ZodUUID) => void,
    clearNotifications: () => void,
}
export const useNotificationStore = create<NotificationStore>(set => ({
    notifications: [],
    addNotification: (message:string, type:'success'|'error') => set(state => {
        const notification={
            id:uuid(),
            message,
            type,
            date:Date.now()
        }
        return {notifications: [...state.notifications, notification],}
    }),
    removeNotification: (id) => set(state => ({
        notifications: state.notifications.filter(notification => notification.id !== id),
    })),
    clearNotifications: () => set({notifications: []}),
}));