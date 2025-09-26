import type { JSONContent } from "@tiptap/core";
import palette from "./colors.json";

const reverseMap: Record<string, { color: string; index: string }> = {};

for (const [color, shades] of Object.entries(palette)) {
    for (const [idx, pair] of Object.entries(shades)) {
        reverseMap[pair.light] = { color, index: idx };
        reverseMap[pair.dark] = { color, index: idx };
    }
}

export function remapColors(doc: JSONContent, isDark: boolean): JSONContent {
    console.log('remap colors', isDark);
    function traverse(node: JSONContent): JSONContent {
        if (node.marks) {
            node.marks = node.marks.map(mark => {
                if (mark.type === "textStyle" && mark.attrs?.color) {
                    const lookup = reverseMap[mark.attrs.color];
                    if (lookup) {
                        // @ts-expect-error keys are the same
                        const newColor = isDark?palette[lookup.color][lookup.index].dark: palette[lookup.color][lookup.index].light;

                        return {
                            ...mark,
                            attrs: {
                                ...mark.attrs,
                                color: newColor,
                            },
                        };
                    }
                }
                return mark;
            });
        }
        if (node.content) {
            node.content = node.content.map(traverse);
        }
        return node;
    }
    return traverse({ ...doc });
}

