import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './core/context/AuthContext';
import { Navbar } from './shared/components/Navbar';
import { Footer } from './shared/components/Footer';
import { RequireAuth } from './shared/components/RequireAuth';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { DeniedPage } from './pages/DeniedPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#0c0e12] text-neutral-100">
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
