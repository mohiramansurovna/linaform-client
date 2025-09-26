import {useQuery} from '@tanstack/react-query';

const GOOGLE_FONTS_API = 'https://www.googleapis.com/webfonts/v1/webfonts';

export const fetchGoogleFonts = async (): Promise<string[]> => {
    //@ts-expect-error I have to find a way to fix this
    const key = import.meta.env.VITE_GOOGLE_FONTS_KEY;
    if (!key) throw new Error('Missing Google Fonts API key');

    const res = await fetch(`${GOOGLE_FONTS_API}?key=${key}&sort=popularity`);
    const data = await res.json();

    return data.items.slice(0, 1000).map((font: any) => font.family);
};

export const useGoogleFontsQuery = () => {
    return useQuery({
        queryKey: ['google-fonts'],
        queryFn: fetchGoogleFonts,
        staleTime: Infinity,
    });
};
