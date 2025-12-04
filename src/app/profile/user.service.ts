import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { User } from './user.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/v1/users';

  constructor(private loginService: LoginService, private http: HttpClient) {}

  get currentUser$(): Observable<User | null> {
    return this.loginService.currentUser$;
  }

  getLoggedUser(): Observable<User | null> {
    const user = this.loginService.getCurrentUser();
    const token = this.loginService.getToken();

    if (!user || !token) return of(null);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(`${this.apiUrl}/${user.id}`, { headers });
  }
}

