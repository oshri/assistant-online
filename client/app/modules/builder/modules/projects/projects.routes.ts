import { Routes, RouterModule } from "@angular/router";
import { ProjectsComponent } from './components/projects/projects.component';

const PROJECTS_ROUTES: Routes = [
    {
        path: '',
        component: ProjectsComponent,
        pathMatch: 'prefix',
        children: []
    }
];

export let ProjectsRouterModule = RouterModule.forChild(PROJECTS_ROUTES);