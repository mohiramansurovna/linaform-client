import {createBrowserRouter} from 'react-router';
import {LoginPage, RegisterPage, DashboardPage, NotesPage, PostsPage, ResultsPage, SearchPage} from './lazy-routes';
export const router = createBrowserRouter([
    {
        path: '/login',
        Component: LoginPage,
    },
    {
        path: '/register',
        Component: RegisterPage,
    },
    {
        path: '/',
        Component: DashboardPage,
        children: [
            {
                index:true,
                Component: SearchPage,
            },
            {
                path: 'note',
                Component: NotesPage,
            },
            {
                path: 'post/:id',
                Component: PostsPage,
            },
            {
                path:'results/:type',
                Component:ResultsPage
            }
        ],
    },
]);
