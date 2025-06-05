import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { verifyUser } from "./Store/userSlice";
import { useAppDispatch } from "./Hooks/useAppRedux";
import LoginUser from "./container/LoginUser";
import Test from "./components/Ui/Test";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/Ui/toaster";
import GettingStarted from "./pages/GettingStarted";
import Dashboard from "./pages/Dashboard";
import Transformations from "./pages/Transformations";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Developer from "./pages/Developer";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { RootState } from "./store";

// Protected Route component to handle authentication
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Verify user authentication status when app loads
    dispatch(verifyUser());
  }, [dispatch]);

  return (
    <PersistGate loading={
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    } persistor={persistor}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={!isAuthenticated ? <LoginUser /> : <Navigate to="/app" replace />}
            />
            <Route path="/ui" element={<Test />} />
            
            {/* Protected dashboard routes */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Outlet />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            >
              <Route index element={<GettingStarted />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="transformations" element={<Transformations />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="developer" element={<Developer />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </PersistGate>
  );
};

export default App;
