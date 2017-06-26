interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  responseType: string;
  audience: string;
  redirectUri: string;
  scope: string;
}

export const AUTH_CONFIG: AuthConfig = {
    clientID: 'XBjb2yjLKFOr7BhPUHltDaSnEVDL9SNh',
    domain: 'quicappdev.auth0.com',
    responseType: 'token id_token',
    audience: 'https://quicappdev.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback', 
    callbackURL: 'http://localhost:4200/callback',         
    scope: 'openid'
  };