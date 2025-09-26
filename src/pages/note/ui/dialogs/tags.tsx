import {type Dispatch, type SetStateAction, useState} from 'react';
import {Command, CommandGroup, CommandInput, CommandItem, CommandList} from '@/components/ui/command.tsx';
import {useTagsQuery} from '@/hooks/useTagsQuery.ts';
import {useTagsCreate, useTagsDelete} from '@/hooks/useTagsMutations.ts';
import type {Tag} from '@/schemas.ts';

function Tags({selectedTags, setSelectedTags}: { selectedTags: Tag[], setSelectedTags: Dispatch<SetStateAction<Tag[]>> }) {
    const {data: tags, isLoading} = useTagsQuery();
    const tagsCreateMutation = useTagsCreate();
    const [inputValue, setInputValue] = useState("");
    const tagsDeleteMutation = useTagsDelete();


    const handleAddTag = async (label: string) => {
        console.log(selectedTags);
        const existing = tags?.find((t) => t.label.toLowerCase() === label.toLowerCase());
        if (existing) {
            setSelectedTags((prev) =>
                prev.some((t) => t.id === existing.id) ? prev : [...prev, existing],
            );
        } else {
            //BBUILD: use hooks to get instant update. so a client won't wait for a server
            const {tag} = await tagsCreateMutation.mutateAsync(label);
            setSelectedTags((prev) => [...prev, tag]);
        }
    };
    return (
        <div className="space-y-2 flex flex-col">
            <Command>
                <CommandInput
                    placeholder="Search tags or create new..."
                    value={inputValue}
                    onValueChange={setInputValue}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && inputValue.trim()) {
                            e.preventDefault();
                            handleAddTag(inputValue.trim());
                            setInputValue("");
                        }
                    }}
                />
                <CommandList>
                    <CommandGroup>
                        {isLoading && <p>Loading tags...</p>}
                        {inputValue != '' && tags?.map((tag) => (
                            <CommandItem
                                key={tag.id}
                                onSelect={() => {
                                    handleAddTag(tag.label);
                                    setInputValue("");
                                }}
                            >
                                {tag.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>

            {/* Selected tags as chips */}
            <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                    <div
                        key={tag.id}
                        className="bg-zinc-200 dark:bg-zinc-900  rounded-md flex items-center gap-1"
                    >

                    <span
                        className="px-2 py-1 text-sm"
                    >
                  {tag.label}
                </span>
                        <button
                            className=" h-full p-2 text-xs"
                            onClick={() => {
                                tagsDeleteMutation.mutate(tag.id);
                                setSelectedTags((prev) =>
                                    prev.filter((t) => t.id !== tag.id),
                                );
                            }}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tags;