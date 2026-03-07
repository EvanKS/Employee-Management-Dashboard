import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { AddEditEmployeeComponent } from './components/add-edit-employee/add-edit-employee.component';

/**
 * Application route definitions.
 * All routes are protected by the AuthGuard (simulated authentication).
 */
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'employees/:id', component: EmployeeDetailComponent, canActivate: [authGuard] },
  { path: 'add-employee', component: AddEditEmployeeComponent, canActivate: [authGuard] },
  { path: 'edit-employee/:id', component: AddEditEmployeeComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/home' } // Wildcard route for unknown URLs
];
