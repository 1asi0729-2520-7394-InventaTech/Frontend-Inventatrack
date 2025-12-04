import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../profile/user.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/v1/auth/login';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User | null> {
    return this.http.post<User | null>(this.apiUrl, { username, password }).pipe(
      tap(user => {
        if (user) {
          // Guardar usuario en memoria y en localStorage
          this.currentUserSubject.next(user);
          localStorage.setItem('loggedUser', JSON.stringify(user));
        }
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value || JSON.parse(localStorage.getItem('loggedUser') || 'null');
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('loggedUser');
  }
}
