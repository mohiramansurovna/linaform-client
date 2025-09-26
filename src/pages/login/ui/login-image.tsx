import {Loader2} from 'lucide-react';
import {useState, useEffect} from 'react';

export function LoginImage() {
    const [src, setSrc] = useState<undefined | string>(undefined);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        async function fetchImage() {
            const url = await fetch(
                `https://api.unsplash.com/photos/random?client_id=${
                    //@ts-expect-error I will fix this later
                    import.meta.env.VITE_ACCESS_KEY
                }&orientation=portrait&query=nature`
            ).then(res => res.json().then(data => data.urls.regular));
            setSrc(url);
        }
        fetchImage().catch(console.error);
    }, []);
    return (
        <div className='bg-muted relative hidden md:block'>
            {!loaded && (
                <div className='absolute inset-0 flex items-center justify-center'>
                    <Loader2 className='size-12 animate-spin text-muted-foreground' />
                </div>
            )}
            <img
                src={src}
                alt='Background'
                onLoad={() => setLoaded(true)}
                onError={() => setLoaded(true)}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out ${
                    loaded ? 'opacity-100' : 'opacity-0'
                } dark:brightness-[0.2] dark:grayscale`}
            />
        </div>
    );
}
