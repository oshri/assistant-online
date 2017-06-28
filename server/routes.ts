import { Request } from '@angular/http';
import * as express from 'express';

import UserCtrl from './controllers/user';
import User from './models/user';
var request = require('request');


export default function setRoutes(app) {

  const userCtrl = new UserCtrl();

  app.route('/api/createcontrol').get(userCtrl.createControl);
  app.route('/api/authorization').post(function(req, res){
    const auth = req.headers.authorization;
    res.status(201).send({message:"quickApp authorization endpoint success"});
  });

  // Users
  app.route('/api/login').post(userCtrl.login);
  app.route('/api/users').get(userCtrl.getAll);
  app.route('/api/users/count').get(userCtrl.count);
  app.route('/api/user').post(userCtrl.insert);
  app.route('/api/user/:id').get(userCtrl.get);
  app.route('/api/user/:id').put(userCtrl.update);
  app.route('/api/user/:id').delete(userCtrl.delete);

  // Projects
  app.route('/api/projects').post((request, response) => {
    console.log('request', request.body);
    response.status(201).send({message: 'project add :)'})
  });


}
