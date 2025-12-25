import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import UsersList from './pages/UsersList';
import EquipmentList from './pages/EquipmentList';
import CreateEquipment from './pages/CreateEquipment';
import InquiriesList from './pages/InquiriesList';
import OrdersList from './pages/OrdersList';
import Dashboard from './pages/Dashboard';
import PublicHome from './pages/PublicHome';
import PublicProductDetail from './pages/PublicProductDetail';
import { Spinner, Center } from '@chakra-ui/react';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicHome />} />
          <Route path="/product/:id" element={<PublicProductDetail />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Admin Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          } />
          <Route path="/equipment" element={
            <ProtectedRoute>
              <EquipmentList />
            </ProtectedRoute>
          } />
          <Route path="/equipment/create" element={
            <ProtectedRoute>
              <CreateEquipment />
            </ProtectedRoute>
          } />
          <Route path="/inquiries" element={
            <ProtectedRoute>
              <InquiriesList />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <OrdersList />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;