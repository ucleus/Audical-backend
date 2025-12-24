import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import api from '../lib/api';

const UserModal = ({ isOpen, onClose, user = null, roles = [], onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role_id: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role_id: user.role_id,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role_id: '',
      });
    }
  }, [user, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (user) {
        await api.put(`/users/${user.id}`, formData);
        toast({ status: 'success', title: 'User updated successfully' });
      } else {
        await api.post('/users', formData);
        toast({ status: 'success', title: 'User created successfully' });
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        status: 'error',
        title: 'Error',
        description: error.response?.data?.message || 'Operation failed',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="bg.800" color="white" border="1px" borderColor="gray.700">
        <ModalHeader>{user ? 'Edit User' : 'Add New User'}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Select name="role_id" value={formData.role_id} onChange={handleChange} placeholder="Select Role" bg="bg.900">
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter borderTopWidth="1px" borderColor="gray.700">
            <Button onClick={onClose} variant="ghost" mr={3}>Cancel</Button>
            <Button type="submit" colorScheme="teal" isLoading={isLoading}>
              {user ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
