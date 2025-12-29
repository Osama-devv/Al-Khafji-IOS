import {
  AZURE_TENANT_NAME,
  AZURE_DOMAIN,
  AZURE_CLIENT_ID,
  AZURE_LOGIN_POLICY,
  AZURE_FORGOT_POLICY,
  AZURE_REDIRECT_URI,
} from '@env';

const getB2CConfig = (policy, email) => ({
  clientId: AZURE_CLIENT_ID,
  redirectUrl: AZURE_REDIRECT_URI,
  scopes: ['openid', 'profile', 'email'],
  serviceConfiguration: {
    authorizationEndpoint: `https://${AZURE_TENANT_NAME}.b2clogin.com/${AZURE_DOMAIN}/${policy}/oauth2/v2.0/authorize`,
    tokenEndpoint: `https://${AZURE_TENANT_NAME}.b2clogin.com/${AZURE_DOMAIN}/${policy}/oauth2/v2.0/token`,
  },
  useNonce: true,
  usePKCE: true,
  additionalParameters: {
    p: policy,
    prompt: 'login',
    email: email,
  },
});
export const loginConfig = (email)=> getB2CConfig(AZURE_LOGIN_POLICY, email);
export const forgotPasswordConfig = getB2CConfig(AZURE_FORGOT_POLICY);

// ? note: in service configuration it is most important to keep policy names.
// ?  You can omit `p` from additional parameters now since it's in the path — but it's fine to keep
// ? ios fix is too keep trailing slash in redirect uri other wise it kills the effort.