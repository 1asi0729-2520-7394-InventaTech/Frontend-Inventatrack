/**import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
   private apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/v1/users';

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}?id=${id}`).pipe(
      map(users => users.length > 0 ? users[0] : null),
      catchError(() => of(null))
    );
  }

  getLoggedUser(): Observable<User | null> {
    const id = localStorage.getItem('loggedUserId');
    if (!id) return of(null);
    return this.getUserById(Number(id));
  }
}**/
