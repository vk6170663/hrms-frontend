import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/auth';
import ProtectedRoute from './ui/ProtectedRoute';
import Login from './pages/login';
import Signup from './pages/signup';
import Candidates from './pages/candidates';
import Employees from './pages/employees';
import Attendance from './pages/attendance';
import Leaves from './pages/leaves';
import AppLayout from './ui/AppLayout';
import ErrorBoundary from './ui/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const { initialize, isAuthenticated } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />}
          />

          {/* Protected Routes with Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <AppLayout />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="candidates" replace />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="employees" element={<Employees />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leaves" element={<Leaves />} />
          </Route>

          {/* Fallback Route */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? '/candidates' : '/login'} replace />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;