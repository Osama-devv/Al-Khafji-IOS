import { emptySplitApi } from '../emptySplitApi';
import { IApiResponse } from './types';

export const profileApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    profile: builder.query<IApiResponse<any>, void>({ // <-- endpoint name changed
      query: () => ({
        url: '/pages/profile',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'Profile' }],
    }),
  }),
});

export const { useProfileQuery } = profileApi; // now this works
