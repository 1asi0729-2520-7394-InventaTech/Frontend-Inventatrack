import {Component, inject, signal} from '@angular/core';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {FooterContent} from '../footer-content/footer-content';
import {MatButton} from '@angular/material/button';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {filter} from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [
    MatToolbar,
    MatToolbarRow,
    LanguageSwitcher,
    FooterContent,
    MatButton,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    RouterOutlet
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout {

  private router = inject(Router);

  showNavbar = signal(true);


  options = [
    {link: '/home', label: 'option.home'},
    {link: '/inventory', label: 'option.inventory'},
    {link: '/about', label: 'option.about'},
    {link: '/profile', label: 'option.profile'},
    {link: '/reports', label: 'option.reports'},
    {link: '/login', label: 'option.login'}
  ]

  constructor() {
    // Escuchar cambios de navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkCurrentRoute();
    });

    this.checkCurrentRoute();
  }

  private checkCurrentRoute() {
    const isLogin = this.router.url.includes('/login');
    this.showNavbar.set(!isLogin);
  }
}
