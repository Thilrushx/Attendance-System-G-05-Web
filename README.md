# Attendance System — Group 05

A full-stack web-based attendance management system built for the Department of ICT, Faculty of Technology, South Eastern University of Sri Lanka (SEUSL).

Admins manage lecturers, generate QR codes for lecture sessions, and view attendance records. Lecturers log in, scan the QR code, and mark students as present in real time.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT + bcryptjs |
| QR Generate | react-qr-code |
| QR Scan | html5-qrcode |
| Notifications | notistack |

---

## Project Structure

```
Attendance-System-G-05-Web/
├── Backend/
│   ├── models/
│   │   ├── admin_user.js        # Admin schema
│   │   ├── lecture_user.js      # Lecturer schema
│   │   ├── student.js           # Student schema
│   │   └── attendance.js        # Attendance session schema
│   ├── index.js                 # Express server + all API routes
│   ├── seed_data.js             # One-time DB seeder (admin + lecturers + students)
│   ├── seed_admin.js            # Reset admin account only
│   ├── reset_lecturer.js        # Reset a lecturer password
│   ├── .env                     # Environment variables (not committed)
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── home.jsx              # Landing page (admin / lecturer login entry)
    │   │   ├── admin_login.jsx       # Admin login
    │   │   ├── admin.jsx             # Admin panel — manage lecturers
    │   │   ├── admin_subject.jsx     # QR code generator
    │   │   ├── adminDashboard.jsx    # Attendance overview dashboard
    │   │   ├── lec_login.jsx         # Lecturer login
    │   │   ├── lecturer.jsx          # Lecturer profile page
    │   │   └── lecturerDashboard.jsx # QR scanner + attendance submission
    │   ├── components/
    │   │   ├── navbar.jsx            # Shared navigation bar
    │   │   ├── header.jsx            # Header wrapper
    │   │   ├── footer.jsx            # Footer
    │   │   ├── lec_card.jsx          # Lecturer card (admin panel)
    │   │   ├── ProtectedRoute.jsx    # Auth guard for routes
    │   │   ├── delete_confirm_modal.jsx
    │   │   ├── AboutUs_modal.jsx
    │   │   └── ContactUs_modal.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB Atlas account with a cluster

### 1. Clone the repository

```bash
git clone https://github.com/your-org/Attendance-System-G-05-Web.git
cd Attendance-System-G-05-Web
```

### 2. Configure environment variables

Create `Backend/.env`:

```env
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority&appName=<AppName>
JWT_SECRET=your_jwt_secret_here
PORT=1337
```

### 3. Install dependencies

```bash
# Backend
cd Backend
npm install

# Frontend
cd ../Frontend
npm install
```

### 4. Seed the database

Populate the database with a default admin, 8 lecturers, and 40 students:

```bash
cd Backend
node seed_data.js
```

This will print all generated credentials to the console.

**Default credentials after seeding:**

| Role | Email | Password |
|---|---|---|
| Admin | admin@seusl.ac.lk | Admin@1234 |
| Lecturer (all) | e.g. amara.perera@seusl.ac.lk | Lec@1234 |

### 5. Run the application

```bash
# Terminal 1 — Backend (http://localhost:1337)
cd Backend
npm run dev

# Terminal 2 — Frontend (http://localhost:5173)
cd Frontend
npm run dev
```

---

## API Endpoints

All protected routes require the header `x-access-token: <JWT>`.

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/adminlogin` | — | Admin login |
| POST | `/lecturelogin` | — | Lecturer login |

### Lecturers

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/lectureadd` | — | Add a new lecturer |
| GET | `/api/lectures` | ✅ | List all lecturers |
| PUT | `/updateLecturer` | ✅ | Update lecturer details |
| DELETE | `/deleteLecturer` | ✅ | Delete a lecturer |

### Students

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/addStudent` | ✅ | Add a student |
| GET | `/api/students` | ✅ | List students (filter by dept/year/semester) |

### Attendance

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/attendance` | ✅ | Submit an attendance session |
| GET | `/api/attendance` | ✅ | List sessions (filter by lecturer/dept/year) |
| GET | `/api/attendance/:id` | ✅ | Get a single session |

---

## Features

### Admin
- Login with JWT-secured session
- Add, view, and delete lecturers
- Generate QR codes for any lecture session (department / year / semester / subject / duration)
- QR code includes a countdown timer — expires after the set duration
- View all attendance records with filters (department, year, semester)
- Expandable rows to see which students attended each session

### Lecturer
- Login with JWT-secured session
- Profile page showing personal details
- Dashboard with two tabs:
  - **Scan QR** — camera scanner reads the admin-generated QR, shows session details, then lets the lecturer add students present and submit
  - **Attendance History** — all previously submitted sessions with expandable student lists

---

## QR Code Format

The QR code encodes session data as a single underscore-delimited string:

```
DEPARTMENT_ACADEMICYEAR_YEAR_SEMESTER_SUBJECTCODE
```

Example:
```
ICT_2022/2023_1stYear_1stSemester_CIS11011
```

---

## Utility Scripts

| Script | Purpose |
|---|---|
| `node seed_data.js` | Seed admin + 8 lecturers + 40 students |
| `node seed_admin.js` | Create or reset the admin account |
| `node reset_lecturer.js` | Reset a specific lecturer's password |

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m "Add your feature"`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a Pull Request

---

## License

This project is developed for academic purposes at SEUSL. All rights reserved by Group 05, Faculty of Technology.
