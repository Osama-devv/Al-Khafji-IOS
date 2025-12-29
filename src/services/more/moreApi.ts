import { emptySplitApi } from '../emptySplitApi';
import { IApiResponse } from './types';

export const moreApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    more: builder.query<IApiResponse<any>, void>({ // <-- endpoint name changed
      query: () => ({
        url: '/pages/more',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'More' }],
    }),
  }),
});

export const { useMoreQuery } = moreApi; // now this works
