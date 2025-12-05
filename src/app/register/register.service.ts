/**import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../profile/user.model';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/v1/users';

  constructor(private http: HttpClient) {}

  register(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}**/
