import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Button,
  VStack,
  HStack,
  Spinner
} from '@chakra-ui/react';
import { FiBox, FiMessageSquare, FiUsers, FiDollarSign, FiPlus, FiActivity } from 'react-icons/fi';
import Layout from '../components/Layout';
import api from '../lib/api';
import { Link } from 'react-router-dom';

const StatCard = ({ title, stat, icon, helpText, to }) => {
  return (
    <Box
      as={to ? Link : 'div'}
      to={to}
      bg="bg.800"
      p={6}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.700"
      position="relative"
      overflow="hidden"
      _hover={to ? { transform: 'translateY(-2px)', borderColor: 'brand.500', shadow: 'lg' } : {}}
      transition="all 0.2s"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box zIndex={1}>
          <Stat>
            <StatLabel color="gray.400" fontWeight="medium">{title}</StatLabel>
            <StatNumber fontSize="3xl" fontWeight="bold" color="white">{stat}</StatNumber>
            {helpText && <StatHelpText color="gray.500" mb={0}>{helpText}</StatHelpText>}
          </Stat>
        </Box>
        <Box
          p={3}
          bg="brand.500"
          borderRadius="full"
          color="white"
          opacity={0.8}
        >
          <Icon as={icon} w={6} h={6} />
        </Box>
      </Flex>
    </Box>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Layout>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Heading size="lg" color="white">Dashboard</Heading>
        <Text color="gray.400" fontSize="sm">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" h="200px">
          <Spinner size="xl" color="brand.500" />
        </Flex>
      ) : (
        <VStack spacing={8} align="stretch">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <StatCard 
              title="Active Inventory" 
              stat={stats?.equipment?.active || 0} 
              helpText={`${stats?.equipment?.draft || 0} Drafts`}
              icon={FiBox} 
              to="/equipment"
            />
             <StatCard 
              title="Inventory Value" 
              stat={`$${parseFloat(stats?.equipment?.value || 0).toLocaleString()}`} 
              icon={FiDollarSign} 
            />
            <StatCard 
              title="New Inquiries" 
              stat={stats?.inquiries?.new || 0} 
              helpText={`Total: ${stats?.inquiries?.total || 0}`}
              icon={FiMessageSquare}
              to="/inquiries"
            />
            <StatCard 
              title="Total Users" 
              stat={stats?.users?.total || 0} 
              icon={FiUsers}
              to="/users"
            />
          </SimpleGrid>

          {/* Quick Actions / Getting Started */}
          <Box bg="bg.800" p={8} borderRadius="xl" borderWidth="1px" borderColor="gray.700">
             <Heading size="md" mb={6} color="white">Quick Actions</Heading>
             <HStack spacing={4}>
                <Button as={Link} to="/equipment/create" leftIcon={<FiPlus />} colorScheme="teal" size="lg">
                  List New Item
                </Button>
                <Button as={Link} to="/inquiries" leftIcon={<FiActivity />} variant="outline" colorScheme="blue" size="lg">
                  View Leads
                </Button>
             </HStack>
          </Box>
        </VStack>
      )}
    </Layout>
  );
};

export default Dashboard;
