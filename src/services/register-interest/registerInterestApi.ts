import { emptySplitApi } from '../emptySplitApi';
import { IApiResponse } from './types';

export const registerInterest = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    registerInterest: builder.query<IApiResponse<any>, void>({ // <-- endpoint name changed
      query: () => ({
        url: '/pages/register-interest',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'RegisterInterest' }],
    }),
  }),
});

export const { useRegisterInterestQuery } = registerInterest; // now this works
