interface Auth0Config {
  clientID: string;
  domain: string;
  callbackURL: string;
  responseType: string;
  audience: string;
  redirectUri: string;
  scope: string;
  clientSecret: string;
  quicAppDomain: string;
  grantType: string,
  oauthTokenUrl: string
}

// TODO: Load client secret from a secure location
export const AUTH0_CONFIG: Auth0Config = {
    clientID: 'XBjb2yjLKFOr7BhPUHltDaSnEVDL9SNh',
    domain: 'quicappdev.auth0.com',
    responseType: 'token id_token',
    audience: 'https://quicappdev.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback', 
    callbackURL: 'http://localhost:4200/callback',         
    scope: 'openid',
    clientSecret: 'pnThqha-SORZJBkGdMYPUQOp3_TNcL2Lg_os0OchmFcaS0n__SkJjowUzNW1ZQsI',
    quicAppDomain: 'https://www.quicapp.com',
    grantType: 'client_credentials',
    oauthTokenUrl: 'https://quicappdev.auth0.com/oauth/token'
  };