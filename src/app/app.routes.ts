import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { LoginComponent } from './iam/presentation/views/login/login.component';
import { RegisterComponent } from './iam/presentation/views/register/register.component';

//agregado
import { InventoryComponent } from './inventory/presentation/views/inventory/inventory.component';

const about = () =>
    import('./shared/presentation/views/about/about').then(m => m.About);
const pageNotFound = () =>
    import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const inventory = () =>
    import('./inventory/presentation/views/inventory/inventory.component').then(m => m.InventoryComponent);
const profile = () =>
    import('./iam/presentation/views/profile/profile.component').then(m => m.ProfileComponent);
const reports = () =>
    import('./reports/presentation/views/reports/reports.component').then(m => m.ReportsComponent);

const baseTitle = 'InventaTrack';

export const routes: Routes = [
    { path: 'home', component: Home, title: `${baseTitle} - Home` },
    { path: 'login', component: LoginComponent, title: `${baseTitle} - Login` },
    { path: 'register', component: RegisterComponent, title: `${baseTitle} - Register` },
    { path: 'about', loadComponent: about, title: `${baseTitle} - About` },
    { path: 'inventory', loadComponent: inventory, title: `${baseTitle} - Inventory` },
    { path: 'profile', loadComponent: profile, title: `${baseTitle} - Profile` },
    { path: 'reports', loadComponent: reports, title: `${baseTitle} - Reports` },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not found` },
];
