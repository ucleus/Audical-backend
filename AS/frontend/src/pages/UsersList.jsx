import React, { useEffect, useState, useCallback } from 'react';
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
  Text,
  useDisclosure,
  IconButton,
  Avatar,
  HStack,
} from '@chakra-ui/react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import api, { BACKEND_URL } from '../lib/api';
import Layout from '../components/Layout';
import UserModal from '../components/UserModal';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, rolesRes] = await Promise.all([
        api.get('/users'),
        api.get('/roles')
      ]);
      setUsers(usersRes.data.data || usersRes.data);
      setRoles(rolesRes.data);
    } catch (error) {
      toast({
        title: 'Error fetching data',
        description: error.response?.data?.message || 'Unauthorized or Server Error',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAdd = () => {
    setSelectedUser(null);
    onOpen();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/users/${userId}`);
      toast({ status: 'success', title: 'User deleted' });
      fetchData();
    } catch (error) {
      toast({ status: 'error', title: 'Failed to delete user' });
    }
  };

  const getRoleColor = (slug) => {
    switch (slug) {
      case 'super-admin': return 'red';
      case 'editor': return 'blue';
      case 'lead-manager': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <Layout>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg" color="white">User Management</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="teal" variant="solid" onClick={handleAdd}>
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
                <Th color="gray.400">User</Th>
                <Th color="gray.400">Email</Th>
                <Th color="gray.400">Role</Th>
                <Th color="gray.400">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id} _hover={{ bg: 'gray.700' }}>
                  <Td>
                    <HStack>
                      <Avatar 
                        size="sm" 
                        name={user.name} 
                        src={user.profile_photo_path ? `${BACKEND_URL}/storage/${user.profile_photo_path}` : null} 
                      />
                      <Text color="white" fontWeight="medium">{user.name}</Text>
                    </HStack>
                  </Td>
                  <Td color="gray.300">{user.email}</Td>
                  <Td>
                    <Badge 
                      colorScheme={getRoleColor(user.role?.slug)}
                      borderRadius="full"
                      px={2}
                    >
                      {user.role?.name || 'N/A'}
                    </Badge>
                  </Td>
                  <Td>
                    <Flex gap={2}>
                      <IconButton 
                        size="sm" 
                        variant="ghost" 
                        colorScheme="blue" 
                        icon={<FiEdit2 />} 
                        onClick={() => handleEdit(user)}
                        aria-label="Edit User"
                      />
                       <IconButton 
                        size="sm" 
                        variant="ghost" 
                        colorScheme="red" 
                        icon={<FiTrash2 />} 
                        onClick={() => handleDelete(user.id)}
                        aria-label="Delete User"
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
              {users.length === 0 && (
                <Tr>
                  <Td colSpan={4} textAlign="center" py={8} color="gray.400">
                    No users found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      )}

      <UserModal 
        isOpen={isOpen} 
        onClose={onClose} 
        user={selectedUser} 
        roles={roles}
        onSuccess={fetchData}
      />
    </Layout>
  );
};

export default UsersList;