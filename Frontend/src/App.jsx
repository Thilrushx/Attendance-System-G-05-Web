import { Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import Home from './pages/home';
import Admin from './pages/admin';
import Lecturer from './pages/lecturer';
import LecturerDashboard from './pages/lecturerDashboard';
import AdminDashboard from './pages/adminDashboard';
import LecLogin from './pages/lec_login';
import AdminLogin from './pages/admin_login';
import AdminSubject from './pages/admin_subject';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/lecturer_login' element={<LecLogin />} />
        <Route path='/admin_Login' element={<AdminLogin />} />

        {/* Admin-protected routes */}
        <Route
          path='/admin'
          element={
            <ProtectedRoute tokenKey='admintoken' redirectTo='/admin_Login'>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/admin_dashboard'
          element={
            <ProtectedRoute tokenKey='admintoken' redirectTo='/admin_Login'>
              <AdminSubject />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/attendance'
          element={
            <ProtectedRoute tokenKey='admintoken' redirectTo='/admin_Login'>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Lecturer-protected routes */}
        <Route
          path='/lecturer'
          element={
            <ProtectedRoute tokenKey='lecturertoken' redirectTo='/lecturer_login'>
              <Lecturer />
            </ProtectedRoute>
          }
        />
        <Route
          path='/lecturer/lecturer_dashboard'
          element={
            <ProtectedRoute tokenKey='lecturertoken' redirectTo='/lecturer_login'>
              <LecturerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
