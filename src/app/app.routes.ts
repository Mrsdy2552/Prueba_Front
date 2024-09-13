import { Routes } from '@angular/router';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { ResumenComponent } from './dashboard/pages/resumen/resumen.component';

export const routes: Routes = [
  {
    path: 'Home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
];
