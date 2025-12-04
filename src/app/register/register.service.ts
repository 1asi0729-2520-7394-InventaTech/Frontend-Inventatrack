import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../profile/user.model';
import { LoginService } from '../login/login.service';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/v1/users';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  register(user: Partial<User>): Observable<User> {
    const token = this.loginService.getToken();
    if (!token) {
      throw new Error('Usuario no autorizado. Debe iniciar sesión como admin.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<User>(this.apiUrl, user, { headers });
  }
}
