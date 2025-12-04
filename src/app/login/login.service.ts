import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';

export interface User {
  id?: number;       
  username: string;
}

interface TokenResponse {
  token: string;
  user?: User;       
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/v1/auth/login';

  private currentTokenSubject = new BehaviorSubject<string | null>(null);
  currentToken$ = this.currentTokenSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    return this.http.post<TokenResponse>(this.apiUrl, { username, password }).pipe(
      tap(res => {
        localStorage.setItem('jwtToken', res.token);
        this.currentTokenSubject.next(res.token);

        const user: User = res.user || { username };
        localStorage.setItem('loggedUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }),
      map(res => res.token)
    );
  }

  getToken(): string | null {
    return this.currentTokenSubject.value || localStorage.getItem('jwtToken');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value || JSON.parse(localStorage.getItem('loggedUser') || 'null');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loggedUser');
    this.currentTokenSubject.next(null);
    this.currentUserSubject.next(null);
  }
}

