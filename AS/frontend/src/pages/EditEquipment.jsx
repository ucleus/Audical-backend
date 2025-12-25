import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Heading,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
  Center,
} from '@chakra-ui/react';
import Layout from '../components/Layout';
import EquipmentForm from '../components/Equipment/EquipmentForm';
import api from '../lib/api';

const EditEquipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await api.get(`/equipment/${id}`);
        const data = response.data;
        // Transform data if needed to match form structure
        // e.g. handle images if necessary, or let the form handle it
        setInitialData(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load equipment data.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        navigate('/equipment');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEquipment();
  }, [id, navigate, toast]);

  const handleSubmit = async (formData) => {
    setIsSaving(true);
    // Determine method: PUT usually, but Laravel FormData often needs POST + _method='PUT'
    formData.append('_method', 'PUT');

    try {
      await api.post(`/equipment/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: 'Success',
        description: 'Equipment updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate('/equipment');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update equipment.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Center h="50vh">
          <Spinner size="xl" color="brand.500" />
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box mb={6}>
        <Breadcrumb fontSize="sm" color="gray.500" mb={2}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/equipment">Equipment</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Edit {initialData?.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading size="lg" color="white">Edit Equipment</Heading>
      </Box>

      <Box bg="bg.800" p={8} borderRadius="xl" borderWidth="1px" borderColor="gray.700">
        <EquipmentForm 
            initialData={initialData} 
            onSubmit={handleSubmit} 
            isLoading={isSaving} 
        />
      </Box>
    </Layout>
  );
};

export default EditEquipment;
