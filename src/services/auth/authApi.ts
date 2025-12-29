import { emptySplitApi } from "../emptySplitApi";



export const authApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<any, any>({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        loginData: builder.query<any, void>({
            query: () => ({
                url: '/login',
                method: 'GET',
            }),
            providesTags: () => [{ type: 'LoginData' }],
        }),
        sendNotification: builder.mutation<any, any>({
            query: credentials => ({
                url: '/send-notification',
                method: 'POST',
                body: credentials,
            }),
        }),
        createSsoUserAccount: builder.mutation<any, any>({
            query: credentials => {
                return {
                url: `/create-sso-user-account`,
                method: 'POST',
                body: credentials,
            }},
        }),
    }),
});

export const {
    useLoginMutation,
    useLoginDataQuery,
    useSendNotificationMutation,
    useCreateSsoUserAccountMutation,
} = authApi;
