import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import Data from '../models/project';
//import User from '../models/user';
import BaseCtrl from './base';

export default class ProjectCtrl extends BaseCtrl {
  model = Data.ProjectModel;
}
