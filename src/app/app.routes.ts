import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard'; 

const about = () =>
    import('./shared/presentation/views/about/about').then(m => m.About);
const pageNotFound = () =>
    import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const inventory = () =>
    import('./inventory/inventory.component').then(m => m.InventoryComponent);
const profile = () =>
    import('./profile/profile.component').then(m => m.ProfileComponent);
const reports = () =>
    import('./reports/reports.component').then(m => m.ReportsComponent);

const baseTitle = 'InventaTrack';

export const routes: Routes = [
    { path: 'home', component: Home, title: `${baseTitle} - Home`, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, title: `${baseTitle} - Login` },
    { path: 'register', component: RegisterComponent, title: `${baseTitle} - Register` },
    { path: 'about', loadComponent: about, title: `${baseTitle} - About` },
    { path: 'inventory', loadComponent: inventory, title: `${baseTitle} - Inventory`, canActivate: [AuthGuard] },
    { path: 'profile', loadComponent: profile, title: `${baseTitle} - Profile`, canActivate: [AuthGuard] },
    { path: 'reports', loadComponent: reports, title: `${baseTitle} - Reports`, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not found` },
];
