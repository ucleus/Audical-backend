import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import UsersList from './pages/UsersList';
import EquipmentList from './pages/EquipmentList';
import CreateEquipment from './pages/CreateEquipment';
import InquiriesList from './pages/InquiriesList';
import Layout from './components/Layout';
import { Spinner, Center, Heading, Text } from '@chakra-ui/react';

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

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <Layout>
      <Heading mb={4}>Dashboard</Heading>
      <Text>Welcome back, {user?.name}!</Text>
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
