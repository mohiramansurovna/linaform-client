import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import {useThemeStore} from '@/hooks/useThemeStore.ts';

export default function ThemeSwitcher() {
    const {theme, setTheme}=useThemeStore()
    // Load theme from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("theme") as "light" | "dark" | null;
        if (stored) {
            setTheme(stored);
            document.documentElement.classList.toggle("dark", stored === "dark");
        } else {
            // default to system preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme(prefersDark ? "dark" : "light");
            document.documentElement.classList.toggle("dark", prefersDark);
        }
    }, [setTheme]);

    // Handle toggle
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };
    return (
        <button
            onClick={toggleTheme}
            className="place-items-center rounded-2xl size-8  shadow-md transition hover:scale-105 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            title="theme switcher"
        >
            {theme === "light" ? (
                <Moon className="h-5 w-5 text-zinc-500 dark:text-zinc-800'" />
            ) : (
                <Sun className="h-5 w-5 text-yellow-400" />
            )}
        </button>
    );
}
