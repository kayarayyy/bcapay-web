import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgxDatatableModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  error = '';
  pageOffset = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Gagal memuat data user';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  onPage(event: any) {
    this.pageOffset = event.offset;
  }

  addUser(): void {
    console.log('Add User button clicked');
    // buka modal atau navigasi ke halaman tambah user
  }

  updateUser(id: string): void {
    console.log(`Update user with id: ${id}`);
    // navigasi ke halaman edit user / buka modal form
  }

  deleteUser(id: string): void {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data user yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserById(id).subscribe(
          (response) => {
            if (response.status === 'success') {
              // Tampilkan konfirmasi sukses
              Swal.fire({
                title: 'Sukses!',
                text: 'User telah dihapus.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
              });

              // Hapus user dari daftar setelah berhasil dihapus
              this.users = this.users.filter(user => user.id !== id);
            } else {
              Swal.fire({
                title: 'Gagal!',
                text: response.message || 'Terjadi kesalahan.',
                icon: 'error',
                confirmButtonColor: '#d33',
              });
            }
          },
          (error) => {
            Swal.fire({
              title: 'Gagal!',
              text: 'Terjadi kesalahan saat menghapus user.',
              icon: 'error',
              confirmButtonColor: '#d33',
            });
          }
        );
      }
    });
  }
}
