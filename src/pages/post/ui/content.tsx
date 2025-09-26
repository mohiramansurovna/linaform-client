import {usePostQuery} from '@/pages/post/hooks/usePostQuery.ts';
import {useSyncFonts} from '@/hooks/useSyncFonts.ts';
import {useEffect, useMemo} from 'react';
import {generateHTML} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import {BackgroundColor, Color, FontSize, TextStyle} from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Image from '@tiptap/extension-image';
import {remapColors} from '@/lib/normalize-colors.ts';
import {useThemeStore} from '@/hooks/useThemeStore.ts';
import {LoadingSmall} from '@/components/loading.tsx';

function Content() {
    const {data: post, error, isLoading} = usePostQuery();
    const {syncFonts} = useSyncFonts();
    const {theme} = useThemeStore();
    //this loads all fonts
    useEffect(() => {
        if (!post) return;
        syncFonts(post.content);
    }, [syncFonts, post]);

    /**
     * LEARNED:
     * 1. I cannot mutate like
     * useEffect(()=>{
     *  if(!post)return;
     *  post.content=remappedContent(post.content)
     * })
     * because it will re-render the component thanks to useEffect,
     * but the post from u query will not be updated.
     * so the react-query still sends the old cached post.content.
     */

    //normalize colors for theme
    const remappedContent = useMemo(() => {
        if (!post || !post.content) return;
        return remapColors(post.content, theme == 'dark');
    }, [post, theme]);

    if (post && remappedContent) {
        const html = generateHTML(remappedContent, [
            StarterKit,
            Highlight,
            Placeholder.configure({placeholder: 'Start typing...'}),
            TextAlign.configure({types: ['heading', 'paragraph']}),
            TextStyle,
            FontFamily,
            FontSize,
            Color,
            BackgroundColor,
            Image]);
        return (
            <LoadingSmall isLoading={isLoading}>
                <main
                    className="prose prose-gray dark:prose-invert max-w-3xl mx-auto py-6 px-4 sm:px-0"
                    dangerouslySetInnerHTML={{__html: html}}
                />
            </LoadingSmall>
        );
    } else return error ? <div>{error.message}</div> : null;
}

export default Content;