import {Button} from '@/components/ui/button.tsx';
import ThemeSwitcher from '@/components/theme-switcher.tsx';
import {Link} from 'react-router';
import {Home, Aperture} from 'lucide-react';

function AuthRibbon() {
    return (
        <header className='sticky top-0 z-50 flex justify-end items-center w-full h-16 bg-background px-4'>
            <div className="flex items-center gap-3">
                <Link  title={'dashboard'} to={"/"} className="place-items-center block pt-1.5 rounded-2xl size-8  shadow-md transition hover:scale-105 hover:bg-zinc-200 dark:hover:bg-zinc-700">
                    <Home className="h-5 w-5 text-violet-500 dark:text-zinc-800'" />
                </Link>
                <Link title={'about'} to={"/about"} className="place-items-center block pt-1.5 rounded-2xl size-8  shadow-md transition hover:scale-105 hover:bg-zinc-200 dark:hover:bg-zinc-700">
                    <Aperture className="h-5 w-5 text-pink-500 dark:text-zinc-800'" />
                </Link>
                <ThemeSwitcher/>
                <Link to="/login">
                    <Button variant="default">Sign In</Button>
                </Link>
                <Link to="/register">
                    <Button variant="outline">Register</Button>
                </Link>
            </div>
        </header>
    );
}

export default AuthRibbon;