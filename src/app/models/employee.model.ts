/**
 * Employee interface - defines the shape of an Employee object.
 * Used throughout the application for type safety.
 */
export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  salary: number;
  joiningDate: string; // ISO date string format: 'YYYY-MM-DD'
}
