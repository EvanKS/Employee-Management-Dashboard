import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

/**
 * EmployeeService - handles all CRUD operations for employees.
 * Communicates with JSON Server REST API via HttpClient.
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  /** Base URL for the JSON Server employees endpoint */
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all employees from the server.
   * @returns Observable of Employee array
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  /**
   * Fetch a single employee by ID.
   * @param id - Employee ID
   * @returns Observable of Employee
   */
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  /**
   * Add a new employee to the server.
   * @param employee - Employee data (without id, server auto-generates it)
   * @returns Observable of the created Employee
   */
  addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  /**
   * Update an existing employee on the server.
   * @param employee - Full Employee object with id
   * @returns Observable of the updated Employee
   */
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  /**
   * Delete an employee by ID.
   * @param id - Employee ID to delete
   * @returns Observable of void
   */
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
