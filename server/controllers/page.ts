import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import Data from '../models/project';
//import User from '../models/user';
import BaseCtrl from './base';

export default class PageCtrl extends BaseCtrl {
  model = Data.PageModel;

  public getAll(req, res) {
    // console.log(req);
    req.headers['parent'] = req.params.id;
    console.log('This', this);
    super.getAll(req, res);
  }

  // Insert
  public insert(req, res) {
    console.log("Request Body", req.body);
    const obj = new this.model(req.body);
    req.headers['parent'] = req.params.id;
    return super.insert(req, res);
  }
}