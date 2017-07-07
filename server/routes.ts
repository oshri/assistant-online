import { Request } from '@angular/http';
import * as express from 'express';

import UserCtrl from './controllers/user';
import User from './models/user';

import ProjectCtrl from './controllers/project';
import ProjectModel from "./models/project";

import PageModel from "./models/project";
import PageCtrl from './controllers/page';


var request = require('request');


export default function setRoutes(app) {

  const userCtrl = new UserCtrl();
  const projectCtrl = new ProjectCtrl();
  const pageCtrl = new PageCtrl();

  app.route('/api/authorization').post(function (req, res) {
    const auth = req.headers.authorization;
    res.status(201).send({ message: "quickApp authorization endpoint success" });
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
  // app.route('/api/projects').post((request, response) => {
  //   console.log('request', request.body);
  //   response.status(201).send({message: 'project add :)'})
  // });

  app.route('/api/projects').post((req, res) => projectCtrl.insert(req, res));
  app.route('/api/projects').get((req, res) => projectCtrl.getAll(req, res));
  app.route('/api/projects/:id').get((req, res) => projectCtrl.get(req, res));
  app.route('/api/projects/:id').put((req, res) => projectCtrl.update(req, res));
  app.route('/api/projects/:id').delete((req, res) => projectCtrl.delete(req, res));

  // The id of the owning project
  app.route('/api/pages/:id').post((req, res) => {
    pageCtrl.insert(req, res);
  });
  app.route('/api/pages/:id').get((req, res) => pageCtrl.getAll(req, res));
  // app.route('/api/pages/:id').get((req, res) => pageCtrl.get(req, res));
  app.route('/api/pages/:id').put((req, res) => pageCtrl.update(req, res));
  app.route('/api/pages/:id').delete((req, res) => pageCtrl.delete(req, res));
}
