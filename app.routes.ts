import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

/** Rutas de BioConnect. Las páginas internas están protegidas con authGuard */
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login').then((m) => m.Login) },
  { path: 'registro', loadComponent: () => import('./pages/registro/registro').then((m) => m.Registro) },
  {
    path: '',
    loadComponent: () => import('./pages/layout/layout').then((m) => m.Layout),
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard) },
      { path: 'red-social', loadComponent: () => import('./pages/publicaciones/publicaciones').then((m) => m.Publicaciones) },
      { path: 'empleo', loadComponent: () => import('./pages/empleo/empleo').then((m) => m.Empleo) },
      { path: 'biodiversidad', loadComponent: () => import('./pages/biodiversidad/biodiversidad').then((m) => m.Biodiversidad) },
      { path: 'usuarios', loadComponent: () => import('./pages/usuarios/usuarios').then((m) => m.Usuarios) },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
