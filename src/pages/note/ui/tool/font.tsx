import {type Editor} from '@tiptap/react';
import React from 'react';

const FontPicker = React.lazy(() => import('@/pages/note/ui/dialogs/font-style.tsx'));
const FontSize = React.lazy(() => import('@/pages/note/ui/dialogs/font-size.tsx'));
const FontColor = React.lazy(() => import('@/pages/note/ui/dialogs/font-color.tsx'));

function Font({editor}: { editor: Editor}) {
    return (
        <>
            <FontPicker editor={editor}/>
            <FontSize editor={editor}/>
            <FontColor editor={editor} isBg={false}/>
            <FontColor editor={editor} isBg={true}/>
        </>
    );
}

export default React.memo(Font);
