import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import PostJob from './pages/PostJob';
import MyApplications from './pages/MyApplications';
import ApplicantsList from './pages/ApplicantsList';
import SeekerDashboard from './pages/SeekerDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import ForgotPassword from './pages/ForgotPassword';
import EditJob from './pages/EditJob';

function Dashboard() {
  const { user } = useAuth();
  if (user?.role === 'recruiter') return <RecruiterDashboard />;
  return <SeekerDashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/jobs/:id/edit" element={
            <ProtectedRoute>
              <EditJob />
            </ProtectedRoute>
          } />

          <Route path="/post-job" element={
            <ProtectedRoute>
              <>
                <Navbar />
                <PostJob />
              </>
            </ProtectedRoute>
          } />
          <Route path="/my-applications" element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          } />
          <Route path="/recruiter/jobs/:jobId/applicants" element={
            <ProtectedRoute>
              <ApplicantsList />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}