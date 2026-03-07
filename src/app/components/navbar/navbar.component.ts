import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * NavbarComponent - Top toolbar with app branding and menu toggle.
 * Emits menuToggle event to control sidenav in parent AppComponent.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  /** Event emitted when the menu toggle button is clicked */
  @Output() menuToggle = new EventEmitter<void>();

  /** Toggle the sidenav via parent */
  onMenuToggle(): void {
    this.menuToggle.emit();
  }
}
