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
  Flex,
  useToast,
  Spinner,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  VStack,
  HStack,
  Select,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FiMessageSquare, FiClock } from 'react-icons/fi';
import api from '../lib/api';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const InquiriesList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await api.get('/inquiries');
      // Pagination handling could be added here (response.data.data)
      setInquiries(response.data.data || response.data); 
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load inquiries.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleView = async (inquiry) => {
    setSelectedInquiry(inquiry);
    onOpen();
    
    // Auto-mark as read if new
    if (inquiry.status === 'new') {
      try {
        await api.put(`/inquiries/${inquiry.id}`, { status: 'read' });
        // Update local state to reflect change
        setInquiries(prev => prev.map(i => i.id === inquiry.id ? { ...i, status: 'read' } : i));
        setSelectedInquiry(prev => ({ ...prev, status: 'read' }));
      } catch (error) {
        console.error("Failed to mark as read");
      }
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedInquiry) return;
    try {
      await api.put(`/inquiries/${selectedInquiry.id}`, { status: newStatus });
      setInquiries(prev => prev.map(i => i.id === selectedInquiry.id ? { ...i, status: newStatus } : i));
      setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
      toast({ status: 'success', title: 'Status updated' });
    } catch (error) {
      toast({ status: 'error', title: 'Failed to update status' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'green';
      case 'read': return 'blue';
      case 'responded': return 'purple';
      case 'closed': return 'gray';
      default: return 'gray';
    }
  };

  return (
    <Layout>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg" color="white">Inquiries</Heading>
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
                <Th color="gray.400">Status</Th>
                <Th color="gray.400">Customer</Th>
                <Th color="gray.400">Equipment</Th>
                <Th color="gray.400">Date</Th>
                <Th color="gray.400">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {inquiries.map((inquiry) => (
                <Tr key={inquiry.id} _hover={{ bg: 'gray.700' }}>
                  <Td>
                    <Badge colorScheme={getStatusColor(inquiry.status)} variant={inquiry.status === 'new' ? 'solid' : 'subtle'}>
                      {inquiry.status}
                    </Badge>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" color="white">{inquiry.name}</Text>
                      <Text fontSize="xs" color="gray.400">{inquiry.email}</Text>
                    </VStack>
                  </Td>
                  <Td>
                     {inquiry.equipment ? (
                        <Text color="brand.300" fontSize="sm">{inquiry.equipment.title}</Text>
                     ) : (
                        <Text color="gray.500" fontSize="sm">Deleted Item</Text>
                     )}
                  </Td>
                  <Td color="gray.300" fontSize="sm">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </Td>
                  <Td>
                    <Button size="sm" onClick={() => handleView(inquiry)}>View</Button>
                  </Td>
                </Tr>
              ))}
              {inquiries.length === 0 && (
                <Tr>
                  <Td colSpan={5} textAlign="center" py={12} color="gray.400">
                    No inquiries found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* Inquiry Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent bg="bg.800" color="white" border="1px" borderColor="gray.700">
          <ModalHeader>Inquiry Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedInquiry && (
              <VStack align="stretch" spacing={4}>
                 <Box p={3} bg="gray.900" borderRadius="md">
                    <Text fontSize="xs" color="gray.500" textTransform="uppercase">Status</Text>
                    <Select 
                      size="sm" 
                      mt={1} 
                      value={selectedInquiry.status} 
                      onChange={(e) => handleStatusChange(e.target.value)}
                      bg="bg.800"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="responded">Responded</option>
                      <option value="closed">Closed</option>
                    </Select>
                 </Box>

                 <Box>
                    <Text fontSize="xs" color="gray.500" textTransform="uppercase">Customer Info</Text>
                    <Text fontWeight="bold" fontSize="lg">{selectedInquiry.name}</Text>
                    <HStack spacing={4} mt={1}>
                       <Text color="brand.400">{selectedInquiry.email}</Text>
                       {selectedInquiry.phone && <Text color="gray.300">{selectedInquiry.phone}</Text>}
                    </HStack>
                 </Box>

                 <Box>
                    <Text fontSize="xs" color="gray.500" textTransform="uppercase">Interested In</Text>
                    {selectedInquiry.equipment ? (
                       <Text>{selectedInquiry.equipment.title}</Text>
                    ) : (
                       <Text color="red.400">Item Removed</Text>
                    )}
                 </Box>

                 <Divider borderColor="gray.600" />

                 <Box>
                    <Text fontSize="xs" color="gray.500" textTransform="uppercase" mb={2}>Message</Text>
                    <Box p={4} bg="gray.700" borderRadius="md">
                       <Text fontStyle="italic">"{selectedInquiry.message}"</Text>
                    </Box>
                 </Box>
                 
                 <Text fontSize="xs" color="gray.500" textAlign="right">
                    Received: {new Date(selectedInquiry.created_at).toLocaleString()}
                 </Text>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
             <Button variant="ghost" onClick={onClose} mr={2}>Close</Button>
             <Button as={ChakraLink} href={`mailto:${selectedInquiry?.email}`} colorScheme="teal" _hover={{textDecor: 'none'}}>
                Reply via Email
             </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default InquiriesList;
