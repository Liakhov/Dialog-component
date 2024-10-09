import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/demo-page/demo-page.component').then(c => c.DemoPageComponent)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
