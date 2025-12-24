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
  VStack,
  useToast,
  Text,
} from '@chakra-ui/react';
import api from '../lib/api';

const CreateOrderModal = ({ isOpen, onClose, equipment, inquiry, onSuccess }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    amount: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (inquiry) {
      setFormData(prev => ({
        ...prev,
        customer_name: inquiry.name,
        customer_email: inquiry.email,
        customer_phone: inquiry.phone || '',
      }));
    }
    if (equipment) {
        setFormData(prev => ({
            ...prev,
            amount: equipment.price || '',
        }));
    }
  }, [inquiry, equipment, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!equipment) return;

    setIsLoading(true);
    try {
      await api.post('/orders', {
        ...formData,
        equipment_id: equipment.id,
      });

      toast({ status: 'success', title: 'Order Created', description: 'Item marked as sold.' });
      onSuccess?.();
      onClose();
    } catch (error) {
      toast({
        status: 'error',
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create order.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="bg.800" color="white" border="1px" borderColor="gray.700">
        <ModalHeader>Create Order / Mark as Sold</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Box w="full" p={3} bg="gray.900" borderRadius="md">
                  <Text fontSize="xs" color="gray.500">ITEM</Text>
                  <Text fontWeight="bold">{equipment?.title}</Text>
              </Box>

              <FormControl isRequired>
                <FormLabel>Sale Amount ($)</FormLabel>
                <Input name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Customer Name</FormLabel>
                <Input name="customer_name" value={formData.customer_name} onChange={handleChange} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Customer Email</FormLabel>
                <Input name="customer_email" type="email" value={formData.customer_email} onChange={handleChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Shipping Address</FormLabel>
                <Input name="shipping_address" value={formData.shipping_address} onChange={handleChange} />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter borderTopWidth="1px" borderColor="gray.700">
            <Button onClick={onClose} variant="ghost" mr={3}>Cancel</Button>
            <Button type="submit" colorScheme="green" isLoading={isLoading}>
              Confirm Sale
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateOrderModal;
