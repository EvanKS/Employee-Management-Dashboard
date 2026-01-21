import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important for *ngFor
import { Employee } from '../../models/employee.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
  @Output() employeeSelected = new EventEmitter<Employee>();

  employees: Employee[] = [
    new Employee(1, 'Alice Johnson', 'Frontend Dev', 'Engineering', 75000, 'assets/employees/alice.png'),
    new Employee(2, 'Bob Check', 'Backend Lead', 'Engineering', 95000, 'assets/employees/bob.png'),
    new Employee(3, 'Charlie Davis', 'Designer', 'Design', 68000, 'assets/employees/charlie.png'),
    new Employee(4, 'Diana Prince', 'Product Manager', 'Product', 105000, 'assets/employees/diana.png'),
    new Employee(5, 'Evan Smith', 'Intern', 'Engineering', 40000, 'assets/employees/evan.png')
  ];

  selectEmployee(employee: Employee) {
    this.employeeSelected.emit(employee);
  }
}
