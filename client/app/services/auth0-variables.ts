interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'FACIrfLLgrKvPPczu0xAx8EtIq0fjD4q',
  domain: 'quicapp.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};