import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./demo/pages/component-list-page/component-list-page.component').then(c => c.ComponentListPageComponent)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
