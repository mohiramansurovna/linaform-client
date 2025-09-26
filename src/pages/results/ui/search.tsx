import Post from '@/pages/results/ui/post.tsx';
import {LoaderCircle} from 'lucide-react';
import {usePopularGlobalPosts, useSearchGlobalPosts} from '@/pages/results/hooks/useGlobalPosts.ts';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import {SearchInput} from '@/components/search-input.tsx';
import {useState} from 'react';

function SearchPosts() {
    const {data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage} = usePopularGlobalPosts();
    const posts = data?.pages.flatMap((page) => page.posts) ?? [];
    const [term, setTerm] = useState<null | string>(null);
    const {
        data: searchData,
        isLoading: isSearchLoading,
        hasNextPage: hasSearchNextPage,
        fetchNextPage: fetchSearchNextPage,
        isFetchingNextPage: IsFetchingSearchNextPage,
    } = useSearchGlobalPosts(term);

    const searchPosts = searchData?.pages.flatMap((page) => page.posts) ?? [];

    return (
        <div className="flex flex-col w-full px-6 md:px-20 py-10 gap-6">
            <div className="flex flex-col items-center gap-8">
                <h1 className="text-5xl font-delius-swash-caps text-zinc-800 dark:text-zinc-100">
                    Linaform
                </h1>
                <SearchInput value={term ?? ''} setValue={setTerm} Component={Input} containerClassName={"w-full max-w-xl"} classname={"rounded-full"}
                             placeholder={"Search for posts"}/>
            </div>

            <div className="flex flex-col gap-4 mt-6">
                {(isLoading || isSearchLoading) && (
                    <div className="flex justify-center items-center h-[60vh]">
                        <LoaderCircle className="h-10 w-10 animate-spin text-zinc-500"/>
                    </div>
                )}
                {!term && posts?.map((post) => (
                    <Post post={post} key={post.id}/>
                ))}
                {term && searchPosts?.map((post) => (
                    <Post post={post} key={post.id}/>
                ))}

                {(term && searchPosts.length === 0) || (!term && posts.length === 0) && (
                    <p className="self-center text-center mt-20 text-zinc-500">
                        Oops, there is no result for your search.
                        <br/>
                        <a
                            href="/results/search"
                            className="hover:text-primary underline underline-offset-4"
                        >
                            Try exploring
                        </a>
                    </p>
                )}
            </div>

            {hasNextPage && !term && (
                <div className="flex justify-center mt-6">
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="rounded-xl"
                        variant="outline"
                    >
                        {isFetchingNextPage ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            )}
            {hasSearchNextPage && term && (
                <div className="flex justify-center mt-6">
                    <Button
                        onClick={() => fetchSearchNextPage()}
                        disabled={IsFetchingSearchNextPage}
                        className="rounded-xl"
                        variant="outline"
                    >
                        {IsFetchingSearchNextPage ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default SearchPosts;
