import { Injectable } from '@angular/core';
import { LoginService, User as LoginUser } from '../login/login.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private loginService: LoginService) {}

  getLoggedUser(): Observable<LoginUser | null> {
    const user = this.loginService.getCurrentUser();
    return of(user);
  }

  currentUser$ = this.loginService.currentUser$;
}
