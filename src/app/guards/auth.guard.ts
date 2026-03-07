import { CanActivateFn } from '@angular/router';

/**
 * AuthGuard - simulates authentication check.
 * In a real application, this would verify user login status
 * via an AuthService and redirect to a login page if unauthenticated.
 * Currently returns true to allow all navigation (simulated auth).
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Simulated authentication - always returns true
  // Replace with real auth logic (e.g., check token in AuthService)
  const isAuthenticated = true;

  if (!isAuthenticated) {
    // In a real app: inject Router and navigate to /login
    console.warn('Access denied - user is not authenticated');
    return false;
  }

  return true;
};
