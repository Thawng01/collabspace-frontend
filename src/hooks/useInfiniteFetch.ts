// hooks/useInfiniteFetch.ts
import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';

interface InfiniteFetchOptions<T> extends UseInfiniteQueryOptions<T> {
    queryKey: string[];
    queryFn: (context: { pageParam?: number }) => Promise<T>;
    initialPageParam?: number;
}

export const useInfiniteFetch = <T>({
    queryKey,
    queryFn,
    initialPageParam = 1,
    ...options
}: InfiniteFetchOptions<T>) => {
    return useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam = initialPageParam }) => queryFn({ pageParam }),
        initialPageParam,
        getNextPageParam: (lastPage: any, allPages) => {
            // Customize this based on your API response structure
            if (lastPage?.hasMore) {
                return allPages.length + 1;
            }
            return undefined;
        },
        ...options,
    });
};