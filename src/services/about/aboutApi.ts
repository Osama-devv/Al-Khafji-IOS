import { emptySplitApi } from '../emptySplitApi';
import { IApiResponse, IMoreResponse } from './types';

export const aboutApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    about: builder.query<IApiResponse<IMoreResponse>, void>({ // <-- endpoint name changed
      query: () => ({
        url: '/pages/about',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'About' }],
    }),
  }),
});

export const { useAboutQuery } = aboutApi; // now this works
