import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar-layout/sidebar-layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  logout() {
    localStorage.removeItem('token');
    // Tambahkan redirect ke halaman login
  }
}
