import { LanguageEnum } from '@appTypes/enums';
import { IState } from '@reducers/index';
import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

const calculateMaxPages = (total: number, size: number) => {
    return Math.ceil(total / size);
};

export const isValidNotEmptyArray = (array: any[]): boolean => {
    return !!(array && array?.length && array?.length > 0);
};

export interface IListQueryResponse {
    records: any[];
    totalResults: number;
    pageNo: number;
    pageSize: number;
    totalPages: number;
    nextPageNo: number;
    prevPageNo: number;
    hasPrevPage: number;
    hasNextPage: number;
    searchQuery: string;
    username: string;
}

const useInfiniteScroll = (
    useGetDataListQuery: UseQuery<any>,
    { ...queryParameters },
    skip?: boolean,
) => {
    const [localPage, setLocalPage] = useState(1);
    const [combinedData, setCombinedData] = useState<any[]>([]);
    const { options } = useSelector((state: IState) => state.startup);
    const { language } = options;
    const appLanguage: LanguageEnum = language ?? LanguageEnum.EN;
    const queryResponse = useGetDataListQuery(
        {
            pageNo: localPage,
            pageSize: queryParameters.pageSize,
            searchQuery: queryParameters.searchQuery,
            year: queryParameters.year,
            language: appLanguage,
            username:queryParameters.username,
            ...(queryParameters.categories && {
                categories: queryParameters.categories,
            }),
            ...(queryParameters.timings && {
                timings: queryParameters.timings,
            }),
            ...(queryParameters.locations && {
                locations: queryParameters.locations,
            }),
            ...(queryParameters.days && { days: queryParameters.days }),
        },
        { skip: skip },
    );

    const {
        records: fetchData = [],
        pageNo: remotePage = 1,
        totalResults: remoteTotal = 0,
        pageSize: remoteSize,
        totalPages,
    } = (queryResponse?.data?.data as IListQueryResponse) || {};

    useEffect(() => {
        if (isValidNotEmptyArray(fetchData)) {
            if (localPage === 1) {
                setCombinedData(fetchData);
            } else if (localPage === remotePage) {
                setCombinedData(previousData => [
                    ...previousData,
                    ...fetchData,
                ]);
            }
        } else if (
            !isValidNotEmptyArray(fetchData) &&
            isValidNotEmptyArray(combinedData)
        ) {
            setCombinedData([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData]);

    const maxPages = useMemo<number>(() => {
        return calculateMaxPages(remoteTotal, remoteSize);
    }, [remoteTotal, remoteSize]);

    const refresh = useCallback(() => {
        setLocalPage(1);
    }, []);
    const refetch=useCallback(()=>{
        queryResponse.refetch()
    },[queryResponse])

    const readMore = () => {
        if (localPage < maxPages && !queryResponse.isFetching) {
            setLocalPage(page => page + 1);
        }
    };

    return {
        combinedData,
        localPage,
        readMore,
        refresh,
        currentPage: localPage,
        totalPages,
        isLoading: queryResponse?.isLoading,
        isFetching: queryResponse?.isFetching,
        refetch
    };
};

export default useInfiniteScroll;
