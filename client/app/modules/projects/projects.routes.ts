import { Routes, RouterModule } from "@angular/router";
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectsResolver } from './services/projects.resolve';
import { ProjectComponent } from './components/project/project.component';


const PROJECTS_ROUTES: Routes = [
    {
        path: '',
        component: ProjectsComponent,
        resolve: {
            projects: ProjectsResolver
        }
    },
    {
        path: ':id',
        component: ProjectComponent
    }
];

export let ProjectsRouterModule = RouterModule.forChild(PROJECTS_ROUTES);