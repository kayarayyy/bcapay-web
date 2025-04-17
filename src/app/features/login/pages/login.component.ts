import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  nip: string = '';
  password: string = '';
  isLoading = false;
  error: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  async onSubmit() {
    if (!this.nip || !this.password) return;

    this.isLoading = true;

    const success = await this.auth.login(this.nip, this.password);

    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Login',
        text: 'NIP atau password salah',
        confirmButtonColor: '#d33'
      });
    }

    this.isLoading = false;
  }
}
