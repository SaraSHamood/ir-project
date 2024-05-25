import { Routes } from '@angular/router';

import { ContentComponent } from './components/content.component';

export const routes: Routes = [
  {
    path: 'ir',
    component: ContentComponent,
  },
  {
    path: '**',
    redirectTo: 'ir',
    pathMatch: 'full',
  },
];
