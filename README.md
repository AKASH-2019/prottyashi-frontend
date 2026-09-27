# School Feeding Management System – Frontend

A React.js-based frontend application for managing and monitoring the School Feeding Program. The system allows administrators and field staff to manage schools, deliveries, holidays, ration settings, dashboards, and government reporting forms.

---

## Features

### Authentication & Authorization

* JWT Authentication
* Role-Based Access Control (RBAC)
* Protected Routes
* Admin and Field Staff roles

### Dashboard

* Today's total students
* Total food delivered
* Total Bun delivered
* Total Egg delivered
* Total Banana delivered
* School-wise delivery summary
* Shortfall monitoring

### School Management

* Add school
* Update school
* Delete school
* Search schools
* School profile management

### Delivery Management

* Record daily food delivery
* Bun, Egg, Banana delivery tracking
* Chalan information management
* Chalan image upload
* Search and filter deliveries

### Holiday Management

* Government holidays
* Custom holiday setup
* Demand calculation support

### Ration Settings

* Configure food schedules
* Food type assignment by day
* Dynamic demand calculation

### Reports

Government reporting formats:

* Form-04
* Form-07
* Form-10
* Form-12
* Form-13

Features:

* Monthly report generation
* Dynamic month/year selection
* Print-friendly layout
* PDF export using browser print
* Blank report handling when no data exists

---

## Technology Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Lucide React Icons

---

## Project Structure

```bash
src/
│
├── components/
│   ├── Form4SchoolPage.jsx
│   ├── Form7SchoolPage.jsx
│   ├── Form10InvoiceView.jsx
│   ├── Form12SchoolPage.jsx
│   ├── ProtectedRoute.jsx
│   └── RoleRoute.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Schools.jsx
│   ├── Deliveries.jsx
│   ├── Holidays.jsx
│   ├── Reports.jsx
│   ├── Form4Report.jsx
│   ├── Form7Report.jsx
│   ├── Form10Report.jsx
│   ├── Form12Report.jsx
│   ├── Form13Report.jsx
│   └── Login.jsx
│
├── services/
│   ├── authService.js
│   ├── schoolService.js
│   ├── deliveryService.js
│   ├── holidayService.js
│   ├── dashboardService.js
│   └── reportService.js
│
├── layouts/
│   └── MainLayout.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
└── main.jsx
```

---

## Installation

### Clone Repository

```bash
git clone <frontend-repository-url>

cd frontend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create `.env`

```env
VITE_API_URL=http://localhost:8000/api
```

Example Production:

```env
VITE_API_URL=https://your-domain.com/api
```

---

## Run Development Server

```bash
npm run dev
```

Application runs at:

```bash
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

---

## API Integration

All API requests are handled through Axios.

Example:

```javascript
const response = await axios.get(
  `${API_URL}/reports/form4/`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      month,
      year,
    },
  }
);
```

---

## Authentication

Access token stored in:

```javascript
localStorage.getItem("access_token")
```

Request Header:

```http
Authorization: Bearer <access_token>
```

---

## Routing

Example Routes:

```bash
/dashboard

/schools

/deliveries

/holidays

/ration-setting

/reports

/reports/form4/:month/:year

/reports/form07/:month/:year

/reports/form10/:month/:year

/reports/form12/:month/:year

/reports/form13/:month/:year
```

---

## Report Generation

Users can select:

* Month
* Year

Reports automatically load data for the selected period.

Example:

```bash
/reports/form4/8/2026
```

Generates:

```text
Form-04 Report
August 2026
```

---

## Deployment

### Build

```bash
npm run build
```

Generated folder:

```bash
dist/
```

Deploy to:

* Netlify
* Vercel
* Nginx
* Apache
* Railway

---

## Nginx Configuration (React SPA)

```nginx
location / {
    try_files $uri /index.html;
}
```

Required to prevent:

```text
404 Not Found
```

when refreshing or using browser back button.

---

## User Roles

### ADMIN

Access:

* Dashboard
* Schools
* Deliveries
* Holidays
* Reports
* Ration Settings

### FIELD

Access:

* Dashboard
* Deliveries
* Reports

---

## Developed For

**Government School Feeding Program Management System**

Features include:

* School Management
* Delivery Tracking
* Food Distribution Monitoring
* Government Reporting
* Chalan Management
* Dashboard Analytics
* Monthly Reporting

---

## Author

**Munazer Montasir Akash**

MSc in CSE, BUET
Adjunct Faculty, IIUC
AI Engineer | Full Stack Developer | Researcher