import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Subscription } from 'rxjs';

/**
 * HomeComponent - Dashboard landing page.
 * Displays summary cards with key metrics:
 * Total Employees, Departments, Average Salary, and New Hires.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  totalEmployees = 0;
  departments: string[] = [];
  averageSalary = 0;
  recentHires = 0;
  employees: Employee[] = [];

  private subscription: Subscription | null = null;

  constructor(private employeeService: EmployeeService) {}

  /**
   * ngOnInit - Fetch employees and calculate dashboard metrics.
   */
  ngOnInit(): void {
    this.subscription = this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.totalEmployees = employees.length;

        // Get unique departments
        this.departments = [...new Set(employees.map(e => e.department))];

        // Calculate average salary
        if (employees.length > 0) {
          const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
          this.averageSalary = Math.round(totalSalary / employees.length);
        }

        // Count employees who joined in the last 12 months
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        this.recentHires = employees.filter(
          e => new Date(e.joiningDate) >= oneYearAgo
        ).length;
      },
      error: (err) => {
        console.error('Failed to load employees for dashboard', err);
      }
    });
  }

  /**
   * ngOnDestroy - Clean up subscription to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
