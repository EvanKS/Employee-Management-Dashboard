import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// App imports
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

/**
 * AddEditEmployeeComponent - Reactive Form for creating or editing employees.
 * Detects the route to determine if it's Add or Edit mode.
 * In Edit mode, pre-fills the form with existing employee data.
 */
@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.scss'
})
export class AddEditEmployeeComponent implements OnInit, OnDestroy {
  /** Whether the form is in edit mode or add mode */
  isEditMode = false;

  /** Employee ID for edit mode */
  employeeId: number | null = null;

  /** The reactive form group */
  employeeForm!: FormGroup;

  /** Available departments for the dropdown */
  departments: string[] = ['IT', 'HR', 'Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'Finance'];

  /** Subscription for cleanup */
  private subscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * ngOnInit - Initialize form and detect add/edit mode from route.
   * In edit mode, fetch existing employee data and populate the form.
   */
  ngOnInit(): void {
    this.initForm();

    // Check if we are in edit mode by looking for an :id route param
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.employeeId = Number(idParam);
      this.loadEmployee(this.employeeId);
    }
  }

  /**
   * ngOnDestroy - Clean up subscription.
   */
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Initialize the reactive form with validators.
   */
  private initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]],
      role: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]+$')]],
      salary: [null, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      joiningDate: ['', [Validators.required]]
    });
  }

  /**
   * Load employee data for edit mode and populate the form.
   */
  private loadEmployee(id: number): void {
    this.subscription = this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue({
          name: employee.name,
          email: employee.email,
          department: employee.department,
          role: employee.role,
          salary: employee.salary,
          joiningDate: new Date(employee.joiningDate)
        });
      },
      error: (err) => {
        console.error('Error loading employee for edit:', err);
        this.snackBar.open('Failed to load employee data', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  /**
   * Submit the form - creates or updates an employee based on mode.
   */
  onSubmit(): void {
    if (this.employeeForm.invalid) {
      // Mark all fields as touched to show validation errors
      this.employeeForm.markAllAsTouched();
      return;
    }

    const formValue = this.employeeForm.value;

    // Format the joining date to ISO string (YYYY-MM-DD)
    const joiningDate = formValue.joiningDate instanceof Date
      ? formValue.joiningDate.toISOString().split('T')[0]
      : formValue.joiningDate;

    if (this.isEditMode && this.employeeId) {
      // Update existing employee
      const updatedEmployee: Employee = {
        id: this.employeeId,
        ...formValue,
        joiningDate
      };

      this.employeeService.updateEmployee(updatedEmployee).subscribe({
        next: () => {
          this.snackBar.open('Employee updated successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Error updating employee:', err);
        }
      });
    } else {
      // Add new employee
      const newEmployee = {
        ...formValue,
        joiningDate
      };

      this.employeeService.addEmployee(newEmployee).subscribe({
        next: () => {
          this.snackBar.open('Employee added successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Error adding employee:', err);
        }
      });
    }
  }

  /**
   * Cancel and navigate back to employee list.
   */
  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}
