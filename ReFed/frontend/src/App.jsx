import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import BrowseItems from './pages/BrowseItems';
import DonateItems from './pages/DonateItems';
import DonateFood from './pages/DonateFood';
import DonateClothes from './pages/DonateClothes';
import DonateBooks from './pages/DonateBooks';
import DonateEssentials from './pages/DonateEssentials';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProfileSetup from './components/auth/ProfileSetup';
import DonorDashboard from './components/donor/DonorDashboard';
import ReceiverDashboard from './components/receiver/ReceiverDashboard';
import VolunteerDashboard from './components/volunteer/VolunteerDashboard';
import CreateListing from './components/donor/CreateListing';
import BrowseListings from './components/receiver/BrowseListings';
import MyRequests from './components/receiver/MyRequests';
import MissionBoard from './components/volunteer/MissionBoard';
import ActiveMissions from './components/volunteer/ActiveMissions';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import './App.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const authPages = ['/login', '/signup', '/profile-setup'];
  const isAuthPage = authPages.includes(location.pathname);
  
  return (
    <div className="App">
      {!isAuthPage && <Header />}
      <main style={{ 
        minHeight: isAuthPage ? '100vh' : 'calc(100vh - 140px)',
        width: '100vw'
      }}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

// Simple 404 component
const NotFound = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '60vh',
    textAlign: 'center',
    padding: '40px'
  }}>
    <h1 style={{ fontSize: '4rem', color: '#10b981', marginBottom: '20px' }}>404</h1>
    <h2 style={{ fontSize: '2rem', color: '#374151', marginBottom: '20px' }}>Page Not Found</h2>
    <p style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '30px' }}>
      The page you're looking for doesn't exist.
    </p>
    <a href="/" style={{
      padding: '12px 24px',
      backgroundColor: '#10b981',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '8px',
      fontWeight: '600'
    }}>
      Go Back Home
    </a>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/browse" element={<BrowseItems />} />
            <Route path="/donate" element={<DonateItems />} />
            <Route path="/donate/food" element={<DonateFood />} />
            <Route path="/donate/clothes" element={<DonateClothes />} />
            <Route path="/donate/books" element={<DonateBooks />} />
            <Route path="/donate/essentials" element={<DonateEssentials />} />
            
            {/* Authentication Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            
            {/* Dashboard Pages */}
            <Route path="/donor-dashboard" element={<DonorDashboard />} />
            <Route path="/receiver-dashboard" element={<ReceiverDashboard />} />
            <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            
            {/* Donor Routes */}
            <Route path="/create-listing" element={<CreateListing />} />
            
            {/* Receiver Routes */}
            <Route path="/browse-listings" element={<BrowseListings />} />
            <Route path="/my-requests" element={<MyRequests />} />
            
            {/* Volunteer Routes */}
            <Route path="/mission-board" element={<MissionBoard />} />
            <Route path="/active-missions" element={<ActiveMissions />} />
            
            {/* Admin Routes */}
            <Route path="/admin/user-management" element={<UserManagement />} />
            
            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;