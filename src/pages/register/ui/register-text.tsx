import { NotebookText, LayoutDashboard, BellRing, ShieldCheck } from 'lucide-react';

export default function RegisterText() {
    return (
        <section className='hidden lg:block col-span-3 pr-12'>
            <h1 className='scroll-m-20 text-4xl font-bold tracking-tight text-balance'>
                Create Your Free Account
            </h1>
            <p className='leading-7 mt-3'>
                Take control of your learning journey with one dashboard built just for students.
            </p>
            <div className='mt-6 ml-6 flex items-center '>
                <NotebookText className='text-foreground m-3 mt-0' />
                <div>
                    <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
                        Organized Learning
                    </h4>
                    <p className='leading-7'>
                        Track assignments, deadlines, and progress in one place — stay ahead without
                        the stress.
                    </p>
                </div>
            </div>
            <div className='mt-6 ml-6 flex items-center'>
                <LayoutDashboard className='text-foreground m-3 mt-0' />
                <div>
                    <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
                        Personalized Dashboard
                    </h4>
                    <p className='leading-7'>
                        Customize your space with subjects, schedules, and goals that match your
                        study style.
                    </p>
                </div>
            </div>
            <div className='mt-6 ml-6 flex items-center'>
                <BellRing className='text-foreground m-3 mt-0' />
                <div>
                    <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
                        Smart Notifications
                    </h4>
                    <p className='leading-7'>
                        Never miss a class, deadline, or update with real-time alerts and reminders.
                    </p>
                </div>
            </div>
            <div className='mt-6 ml-6 flex items-center'>
                <ShieldCheck className='text-foreground m-3 mt-0' />
                <div>
                    <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
                        Secure and Private
                    </h4>
                    <p className='leading-7'>
                        Your academic data is protected with strong encryption and student-focused
                        privacy features.
                    </p>
                </div>
            </div>
        </section>
    );
}
