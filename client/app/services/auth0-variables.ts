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
    clientID: 'a6nZBuUCCka1Sf5vwJdyIVIpxtAjMNb3',
    domain: 'quicappdev.auth0.com',
    responseType: 'token id_token',
    audience: 'https://quicappdev.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback', 
    callbackURL: 'http://localhost:4200/callback',         
    scope: 'openid'
  };