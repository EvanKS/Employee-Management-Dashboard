export interface IEmployee {
  employeeId: number;
  name: string;
  role: string;
  department: string;
  salary: number;
  imageUrl?: string;
}

export class Employee implements IEmployee {
  constructor(
    public employeeId: number,
    public name: string,
    public role: string,
    public department: string,
    public salary: number,
    public imageUrl: string = 'assets/employees/default-avatar.png'
  ) { }
}
