import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { errorInterceptor } from './interceptors/error.interceptor';

/**
 * Application configuration - provides Router, HttpClient with error interceptor,
 * and async animations for Angular Material.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAnimationsAsync()
  ]
};
