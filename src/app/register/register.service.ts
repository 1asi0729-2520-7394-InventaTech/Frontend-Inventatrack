import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../profile/user.model';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/v1/users';
  private adminToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc2NDgyMTk4OSwiZXhwIjoxNzY0OTA4Mzg5fQ.rdDXpVY8z3SLTgCeM27BEvPAZTxKWEWlrAFRkNaHqMo';

  constructor(private http: HttpClient) {}

  register(user: Partial<User>): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.adminToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, user, { headers, observe: 'response' });
  }
}
