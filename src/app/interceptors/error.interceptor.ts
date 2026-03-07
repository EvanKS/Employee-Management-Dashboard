import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

/**
 * Error Interceptor - intercepts all HTTP responses and handles errors.
 * Displays user-friendly error messages via MatSnackBar.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Network Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 0:
            errorMessage = 'Unable to connect to server. Please ensure JSON Server is running.';
            break;
          case 404:
            errorMessage = 'Resource not found (404)';
            break;
          case 500:
            errorMessage = 'Internal server error (500)';
            break;
          default:
            errorMessage = `Server Error: ${error.status} - ${error.message}`;
        }
      }

      // Display error to user via SnackBar
      snackBar.open(errorMessage, 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });

      console.error('HTTP Error:', error);
      return throwError(() => error);
    })
  );
};
