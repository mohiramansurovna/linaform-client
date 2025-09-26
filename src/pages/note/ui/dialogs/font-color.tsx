import {Button} from '@/components/ui/button.tsx';
import {Popover, PopoverTrigger, PopoverContent} from '@/components/ui/popover.tsx';
import {ChevronDown, CircleSlash2} from 'lucide-react';
import colors from "@/lib/colors.json";
import {useThemeStore} from '@/hooks/useThemeStore.ts';
import React from 'react';
import type {Editor} from '@tiptap/react';

function FontColor({isBg, editor}: { isBg: boolean, editor: Editor }) {
    const {theme} = useThemeStore();
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className={`${isBg?'bg-violet-600 dark:bg-violet-400 hover:bg-violet-700 dark:hover:bg-violet-500 text-white hover:text-white':'text-violet-800 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300'}`}>
                    <p>Aa</p>
                    <ChevronDown size={16}/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto h-auto">
                <label className="text-gray-600 flex justify-between">
                    {isBg?'Background':'Font'} Colors
                <Button onClick={() => {
                    if (isBg) editor.chain().focus().unsetBackgroundColor().run();
                    else editor.chain().focus().unsetColor().run();
                }} title={'default'} variant={'ghost'}><CircleSlash2 size={15}/></Button>
                </label>
                <div className="grid grid-rows-6 gap-0.5 grid-flow-col border w-auto h-auto">
                    {Object.entries(colors).map(([colorName, shades]) =>
                        Object.entries(shades).map(([shade, pair]) => {
                            const buttonColor = theme === 'dark' ? pair.dark : pair.light;
                            return (
                                <button
                                    key={`${colorName}-${shade}`}
                                    className="w-4 h-4"
                                    style={{backgroundColor: buttonColor}}
                                    title={`${colorName}-${shade}`}
                                    onClick={() => {
                                        if (isBg) editor.chain().focus().setBackgroundColor(buttonColor).run();
                                        else editor.chain().focus().setColor(buttonColor).run();
                                    }}
                                />
                            );
                        }),
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default React.memo(FontColor);