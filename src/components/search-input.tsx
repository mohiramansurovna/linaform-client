import {useState, useEffect} from 'react';
import {Search} from 'lucide-react';
import {cn} from '@/lib/utils.ts';

export function SearchInput({
                                value,
                                setValue,
                                delay = 500,
                                placeholder = 'Search...',
                                Component,
                                classname,
                                containerClassName,
                            }: {
    value: string;
    setValue: (value: string) => void;
    delay?: number;
    placeholder?: string;
    Component: React.ComponentType<React.InputHTMLAttributes<HTMLInputElement>>;
    classname?: string;
    containerClassName?: string;
}) {
    const [innerValue, setInnerValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setValue(innerValue);
        }, delay);
        return () => clearTimeout(handler);
    }, [innerValue, delay, setValue]);

    return (
        <div className={cn("relative w-full", containerClassName)}>
            <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
            <Component
                placeholder={placeholder}
                className={cn("pl-8 focus-visible:ring-0", classname)}
                value={innerValue}
                onChange={(e) => setInnerValue(e.target.value)}
            />
        </div>
    );
}
