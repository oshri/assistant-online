import { Routes, RouterModule } from "@angular/router";
import { BuilderComponent } from './components/builder/builder.component';

const BUILDER_ROUTES: Routes = [
    {
        path: '',
        component: BuilderComponent,
        children: [
            {
                path: 'projects',
                loadChildren: './modules/projects/projects.module#ProjectsModule'
            }
        ]
    }
];

export let BuilderRouterModule = RouterModule.forChild(BUILDER_ROUTES);