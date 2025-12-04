import { Home } from './shared/presentation/views/home/home';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const about = () =>
    import('./shared/presentation/views/about/about').then(m => m.About);
@@ -17,13 +18,13 @@ const reports = () =>
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
