import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command.tsx';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover.tsx';
import {Button} from '@/components/ui/button.tsx';
import React, {useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {type Editor} from '@tiptap/react';
import {useGoogleFontsQuery} from '../../hooks/useGoogleFontsQuery.ts';
import {useSyncFonts} from '@/hooks/useSyncFonts.ts';

const defaultFont = (
    <svg
        _ngcontent-ng-c508314537=""
        width="48"
        height="48"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            _ngcontent-ng-c508314537=""
            d="m16.7 20.7-4.4 6.6h-10L16.7 6v14.7ZM25.3 6h-8.6v21.3h8.6V6ZM6 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinejoin="round"></path>
        <path
            _ngcontent-ng-c508314537=""
            d="M25.3 15.3a4.7 4.7 0 0 1 0-9.3m0 9.3V6m0 9.3a4.7 4.7 0 0 0 0-9.3"
            stroke="#000"
            strokeWidth="1.5"></path>
        <path
            _ngcontent-ng-c508314537=""
            d="M25.3 15.3a6 6 0 0 1 0 12"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinejoin="round"></path>
        <path
            _ngcontent-ng-c508314537=""
            d="M25.3 27.3a6 6 0 0 1 0-12"
            stroke="#000"
            strokeWidth="1.5"></path>
    </svg>
);

function FontPicker({editor}:{editor:Editor}) {
    const [open, setOpen] = useState(false);
    const {data: fonts = [], isLoading} = useGoogleFontsQuery();
    const {loadFont, syncFonts} = useSyncFonts();
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="w-auto justify-between">
                    {defaultFont}
                    {editor.getAttributes('textStyle').fontFamily || 'Font Family'}
                    <ChevronDown size={16}/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
                <Command>
                    <CommandInput placeholder="Search fonts..."/>
                    <CommandList>
                        <CommandGroup heading="Google Fonts">
                            {isLoading && <p>Loading fonts ...</p>}
                            {fonts.map(font => (
                                <CommandItem
                                    key={font}
                                    onMouseEnter={() => loadFont(font)}
                                    onSelect={() => {
                                        editor.chain().focus().setFontFamily(font).run();
                                        syncFonts(editor.getJSON());
                                        setOpen(false);
                                    }}
                                    style={{fontFamily: font}}>
                                    {font}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
export default React.memo(FontPicker)