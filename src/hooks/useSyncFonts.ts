import {useCallback} from 'react';
import {type JSONContent} from '@tiptap/react';

export const useSyncFonts = () => {

    const loadFont = useCallback((font: string) => {
        const id = `font-${font.replace(/\s+/g, '-')}`;
        if (document.getElementById(id)) return;

        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, '+')}:wght@400&display=swap`;
        document.head.appendChild(link);
    }, []);

    const getFontsInDoc = useCallback((content: JSONContent) => {
        const fonts = new Set<string>()
        //this function is recursive, do not delete it
        function traverse(node: JSONContent) {
            if (node?.marks) {
                node.marks.forEach(mark => {
                    if (mark.type === "textStyle" && mark.attrs?.fontFamily) {
                        fonts.add(mark.attrs.fontFamily);
                    }
                });
            }
            if (node?.content) {
                node.content.forEach(traverse); //<-here I am using recursion
            }
        }

        traverse(content);
        return Array.from(fonts);
    }, []);

    const syncFonts = useCallback((content: JSONContent) => {
        const usedFonts = getFontsInDoc(content);
        console.log("used fonts in the doc", usedFonts);
        // load missing
        usedFonts.forEach(loadFont);

        // remove unused
        const activeLinks = document.querySelectorAll<HTMLLinkElement>('link[id^="font-"]');
        activeLinks.forEach((link) => {
            const fontName = link.id.replace('font-', '').replace(/-/g, ' ');
            if (!usedFonts.includes(fontName)) {
                console.log('remove font', fontName);
                link.remove();
            }
        });
    }, [getFontsInDoc, loadFont]);


    return {
        loadFont,
        syncFonts,
    };
};