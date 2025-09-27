import {RegisterForm} from '@/pages/register/ui/register-form';
import RegisterText from './ui/register-text';
import {Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router';
export default function LoginPage() {
    return (
        <div className='bg-muted grid lg:grid-cols-5 p-6 min-h-svh items-center justify-center lg:px-24 '>
            <RegisterText />
            <div className={'flex flex-col gap-6 lg:col-span-2'}>
                <Card className='overflow-hidden p-0'>
                    <CardContent className='p-0'>
                        <RegisterForm />
                    </CardContent>
                </Card>
                <div className='text-muted-foreground text-center text-xs text-balance'>
                    By clicking continue, you agree to our <Link className='hover:text-primary underline underline-offset-4' to='#'>Terms of Service</Link> and{' '}
                    <Link className='hover:text-primary underline underline-offset-4' to='#'>Privacy Policy</Link>.
                </div>
            </div>
        </div>
    );
}
