import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';

/**
 * DepartmentFilterPipe - filters an array of employees by department name.
 * Usage: employees | departmentFilter:'IT'
 * Returns all employees if no department is specified.
 */
@Pipe({
  name: 'departmentFilter',
  standalone: true
})
export class DepartmentFilterPipe implements PipeTransform {

  /**
   * Filters the employee array by department.
   * @param employees - Array of employees to filter
   * @param department - Department name to filter by (case-insensitive)
   * @returns Filtered array of employees
   */
  transform(employees: Employee[], department: string): Employee[] {
    if (!employees || !department || department === 'All') {
      return employees;
    }
    return employees.filter(
      emp => emp.department.toLowerCase() === department.toLowerCase()
    );
  }
}
