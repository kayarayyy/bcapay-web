import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model'; // pastikan file modelnya ada

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<{ data: User[] }>(`${this.baseUrl}/users`)
      .pipe(map(response => response.data));
  }

  deleteUserById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users/${id}`);
  }
}
