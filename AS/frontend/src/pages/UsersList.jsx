import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  Flex,
  useToast,
  Spinner,
  Text
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import api from '../lib/api';
import Layout from '../components/Layout';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data.data);
    } catch (error) {
      toast({
        title: 'Error fetching users',
        description: error.response?.data?.message || 'Unauthorized or Server Error',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg" color="white">User Management</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="teal" variant="solid">
          Add User
        </Button>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" h="200px">
          <Spinner size="xl" color="brand.500" />
        </Flex>
      ) : (
        <Box bg="bg.800" borderRadius="lg" overflow="hidden" boxShadow="sm" borderWidth="1px" borderColor="gray.700">
          <Table variant="simple">
            <Thead bg="gray.800">
              <Tr>
                <Th color="gray.400">Name</Th>
                <Th color="gray.400">Email</Th>
                <Th color="gray.400">Role</Th>
                <Th color="gray.400">Status</Th>
                <Th color="gray.400">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id} _hover={{ bg: 'gray.700' }}>
                  <Td color="white" fontWeight="medium">{user.name}</Td>
                  <Td color="gray.300">{user.email}</Td>
                  <Td>
                    <Badge 
                      colorScheme={user.role.slug === 'super-admin' ? 'red' : 'green'}
                      borderRadius="full"
                      px={2}
                    >
                      {user.role.name}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme="blue" variant="subtle">Active</Badge>
                  </Td>
                  <Td>
                    <Button size="sm" variant="ghost" colorScheme="blue">Edit</Button>
                  </Td>
                </Tr>
              ))}
              {users.length === 0 && (
                <Tr>
                  <Td colSpan={5} textAlign="center" py={8} color="gray.400">
                    No users found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      )}
    </Layout>
  );
};

export default UsersList;
