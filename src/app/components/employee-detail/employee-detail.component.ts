import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

// App imports
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

/**
 * EmployeeDetailComponent - Displays full details of a single employee.
 * Loads employee data from the route parameter :id using EmployeeService.
 * Provides Edit and Delete action buttons.
 */
@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
  /** The employee being viewed */
  employee: Employee | null = null;

  /** Loading state for spinner/skeleton */
  isLoading = true;

  /** Subscription for cleanup */
  private subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * ngOnInit - Extract employee ID from route and fetch data.
   */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.subscription = this.employeeService.getEmployeeById(id).subscribe({
        next: (employee) => {
          this.employee = employee;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading employee:', err);
          this.isLoading = false;
        }
      });
    }
  }

  /**
   * ngOnDestroy - Clean up subscription.
   */
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Navigate to the edit form for this employee.
   */
  editEmployee(): void {
    if (this.employee) {
      this.router.navigate(['/edit-employee', this.employee.id]);
    }
  }

  /**
   * Delete the employee and navigate back to the list.
   */
  deleteEmployee(): void {
    if (this.employee && confirm(`Are you sure you want to delete "${this.employee.name}"?`)) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe({
        next: () => {
          this.snackBar.open(`${this.employee!.name} has been deleted`, 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
        }
      });
    }
  }

  /**
   * Navigate back to the employee list.
   */
  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
