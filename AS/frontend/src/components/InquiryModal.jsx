import React, { useState } from 'react';
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
  Textarea,
  VStack,
  useToast,
  Text,
} from '@chakra-ui/react';
import api from '../lib/api';

const InquiryModal = ({ isOpen, onClose, equipment }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

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
      await api.post('/inquiries', {
        ...formData,
        equipment_id: equipment.id,
      });

      toast({
        title: 'Inquiry Sent',
        description: 'We have received your inquiry.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to send inquiry.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="bg.800" color="white" border="1px" borderColor="gray.700">
        <ModalHeader>Inquire about {equipment?.title}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Text fontSize="sm" color="gray.400">
                Interested in this item? Send us a message and we'll get back to you with a quote or more details.
              </Text>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
              </FormControl>

              <FormControl>
                <FormLabel>Phone (Optional)</FormLabel>
                <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="I'm interested in this unit..." 
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter borderTopWidth="1px" borderColor="gray.700">
            <Button onClick={onClose} variant="ghost" mr={3}>Cancel</Button>
            <Button type="submit" colorScheme="teal" isLoading={isLoading}>
              Send Inquiry
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default InquiryModal;
