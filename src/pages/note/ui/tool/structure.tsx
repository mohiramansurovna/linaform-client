import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover.tsx";
import {Toggle} from "@/components/ui/toggle.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {type Editor} from "@tiptap/react";
import {
    Heading,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Pilcrow,
    SquareCode,
    Quote,
    AlignJustify,
    AlignCenter,
    AlignLeft,
    AlignRight,
    List,
    ListOrdered,
} from "lucide-react";
import React from "react";

function Structure({editor}: {editor: Editor}) {
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        title="text"
                        className="p-2 rounded hover:bg-muted flex items-center justify-center"
                    >
                        {/* FEATURE: change the main icon into chosen header */}
                        <Heading size={18} />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="p-1 w-44">
                    <button
                        className={`flex w-full items-center justify-between px-2 py-1 rounded hover:bg-accent ${
                            editor.isActive("heading", {level: 1}) ? "bg-gray-100" : ""
                        }`}
                        onClick={() =>
                            editor.chain().focus().toggleHeading({level: 1}).run()
                        }
                    >
                        Heading 1
                        <Heading1 />
                    </button>
                    <button
                        className={`flex w-full items-center justify-between px-2 py-1 rounded hover:bg-accent ${
                            editor.isActive("heading", {level: 2}) ? "bg-gray-100" : ""
                        }`}
                        onClick={() =>
                            editor.chain().focus().toggleHeading({level: 2}).run()
                        }
                    >
                        Heading 2
                        <Heading2 />
                    </button>
                    <button
                        className={`flex w-full items-center justify-between px-2 py-1 rounded hover:bg-accent ${
                            editor.isActive("heading", {level: 3}) ? "bg-gray-100" : ""
                        }`}
                        onClick={() =>
                            editor.chain().focus().toggleHeading({level: 3}).run()
                        }
                    >
                        Heading 3
                        <Heading3 />
                    </button>
                    <button
                        className={`flex w-full items-center justify-between px-2 py-1 rounded hover:bg-accent ${
                            editor.isActive("heading", {level: 4}) ? "bg-gray-100" : ""
                        }`}
                        onClick={() =>
                            editor.chain().focus().toggleHeading({level: 4}).run()
                        }
                    >
                        Heading 4
                        <Heading4 />
                    </button>

                    <div className="my-1 h-px bg-border" />

                    <button
                        className={`flex w-full items-center justify-between px-2 py-1 rounded hover:bg-accent ${
                            editor.isActive("paragraph") ? "bg-gray-100" : ""
                        }`}
                        onClick={() => editor.chain().focus().setParagraph().run()}
                    >
                        Paragraph
                        <Pilcrow />
                    </button>
                </PopoverContent>
            </Popover>

            <Toggle
                title="code block"
                pressed={editor.isActive("codeBlock")}
                onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
                className="size-7"
            >
                <SquareCode />
            </Toggle>

            <Toggle
                title="block quote"
                pressed={editor.isActive("blockquote")}
                onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                className="size-7"
            >
                <Quote />
            </Toggle>

            <ToggleGroup
                type="single"
                onValueChange={(value) => {
                    if (value === "ul") {
                        editor.chain().focus().toggleBulletList().run();
                    } else if (value === "ol") {
                        editor.chain().focus().toggleOrderedList().run();
                    }
                }}
                size="lg"
                className="*:-mx-1 *:h-8"
            >
                <ToggleGroupItem title="unordered list" value="ul">
                    <List />
                </ToggleGroupItem>
                <ToggleGroupItem title="ordered list" value="ol">
                    <ListOrdered />
                </ToggleGroupItem>
            </ToggleGroup>

            <ToggleGroup
                type="single"
                onValueChange={(value) => {
                    if (value === "left") {
                        editor.chain().focus().setTextAlign("left").run();
                    } else if (value === "center") {
                        editor.chain().focus().setTextAlign("center").run();
                    } else if (value === "right") {
                        editor.chain().focus().setTextAlign("right").run();
                    } else if (value === "justify") {
                        editor.chain().focus().setTextAlign("justify").run();
                    }
                }}
                className="*:-mx-1 *:h-8"
                size={"lg"}
            >
                <ToggleGroupItem title="align left" value="left">
                    <AlignLeft />
                </ToggleGroupItem>
                <ToggleGroupItem title="align center" value="center">
                    <AlignCenter />
                </ToggleGroupItem>
                <ToggleGroupItem title="align right" value="right">
                    <AlignRight />
                </ToggleGroupItem>
                <ToggleGroupItem title="align justify" value="justify">
                    <AlignJustify />
                </ToggleGroupItem>
            </ToggleGroup>
        </>
    );
}

export default React.memo(Structure);
