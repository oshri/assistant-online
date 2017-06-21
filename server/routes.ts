import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import Cat from './models/cat';
import User from './models/user';
var request = require('request');


export default function setRoutes(app) {

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();

  // Cats
  app.route('/api/cats').get(catCtrl.getAll);
  app.route('/api/cats/count').get(catCtrl.count);
  app.route('/api/cat').post(catCtrl.insert);
  app.route('/api/cat/:id').get(catCtrl.get);
  app.route('/api/cat/:id').put(catCtrl.update);
  app.route('/api/cat/:id').delete(catCtrl.delete);

  // Users
  app.route('/api/login').post(userCtrl.login);
  app.route('/api/users').get(userCtrl.getAll);
  app.route('/api/users/count').get(userCtrl.count);
  app.route('/api/user').post(userCtrl.insert);
  app.route('/api/user/:id').get(userCtrl.get);
  app.route('/api/user/:id').put(userCtrl.update);
  app.route('/api/user/:id').delete(userCtrl.delete);

  // Fuck You
  app.route('/api/createcontrol').get(userCtrl.createControl);
  app.route('/api/timesheet').post(function(req, res){
    // console.log("User", req.user);
    // console.log("User", req.headers);
    let auth = req.headers.authorization;
    console.log("Profile", req.body.profile);

    // // Get user social profile
    // request.get(
    //   'https://quicappdev.auth0.com/userinfo', 
    // { json: { key: 'value' }, headers: {authorization: auth} },
    // function (error, response, body) {
    //   console.error("Body", body);
    //   console.error("Error", error);
    //   // onsole.error("Response", response);
    // }
// );

    res.status(201).send({message:"This is the POST /timesheet endpoint"});
  });
}
