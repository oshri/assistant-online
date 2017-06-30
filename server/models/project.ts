import * as mongoose from 'mongoose';
import { Project, Page } from "../../common/pojo/project";

const projectSchema = new mongoose.Schema({
    name: String,
    framework: String,
    library: String,
    creationTime: Date,
    parent: String
});

projectSchema.post('remove', function (doc) {
    console.log('Deleting Project', doc.id);
    PageModel.find({ parent: doc.id }, (err, docs) => {
        if (err) { return console.error(err); }
        for (let i = 0; i < docs.length; i++) {
            console.log('Deleting Page', docs[i].id);
            docs[i].remove();
        }
    });
});

const ProjectModel = mongoose.model('Project', projectSchema);

const pageSchema = new mongoose.Schema({
    name: String,
    layout: String,
    creationTime: Date,
    parent: String
});

const PageModel = mongoose.model('Page', pageSchema);

export default { ProjectModel, PageModel };
