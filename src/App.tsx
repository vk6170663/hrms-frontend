import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from './store/auth';
import ProtectedRoute from './ui/ProtectedRoute';
import Login from './pages/login';
import Signup from './pages/signup';
import Employees from './pages/employees';
import Attendance from './pages/attendance';
import Leaves from './pages/leaves';
import AppLayout from './ui/AppLayout';
import ErrorBoundary from './ui/ErrorBoundary';
import CandidatesPage from './pages/candidates';
import { Toaster } from 'react-hot-toast';
import Spinner from './ui/Spinner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const { initialize, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await initialize();
      setIsLoading(false);
    };
    initAuth();
  }, [initialize]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />}
          />

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
            <Route index element={<Navigate to="/candidates" replace />} />
            <Route path="candidates" element={<CandidatesPage />} />
            <Route path="employees" element={<Employees />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leaves" element={<Leaves />} />
          </Route>

          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? '/candidates' : '/login'} replace />}
          />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey)",
            color: "var(--color-dark-grey)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;