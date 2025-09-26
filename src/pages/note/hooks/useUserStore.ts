import {create} from 'zustand';


type UserStore = {
    selectedUserId: string| null;
    setSelectedUserId: (id:string| null) => void;
};

export const useUserStore = create<UserStore>(set => ({
    selectedUserId: null,
    setSelectedUserId: id => set({selectedUserId: id}),
}));
