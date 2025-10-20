import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router';
import {router} from './router.tsx';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './lib/react-query';
// import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

//@ts-expect-error; i really dont know why it is not working
import "./index.css";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            {/*<ReactQueryDevtools initialIsOpen={false} />*/}
        </QueryClientProvider>
    </StrictMode>
);
