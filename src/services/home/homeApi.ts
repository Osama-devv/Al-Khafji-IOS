import { emptySplitApi } from '../emptySplitApi';
import { IApiResponse, IHomeResponse } from './types';

export const homeApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        home: builder.query<IApiResponse<IHomeResponse>, void>({
            query: () => ({
                url: '/pages/home',
                method: 'GET',
            }),
            providesTags: () => [{ type: 'Home' }],
        }),
    })
});

export const { useHomeQuery } = homeApi;
