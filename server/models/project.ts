import * as mongoose from 'mongoose';
import { Project, Page } from "../../common/pojo/project";

const projectSchema = new mongoose.Schema({
    name: String,
     framework: String,
     library: String,
     creationTime: Date
});

const ProjectModel = mongoose.model('Project', projectSchema);

const pageSchema = new mongoose.Schema(Page);
const PageModel = mongoose.model('Page', pageSchema);

export default { ProjectModel, PageModel };
