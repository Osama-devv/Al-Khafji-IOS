import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { SERVICE_TAGS } from '@constants/index';
import moment from 'moment-timezone';
import { setStartupOptions } from '@reducers/startup/startup-slice';


// Define base URLs
let BASE_URL = process.env.BASE_URL;
let FORMS_BASE_URL = process.env.FORMS_BASE_URL; // Add forms base URL
// X auth token: prefer env var but fall back to the provided value
let X_AUTH_TOKEN = process.env.X_AUTH_TOKEN ?? '1234567890';
const baseQuery = retry(
    fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState, endpoint }) => {
            const state = getState();
            const auth = state.auth;
            const deviceInfo = state.startup.deviceInfo;
            const startup = state.startup;

            // Set device info
            headers.set('deviceId', deviceInfo.deviceId);
            headers.set('deviceName', deviceInfo.deviceName);
            headers.set('platform', deviceInfo.deviceOS);
            // headers.set('api-key',SUBSCRIPTION_API_KEY);

            // Set X-Auth-Token header (static or from env)
            if (X_AUTH_TOKEN) {
                headers.set('X-Auth-Token', X_AUTH_TOKEN);
            }

            // Set token bearer
            if (auth.user?.token && endpoint !== 'refresh') {
                headers.set('Authorization', `Bearer ${auth.user?.token}`);
            }
            if (startup.options.language && endpoint !== 'refresh') {
                headers.set('Accept-Language', startup.options.language);
            }

            if (startup.subscriber) {
                headers.set(
                    'Mobile-App-Subscription-Key',
                    startup.subscriber.primary,
                );
                headers.set('Frck', startup.subscriber.frck);
            }
            // if(auth.user?.email){
            //     headers.set(
            //         'Authorization','Bearer 14taAMASO1999NAHSAK20001am'
            //     )

            // }

            // Get user's timezone using Intl.DateTimeFormat
            const userTimezone = moment.tz.guess();
            if (userTimezone) {
                headers.set('TimeZone', userTimezone);
            }

            return headers;
        },
        fetchFn: async (input, init) => {
            // Log the full request URL and options to help debug missing base URLs
            const requestUrl = typeof input === 'string' ? input : input.url;

            return fetch(input, init);
        },
    }),
    {
        maxRetries: 5,
    },
);

const baseQueryWithAuthToken: typeof baseQuery = async (args, api, extraOptions) => {
    // Append culture query param automatically from startup options (if not already present)
    try {
        const state = api.getState() as IState;
        const lang = state?.startup?.options?.language;

        let modifiedArgs: any = args;

        // If caller already included culture param, do not add again
        const hasCultureInString = typeof args === 'string' && args.includes('culture=');
        const hasCultureInParams = typeof args === 'object' && args != null && (args as any).params && Object.prototype.hasOwnProperty.call((args as any).params, 'culture');

        if (!hasCultureInString && !hasCultureInParams) {
            if (typeof args === 'string') {
                const sep = args.includes('?') ? '&' : '?';
                modifiedArgs = `${args}${sep}culture=${encodeURIComponent(lang)}`;
            } else if (args && typeof args === 'object') {
                modifiedArgs = {
                    ...args,
                    params: {
                        ...(args as any).params,
                        culture: lang,
                    },
                };
            }
        }

        const result = await baseQuery(modifiedArgs, api, extraOptions);
        const { dispatch } = api;
        const user = (api.getState() as IState).auth.user;

        if (user?.token && result?.error?.status === 401) {
            dispatch(setStartupOptions({ isTokenExpired: true }));
        }

        return result;
    } catch (err) {
        // If anything goes wrong building the request, fall back to original args
        return baseQuery(args, api, extraOptions);
    }
};

// Export the base URLs so they can be used elsewhere
export { BASE_URL, FORMS_BASE_URL };

// Initialize an empty API service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuthToken,
    tagTypes: SERVICE_TAGS,
    keepUnusedDataFor: 60,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
});
