import React, { useState, useEffect, useRef } from 'react';
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
  Avatar,
  Box,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { FiCamera, FiX } from 'react-icons/fi';
import api, { BACKEND_URL } from '../lib/api';

const UserModal = ({ isOpen, onClose, user = null, roles = [], onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role_id: '',
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role_id: user.role_id,
      });
      setPhotoPreview(user.profile_photo_path ? `${BACKEND_URL}/storage/${user.profile_photo_path}` : null);
    } else {
      setFormData({
        name: '',
        email: '',
        role_id: '',
      });
      setPhotoPreview(null);
    }
    setPhoto(null);
  }, [user, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('role_id', formData.role_id);
    if (photo) {
      data.append('profile_photo', photo);
    }

    try {
      if (user) {
        data.append('_method', 'PUT');
        await api.post(`/users/${user.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast({ status: 'success', title: 'User updated successfully' });
      } else {
        await api.post('/users', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
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
            <VStack spacing={6}>
              <Center position="relative">
                <Avatar
                  size="xl"
                  src={photoPreview}
                  name={formData.name}
                  border="2px"
                  borderColor="brand.500"
                />
                <IconButton
                  size="xs"
                  rounded="full"
                  position="absolute"
                  bottom="0"
                  right="0"
                  colorScheme="brand"
                  icon={<FiCamera />}
                  onClick={() => fileInputRef.current.click()}
                  aria-label="Upload Photo"
                />
                {photoPreview && (
                  <IconButton
                    size="xs"
                    rounded="full"
                    position="absolute"
                    top="0"
                    right="-2"
                    colorScheme="red"
                    icon={<FiX />}
                    onClick={removePhoto}
                    aria-label="Remove Photo"
                  />
                )}
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </Center>

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
