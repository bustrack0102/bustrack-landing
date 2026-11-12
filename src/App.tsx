import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './core/context/AuthContext';
import { trackPageView } from './core/analytics/gtag';
import { Navbar } from './shared/components/Navbar';
import { Footer } from './shared/components/Footer';
import { RequireAuth } from './shared/components/RequireAuth';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { DataHandlingPage } from './pages/DataHandlingPage';
import { DeniedPage } from './pages/DeniedPage';
import { NotFoundPage } from './pages/NotFoundPage';

const RouteAnalyticsTracker: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
};

export const AppRoutes: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#0c0e12] text-neutral-100">
      <RouteAnalyticsTracker />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/panel"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route path="/privacidad" element={<PrivacyPage />} />
          <Route path="/manejo-datos" element={<DataHandlingPage />} />
          <Route path="/denegado" element={<DeniedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
