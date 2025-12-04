import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../profile/user.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/v1/auth/login'
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }


  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }
}


