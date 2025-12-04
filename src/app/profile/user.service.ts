import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User } from './user.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private loginService: LoginService) {}

  get currentUser$(): Observable<User | null> {
    return this.loginService.currentUser$;
  }

  getLoggedUser(): Observable<User | null> {
    return of(this.loginService.getCurrentUser());
  }
}
