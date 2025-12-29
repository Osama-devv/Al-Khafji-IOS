import { IApiResponse } from '@services/home/types';
import { emptySplitApi } from '../emptySplitApi';
import { IStartupResponse } from './types';

const startUpUrl = process.env.STARTUP_URL;
export const startupApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        startup: builder.query<IApiResponse<IStartupResponse>, void>({
            query: () => ({
                url: `${startUpUrl}`,
                method: 'GET',
            }),
            providesTags: () => [{ type: 'Startup' }],
        }),
    }),
}
);


export const { useStartupQuery } = startupApi;
