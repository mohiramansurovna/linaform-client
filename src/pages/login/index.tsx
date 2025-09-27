import { CardContent, Card } from '@/components/ui/card';
import {LoginForm} from './ui/login-form';
import {LoginImage} from './ui/login-image';
import { Link } from 'react-router';
export default function LoginPage() {
    return (
        <div className='bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
            <div className='w-full max-w-sm md:max-w-3xl'>
                <div className={'flex flex-col gap-6'}>
                    <Card className='overflow-hidden p-0'>
                        <CardContent className='grid p-0 md:grid-cols-2'>
                            <LoginForm />
                            <LoginImage/>
                        </CardContent>
                    </Card>
                    <div className='text-muted-foreground text-center text-xs text-balance'>
                        By clicking continue, you agree to our <Link className='hover:text-primary underline underline-offset-4' to='#'>Terms of Service</Link> and{' '}
                        <Link className='hover:text-primary underline underline-offset-4' to='#'>Privacy Policy</Link>.
                    </div>
                </div>
            </div>
        </div>
    );
}
