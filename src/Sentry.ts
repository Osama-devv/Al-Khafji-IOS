import * as Sentry from '@sentry/react-native';
import { SENTRY_DSN } from '@env';

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation({
    routeChangeTimeoutMs: 100, //Default is 1000
});

export const sentryInit = (): void => {
    Sentry.init({
        dsn: SENTRY_DSN,
        environment: 'production',
        // To set a uniform sample rate, 1.0 means 100%
        tracesSampleRate: 0.2,
        enableAutoPerformanceTracing: true,
        enableAutoSessionTracking: true,
        enableNativeCrashHandling: true,
        integrations: [
            new Sentry.ReactNativeTracing({
                // Pass instrumentation to be used as `routingInstrumentation`
                routingInstrumentation,
                traceXHR: true,
                enableAppStartTracking: true,
                enableNativeFramesTracking: true,
                enableStallTracking: true,
                tracingOrigins: [/^\//, /^https:\/\//],
            }),
        ],
    });
};