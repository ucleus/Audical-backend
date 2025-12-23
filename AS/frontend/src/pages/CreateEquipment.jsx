import React, { useState } from 'react';
import {
  Box,
  Heading,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import EquipmentForm from '../components/Equipment/EquipmentForm';
import api from '../lib/api';

const CreateEquipment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await api.post('/equipment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: 'Success',
        description: 'Equipment listed successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate('/equipment');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create equipment.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Box mb={6}>
        <Breadcrumb fontSize="sm" color="gray.500" mb={2}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/equipment">Equipment</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Add New</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading size="lg" color="white">List New Equipment</Heading>
      </Box>

      <Box bg="bg.800" p={8} borderRadius="xl" borderWidth="1px" borderColor="gray.700">
        <EquipmentForm onSubmit={handleSubmit} isLoading={isLoading} />
      </Box>
    </Layout>
  );
};

export default CreateEquipment;
