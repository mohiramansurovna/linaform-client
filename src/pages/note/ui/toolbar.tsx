import {type Editor} from '@tiptap/react';
import {Tabs, TabsList, TabsContent, TabsTrigger} from '@/components/ui/tabs.tsx';
import React, {useMemo, useState, lazy,} from 'react';
import Metadata from "@/pages/note/ui/tool/metadata.tsx";
import {SidebarTrigger} from '@/components/ui/sidebar.tsx';
import {useNoteStore} from '@/pages/note/hooks/useNoteStore.ts';
import {AnimatePresence, motion,} from 'framer-motion';
import SkeletonTab from '@/pages/note/ui/tool/skeleton.tsx';

const File = lazy(() => import('@/pages/note/ui/tool/file.tsx'));
const Text = lazy(() => import('@/pages/note/ui/tool/text.tsx'));
const Font = lazy(() => import('@/pages/note/ui/tool/font.tsx'));
const Structure = lazy(() => import('@/pages/note/ui/tool/structure.tsx'));
const Insert = lazy(() => import('@/pages/note/ui/tool/insert.tsx'));

type NavState = 'file' | 'text' | 'font' | 'structure' | 'list' | 'insert';

function Toolbar({editor}:{editor:Editor}) {
    const {selectedNoteId} = useNoteStore();
    const tabs = useMemo(
        () => [
            {value: 'file', Component: File, label: 'File'},
            {value: 'text', Component: Text, label: 'Text'},
            {value: 'font', Component: Font, label: 'Font'},
            {value: 'structure', Component: Structure, label: 'Structure'},
            {value: 'insert', Component: Insert, label: 'Insert'},
        ],
        [],
    );

    const [navState, setNavState] = useState<NavState>('text');
    const ActivePanel = useMemo(() => tabs.find(t => t.value === navState)?.Component, [tabs, navState]);
    const MotionTabsContent = motion.create(TabsContent);
    return selectedNoteId ? (
        <div
            className="flex bg-background sticky top-0 z-20 w-full flex-wrap-reverse md:flex-nowrap md:justify-between items-baseline shadow-xs p-1 md:px-4"
        >
            <Tabs
                className="max-w-74 min-w-74 h-18 overflow-x-visible"
                value={navState}
                onValueChange={value => setNavState(value as NavState)}>
                <TabsList
                    className={`bg-transparent *:data-[state=active]:border-b-primary *:border-transparent *:data-[state=active]:shadow-none *:rounded-none -mt-1 *:h-5`}>
                    <SidebarTrigger/>
                    {tabs.map(tab => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <AnimatePresence>
                    {ActivePanel && editor && (
                        <MotionTabsContent
                            className="flex gap-2 ml-8 md:ml-0  items-start *:h-8"
                            initial={{opacity: 0, x: -10}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: 10}}
                            transition={{duration: 0.2}}
                            key={navState} value={navState}
                        >
                            <SkeletonTab>
                                <ActivePanel editor={editor}/>
                            </SkeletonTab>
                        </MotionTabsContent>
                    )}
                </AnimatePresence>
            </Tabs>
            {editor && <Metadata editor={editor}/>}
        </div>
    ) : <SidebarTrigger className="top-0 absolute"/>;
}

export default React.memo(Toolbar);