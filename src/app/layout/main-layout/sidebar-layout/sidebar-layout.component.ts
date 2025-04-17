import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Pastikan RouterModule diimpor

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, NgIf],  // Impor RouterModule di sini
  templateUrl: './sidebar-layout.component.html'
})
export class SidebarComponent {
  hasFeature(feature: string): boolean {
    const features = JSON.parse(localStorage.getItem('features') || '[]');
    return features.includes(feature);
  }
}
