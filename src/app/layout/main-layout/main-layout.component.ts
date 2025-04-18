import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar-layout/sidebar-layout.component';
import { RouterOutlet, Router } from '@angular/router';
import { AuthSessionService } from '../../core/services/auth-session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  userName: string = '';
  userRole: string = '';

  constructor(private session: AuthSessionService, private router: Router) {}

  ngOnInit() {
    this.userName = this.session.name;
    this.userRole = this.session.role;
  }

  logout(event?: MouseEvent): void {
    if (event) event.preventDefault();

    Swal.fire({
      title: 'Logout dari aplikasi?',
      text: 'Anda akan keluar dari sesi saat ini.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Ya, logout',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.session.clearSession();
        this.router.navigate(['/login']);

        Swal.fire({
          title: 'Logged out!',
          text: 'Anda telah berhasil keluar.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }

}
