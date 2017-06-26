import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
//const bodyParser = require('body-parser');

import setRoutes from './routes';

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../../public')));

app.use(jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://quicappdev.auth0.com/.well-known/jwks.json"
  }),

  // Validate the audience and the issuer
  audience: 'https://www.quicapp.com',
    issuer: "https://quicappdev.auth0.com/",
  algorithms: [ 'RS256' ]
}));

// return error message for unauthorized requests
app.use(function (err, req, res, next) {
  console.log(req.headers);
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({message:'Missing or invalid token'});
  }
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// // Authentication middleware. When used, the
// // access token must exist and be verified against
// // the Auth0 JSON Web Key Set
// const checkJwt = jwt({
//   // Dynamically provide a signing key
//   // based on the kid in the header and 
//   // the singing keys provided by the JWKS endpoint.
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://quicappdev.auth0.com/.well-known/jwks.json`
//   }),

//   // Validate the audience and the issuer.
//   audience: 'a6nZBuUCCka1Sf5vwJdyIVIpxtAjMNb3',
//   issuer: `https://quicappdev.auth0.com/`,
//   algorithms: ['RS256']
// });

// app.use(checkJwt);


app.use(morgan('dev'));

dotenv.load({ path: '.env' });
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;




var port = process.env.PORT || 8080;

var jwtCheck = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://quicappdev.auth0.com/.well-known/jwks.json"
    }),
    // audience: 'https://www.quicapp.com/',
    issuer: "https://quicappdev.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/api/protected', function (req, res) {
  console.log("User", req.user);
  res.send('Secured Resource');
});

app.listen(port);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  setRoutes(app);

  // app.use(jwt({
  //   secret: jwksRsa.expressJwtSecret({
  //     cache: true,
  //     rateLimit: true,
  //     jwksRequestsPerMinute: 5,
  //     jwksUri: `https://quicappdev.auth0.com/.well-known/jwks.json`
  //   }),
  //   credentialsRequired: false,
  //   getToken: function fromHeaderOrQuerystring(req) {
  //     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
  //       return req.headers.authorization.split(' ')[1];
  //     } else if (req.query && req.query.token) {
  //       return req.query.token;
  //     }
  //     return null;
  //   }
  // }));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

  app.listen(app.get('port'), () => {
    console.log('Assistant Online listening on port ' + app.get('port'));
  });

});

export { app };
