import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  async login(nip: string, password: string): Promise<boolean> {
    try {
      const payload = { nip, password };
      const response = await firstValueFrom(
        this.http.post<any>('http://localhost:8080/api/v1/auth/login-employee', payload)
      );
      console.log(response);

      const data = response.data;

      const user: Auth = {
        name: data.name,
        email: data.email,
        role: data.role,
        token: data.token,
        features: data.features.slice(1),
        is_active: data.is_active,
      };

      localStorage.setItem('auth', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Login gagal:', error);
      return false;
    }
  }
}
