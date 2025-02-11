import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import GettingStarted from "@/pages/GettingStarted";
import Dashboard from "@/pages/Dashboard";
import Transformations from "@/pages/Transformations";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import Developer from "@/pages/Developer";
import NotFound from "@/pages/NotFound";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<DashboardLayout><Outlet /></DashboardLayout>}>
              <Route index element={<GettingStarted />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="transformations" element={<Transformations />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="developer" element={<Developer />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
}

export default App;