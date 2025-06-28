import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Galeria } from './pages/galeria/galeria';
import { Sugerencia } from './pages/sugerencia/sugerencia';



export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'galeria', component: Galeria },
  { path: 'sugerencia', component: Sugerencia },
  { path: '**', redirectTo: 'login' }
];
