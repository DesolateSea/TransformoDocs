import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch, isAuthenticated]);

  return (
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route
              path="/login"
              element={!isAuthenticated ? <LoginUser /> : <div>HELLO</div>}
            />
            <Route path="/ui" element={<Test />} />
            <Route
              path="/"
              element={
                <DashboardLayout>
                  <Outlet />
                </DashboardLayout>
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
          </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </PersistGate>
  );
};

export default App;
