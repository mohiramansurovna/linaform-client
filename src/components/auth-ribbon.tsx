import {Button} from '@/components/ui/button.tsx';
import ThemeSwitcher from '@/components/theme-switcher.tsx';
import {Link} from 'react-router';

function AuthRibbon() {
    return (
        <header className='sticky top-0 z-50 flex justify-end items-center w-full h-16 bg-background px-4'>
            <div className="flex items-center gap-3">
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