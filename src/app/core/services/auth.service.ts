import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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

      const data = response.data;

      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);
      localStorage.setItem('role', data.role.name);
      localStorage.setItem('features', JSON.stringify(data.features.slice(1)));

      return true;
    } catch (error) {
      console.error('Login gagal:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserInfo() {
    return {
      name: localStorage.getItem('name'),
      role: localStorage.getItem('role'),
      features: JSON.parse(localStorage.getItem('features') || '[]'),
    };
  }
}
