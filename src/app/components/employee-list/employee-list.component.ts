import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

// Angular Material imports
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

// App imports
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { HighlightSalaryDirective } from '../../directives/highlight-salary.directive';

/**
 * EmployeeListComponent - Displays employees in a Material Data Table.
 * Features: Search, Department Filter, Column Sorting, Pagination,
 * and CRUD action buttons (View, Edit, Delete).
 */
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
    HighlightSalaryDirective
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit, OnDestroy, AfterViewInit {

  /** Columns to display in the table */
  displayedColumns: string[] = ['id', 'name', 'email', 'department', 'role', 'salary', 'actions'];

  /** MatTable data source for sorting, filtering, and pagination */
  dataSource = new MatTableDataSource<Employee>();

  /** Search text for global filter */
  searchText = '';

  /** Selected department for filtering */
  selectedDepartment = 'All';

  /** Available departments extracted from data */
  departments: string[] = ['All'];

  /** Paginator reference for table pagination */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /** Sort reference for column sorting */
  @ViewChild(MatSort) sort!: MatSort;

  /** Subscription for cleanup */
  private subscription: Subscription | null = null;

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * ngOnInit - Load employee data and set up the custom filterPredicate.
   * The filterPredicate is set ONCE here so it consistently handles
   * both search text and department filtering together.
   */
  ngOnInit(): void {
    this.setupFilterPredicate();
    this.loadEmployees();
  }

  /**
   * ngAfterViewInit - Attach paginator and sort to data source
   * after the view has been initialized.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * ngOnDestroy - Unsubscribe to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Set up a single, stable filterPredicate that handles BOTH
   * search text and department filtering via a JSON-encoded filter string.
   *
   * WHY THIS FIXES THE BUG:
   * - MatTableDataSource treats filter = '' as "no filter" (shows all rows).
   * - The old code set dataSource.filter = searchText, so when search was
   *   empty but a department was selected, the filter was '' and ALL rows
   *   were shown, ignoring the department entirely.
   * - By encoding BOTH values into a JSON string, the filter is never ''
   *   when a department is selected, so the predicate always runs.
   * - Setting filterPredicate once (not on every keystroke) avoids race
   *   conditions and ensures newly added employees are immediately searchable.
   */
  private setupFilterPredicate(): void {
    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
      // Parse the combined filter object
      const filterObj = JSON.parse(filter) as { search: string; department: string };

      // Department check: if 'All' is selected, every row matches
      const matchesDepartment =
        filterObj.department === 'All' || data.department === filterObj.department;

      // Search check: case-insensitive match across name, email, role, department
      const search = filterObj.search;
      const matchesSearch =
        !search ||
        data.name.toLowerCase().includes(search) ||
        data.email.toLowerCase().includes(search) ||
        data.role.toLowerCase().includes(search) ||
        data.department.toLowerCase().includes(search);

      // Row is visible only if BOTH conditions are satisfied
      return matchesDepartment && matchesSearch;
    };
  }

  /**
   * Fetch employees from the service and populate data source.
   */
  loadEmployees(): void {
    this.subscription = this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.dataSource.data = employees;

        // Extract unique departments for the filter dropdown
        const depts = [...new Set(employees.map(e => e.department))];
        this.departments = ['All', ...depts.sort()];
      },
      error: (err) => {
        console.error('Error loading employees:', err);
      }
    });
  }

  /**
   * Apply the combined filter (search + department) to the data source.
   * Encodes both values as a JSON string so the filterPredicate can parse them.
   */
  applyFilter(): void {
    const filterObject = {
      search: this.searchText.trim().toLowerCase(),
      department: this.selectedDepartment
    };

    // Setting this triggers the filterPredicate for every row
    this.dataSource.filter = JSON.stringify(filterObject);

    // Reset to first page after filtering
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Called when search text changes.
   */
  applySearch(): void {
    this.applyFilter();
  }

  /**
   * Called when department dropdown selection changes.
   */
  filterByDepartment(): void {
    this.applyFilter();
  }

  /**
   * Navigate to employee detail view.
   */
  viewEmployee(id: number): void {
    this.router.navigate(['/employees', id]);
  }

  /**
   * Navigate to edit employee form.
   */
  editEmployee(id: number): void {
    this.router.navigate(['/edit-employee', id]);
  }

  /**
   * Delete an employee after confirmation.
   */
  deleteEmployee(id: number, name: string): void {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.snackBar.open(`${name} has been deleted successfully`, 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.loadEmployees(); // Refresh the list
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
        }
      });
    }
  }
}
