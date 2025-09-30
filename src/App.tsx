import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import VirtualTours from './components/VirtualTours';
import InteractiveMap from './components/InteractiveMap';
import DigitalArchives from './components/DigitalArchives';
import AudioGuide from './components/AudioGuide';
import CulturalCalendar from './components/CulturalCalendar';
import Blog from './components/Blog';
import Community from './components/Community';
import Login from './components/Login';
import Signup from './components/Signup';
import BookingModal from './components/BookingModal';

const PrivateRoute = ({ children, redirectTo }: { children: React.ReactNode; redirectTo: string }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} replace />;
};

function AppContent() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  return (
    <Router>
      <div className="min-h-screen bg-cream-50">
        <Header language={selectedLanguage} onLanguageChange={setSelectedLanguage} />

        <main>
          <Routes>
            <Route path="/" element={
              <Homepage
                language={selectedLanguage}
                onBooking={() => setShowBookingModal(true)}
              />
            } />
            <Route path="/virtual-tours" element={<VirtualTours language={selectedLanguage} />} />
            <Route path="/map" element={<InteractiveMap language={selectedLanguage} />} />
            <Route path="/archives" element={<DigitalArchives language={selectedLanguage} />} />
            <Route path="/audio-guide" element={<AudioGuide language={selectedLanguage} />} />
            <Route path="/calendar" element={
              <CulturalCalendar
                language={selectedLanguage}
                onBookEvent={() => setShowBookingModal(true)}
              />
            } />
            <Route path="/blog" element={<PrivateRoute redirectTo="/login"><Blog /></PrivateRoute>} />
            <Route path="/community" element={<PrivateRoute redirectTo="/login"><Community /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer language={selectedLanguage} />

        {showBookingModal && (
          <BookingModal
            onClose={() => setShowBookingModal(false)}
            language={selectedLanguage}
          />
        )}
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
