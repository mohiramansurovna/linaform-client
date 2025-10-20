import {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {Github, Code2, Server, Layers, Database, LayoutTemplate, Router, PenTool} from 'lucide-react';
import AuthRibbon from '@/components/auth-ribbon.tsx';

export default function AboutLinaform() {
    const [src, setSrc] = useState<string | undefined>(undefined);
    const [isReady, setIsReady] = useState(false);

    const defaultImage =
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=100';

    useEffect(() => {
        async function fetchImage() {
            try {
                const url = await fetch(
                    `https://api.unsplash.com/photos/random?client_id=${
                        //@ts-expect-error will fix env typing later
                        import.meta.env.VITE_ACCESS_KEY
                    }&orientation=landscape&query=nature&content_filter=high`,
                ).then((res) => res.json().then((data) => data.urls.full));

                const img = new Image();
                img.src = url;
                img.onload = () => {
                    setSrc(url);
                    setIsReady(true);
                };
            } catch (error) {
                console.error(error);
            }
        }
        fetchImage();
    }, []);

    const techColors = [
        'hover:text-blue-500',
        'hover:text-green-500',
        'hover:text-violet-500',
        'hover:text-pink-500',
        'hover:text-yellow-500',
        'hover:text-cyan-500',
        'hover:text-orange-500',
        'hover:text-emerald-500',
    ];

    return (
        <>
            <AuthRibbon/>
            <motion.section
                initial={{opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.45}}
                className="bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 min-h-screen relative"
            >
                {/* HERO BACKGROUND */}
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="absolute top-0 left-0 w-full h-[70vh] flex flex-col justify-center text-center overflow-hidden"
                >
                    {/* Default image visible until new image is fully loaded */}
                    <motion.img
                        key="default-bg"
                        src={defaultImage}
                        alt="Default Background"
                        initial={{opacity: 1}}
                        animate={{opacity: isReady ? 0 : 1}}
                        transition={{duration: 1.2, ease: 'easeInOut'}}
                        className="absolute inset-0 w-full h-full object-cover brightness-75 dark:grayscale dark:brightness-[0.40]"
                    />

                    {/* Replace only after fully loaded */}
                    {src && (
                        <motion.img
                            key="dynamic-bg"
                            src={src}
                            alt="Dynamic Background"
                            initial={{opacity: 0}}
                            animate={{opacity: isReady ? 0.75 : 0}}
                            transition={{duration: 1.2, ease: 'easeInOut'}}
                            className="absolute inset-0 w-full h-full  object-cover brightness-70 dark:opacity-80 dark:brightness-[0.70] dark:grayscale"
                        />
                    )}

                    {/* Overlay gradient for text contrast */}
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-zinc-100/50 via-transparent to-zinc-100/30 dark:from-black/70 dark:via-black/60 dark:to-black/70 mix-blend-overlay"></div>

                    {/* Hero content */}
                    <div className="relative z-10  bg-zinc-100/50 p-8 px-10 dark:bg-zinc-950/50 max-w-3xl mx-auto sm:px-8">
                        <h1 className="text-5xl font-bold mb-3 tracking-tight text-zinc-900 dark:text-zinc-50">Linaform</h1>
                        <p className="text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed max-w-2xl mx-auto">
                            A space where writing feels natural — built to make expression simple, yet deeply customizable.
                        </p>
                    </div>
                </motion.div>

                {/* MAIN CONTENT */}
                <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-[80vh] pb-16">
                    {/* ABOUT PROJECT */}
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.2}}
                        transition={{duration: 0.6}}
                        className="space-y-6 mb-16"
                    >
                        <h2 className="text-2xl font-semibold">About the Project</h2>
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            Linaform removes the friction between thoughts and words. Built around a rich TipTap editor, it turns writing into flow —
                            expressive, structured, and intuitive.
                            Beyond text, it’s a place to share, follow, and explore ideas through smart tag-based suggestions.
                        </p>
                    </motion.div>

                    {/* STACK SECTION */}
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.2}}
                        transition={{duration: 0.6, delay: 0.1}}
                        className="space-y-8 mb-16"
                    >
                        <h2 className="text-2xl font-semibold">Tech Stack</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm text-zinc-700 dark:text-zinc-300">
                            {[
                                {icon: PenTool, name: 'TipTap'},
                                {icon: LayoutTemplate, name: 'TailwindCSS'},
                                {icon: Code2, name: 'Shadcn/UI'},
                                {icon: Database, name: 'Prisma ORM'},
                                {icon: Router, name: 'TanStack Router'},
                                {icon: Layers, name: 'Zustand'},
                                {icon: Layers, name: 'React'},
                                {icon: Layers, name: 'Framer Motion'},
                            ].map((tech, i) => (
                                <motion.div
                                    key={tech.name}
                                    whileHover={{scale: 1.05}}
                                    transition={{type: 'spring', stiffness: 300, damping: 15}}
                                    className={`flex items-center gap-2 cursor-default transition-colors ${techColors[i % techColors.length]}`}
                                >
                                    <tech.icon className="w-4 h-4"/>
                                    {tech.name}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* LINKS */}
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.2}}
                        transition={{duration: 0.25, delay: 0.1}}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.a
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.98}}
                            href="https://github.com/mohiramansurovna/linaform-client"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
                        >
                            <Code2 className="w-4 h-4"/> Frontend Source
                        </motion.a>

                        <motion.a
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.98}}
                            href="https://github.com/mohiramansurovna/linaform-server"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
                        >
                            <Server className="w-4 h-4"/> Backend Source
                        </motion.a>

                        <motion.a
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.98}}
                            href="https://github.com/mohiramansurovna"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
                        >
                            <Github className="w-4 h-4"/> Other Projects
                        </motion.a>
                    </motion.div>

                    {/* FOOTER */}
                    <footer className="mt-16 text-center text-sm text-zinc-500 dark:text-zinc-400">
                        © {new Date().getFullYear()} Linaform — This page is created with ChatGPT.
                    </footer>
                </div>
            </motion.section>
        </>
    );
}
