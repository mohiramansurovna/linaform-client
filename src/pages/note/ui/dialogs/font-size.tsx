import {Button} from '@/components/ui/button.tsx';
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandInput,
    CommandList,
} from '@/components/ui/command.tsx';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover.tsx';
import {type Editor} from '@tiptap/react';
import {ChevronDown} from 'lucide-react';
import React, {useState} from 'react';

function FontSize({editor}:{editor:Editor}) {
    const fontSize = Array.from({length: 121}, (_, i) => i + 8);
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant='ghost'>
                    {editor.getAttributes('textStyle').fontSize || '16px'}
                    <ChevronDown size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-64 p-0'>
                <Command>
                    <CommandInput placeholder='Choose font size ...' />
                    <CommandList>
                        <CommandGroup>
                            {fontSize.map(size => (
                                <CommandItem
                                    key={size}
                                    onSelect={() => {
                                        editor
                                            .chain()
                                            .focus()
                                            .setFontSize(size + 'px')
                                            .run();
                                        setOpen(false);
                                    }}>
                                    {size}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
export default React.memo(FontSize)
