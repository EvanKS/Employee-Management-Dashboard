# Employee Management Dashboard

A modern **Employee Management Dashboard** built using **Angular 17**, **TypeScript**, and **Angular Material**.  
This application allows users to manage employee records through a clean and responsive interface with full CRUD functionality.

---

## Features

- Create, Read, Update, and Delete employees
- Search employees by name or email
- Filter employees by department
- Responsive UI using Angular Material
- Reactive Forms with validation
- Route Guards for protected routes
- Custom Pipes for filtering
- Custom Directives for UI enhancements
- HTTP Interceptors for error handling
- Mock backend using JSON Server
- Modular Angular architecture

---

## Tech Stack

- **Angular 17**
- **TypeScript**
- **Angular Material**
- **RxJS**
- **JSON Server**
- **Node.js**

---

## Project Structure

```
src/app
│
├── components
│   ├── navbar
│   ├── employee-list
│   ├── employee-detail
│   ├── add-edit-employee
│   └── home
│
├── services
│   └── employee.service.ts
│
├── models
│   └── employee.model.ts
│
├── pipes
│   └── department-filter.pipe.ts
│
├── directives
│   └── highlight-salary.directive.ts
│
├── guards
│   └── auth.guard.ts
│
├── interceptors
│   └── error.interceptor.ts
│
├── app.component.ts
├── app.config.ts
└── app.routes.ts
```

---

## Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/EvanKS/Employee-Management-Dashboard.git
cd Employee-Management-Dashboard
```

### 2. Install dependencies

```
npm install
```

### 3. Start the Angular development server

```
ng serve
```

Open your browser and navigate to:

```
http://localhost:4200
```

---

## Running the Mock Backend

This project uses **JSON Server** to simulate a REST API.

### Install JSON Server

```
npm install -g json-server
```

### Start the mock server

```
json-server --watch db.json
```

API endpoint:

```
http://localhost:3000/employees
```

---

## Screenshots

You can add screenshots here to showcase the UI.

Example:

```
screenshots/
 ├── dashboard.png
 ├── employee-list.png
 ├── add-employee.png
```

Add images like this:

```
![Dashboard](screenshots/dashboard.png)
```

---

## Key Angular Concepts Demonstrated

- Component-based architecture
- Dependency Injection (DI)
- Angular Routing
- Reactive Forms
- Observables with RxJS
- Angular Material UI Components
- Custom Pipes and Directives
- HTTP Interceptors
- Route Guards

---

## Future Improvements

- Authentication system
- Role-based access control
- Backend integration with Node.js or Spring Boot
- Employee analytics dashboard
- Export employee data to CSV or Excel

---

## Author

**Evan KS**

GitHub:  
https://github.com/EvanKS

---

## License

This project is licensed under the MIT License.

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.


