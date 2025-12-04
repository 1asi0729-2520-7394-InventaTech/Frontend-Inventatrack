import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';

interface TokenResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/v1/auth/login';

  private currentTokenSubject = new BehaviorSubject<string | null>(null);
  currentToken$ = this.currentTokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    return this.http.post<TokenResponse>(this.apiUrl, { username, password }).pipe(
      tap(res => {
        localStorage.setItem('jwtToken', res.token); // guardar token
        this.currentTokenSubject.next(res.token);
      }),
      map(res => res.token) // devolver el token en el subscribe
    );
  }

  getToken(): string | null {
    return this.currentTokenSubject.value || localStorage.getItem('jwtToken');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.currentTokenSubject.next(null);
  }
}

