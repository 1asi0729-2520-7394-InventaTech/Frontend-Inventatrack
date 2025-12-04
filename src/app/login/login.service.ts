import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../profile/user.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/v1/auth/login';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ success: boolean; user?: User }>(this.apiUrl, { username, password }).pipe(
      tap(res => {
        if (res.success && res.user) {
          localStorage.setItem('loggedUser', JSON.stringify(res.user));
          this.currentUserSubject.next(res.user);
        }
      }),
      map(res => res.success)
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value || JSON.parse(localStorage.getItem('loggedUser') || 'null');
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    this.currentUserSubject.next(null);
  }
}



