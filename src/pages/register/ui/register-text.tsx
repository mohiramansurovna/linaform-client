import { PenTool, LayoutTemplate, Share2, Globe } from 'lucide-react';

export default function RegisterText() {
    return (
        <section className='hidden lg:block col-span-3 pr-12'>
            <h1 className='scroll-m-20 text-4xl font-bold tracking-tight text-balance'>
                Start Writing with Linaform
            </h1>
            <p className='leading-7 mt-3'>
                Express your ideas, publish seamlessly, and share your thoughts with the world.
            </p>

            <div className='mt-6 ml-6 flex items-center'>
                <PenTool className='text-foreground m-3 mt-0' />
                <div>
                    <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
                        Write Naturally
                    </h4>
                    <p className='leading-7'>
                        Enjoy a smooth, distraction-free writing experience that keeps your creativity flowing.
                    </p>
                </div>
            </div>

            <div className='mt-6 ml-6 flex items-center'>
                <LayoutTemplate className='text-foreground m-3 mt-0' />
                <div>
                    <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
                        Customize Your Pages
                    </h4>
                    <p className='leading-7'>
                        Format, style, and structure your content effortlessly for a polished and professional look.
                    </p>
                </div>
            </div>

            <div className='mt-6 ml-6 flex items-center'>
                <Share2 className='text-foreground m-3 mt-0' />
                <div>
                    <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
                        Publish & Share
                    </h4>
                    <p className='leading-7'>
                        Share your writings instantly with your audience, friends, or the wider Linaform community.
                    </p>
                </div>
            </div>

            <div className='mt-6 ml-6 flex items-center'>
                <Globe className='text-foreground m-3 mt-0' />
                <div>
                    <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
                        Reach the World
                    </h4>
                    <p className='leading-7'>
                        Get your ideas seen by anyone, anywhere — Linaform makes publishing simple and global.
                    </p>
                </div>
            </div>
        </section>
    );
}
