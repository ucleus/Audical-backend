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
  VStack,
  Button,
} from '@chakra-ui/react';
import { FiDollarSign, FiTruck } from 'react-icons/fi';
import api from '../lib/api';
import Layout from '../components/Layout';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data.data);
    } catch (error) {
      toast({ status: 'error', title: 'Failed to load orders' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'green';
      case 'unpaid': return 'red';
      case 'refunded': return 'gray';
      default: return 'yellow';
    }
  };

  return (
    <Layout>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg" color="white">Sold Items / Orders</Heading>
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
                <Th color="gray.400">Order ID</Th>
                <Th color="gray.400">Customer</Th>
                <Th color="gray.400">Item</Th>
                <Th color="gray.400">Amount</Th>
                <Th color="gray.400">Payment</Th>
                <Th color="gray.400">Shipping</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order.id} _hover={{ bg: 'gray.700' }}>
                  <Td color="gray.300">#{order.id}</Td>
                  <Td>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" color="white">{order.customer_name}</Text>
                      <Text fontSize="xs" color="gray.400">{order.customer_email}</Text>
                    </VStack>
                  </Td>
                  <Td color="brand.300">{order.equipment?.title || 'Unknown'}</Td>
                  <Td color="white" fontWeight="bold">${parseFloat(order.amount).toLocaleString()}</Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(order.payment_status)}>{order.payment_status}</Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={order.status === 'shipped' ? 'green' : 'blue'}>{order.status}</Badge>
                    {order.tracking_number && (
                        <Text fontSize="xs" color="gray.400" mt={1}>Trk: {order.tracking_number}</Text>
                    )}
                  </Td>
                </Tr>
              ))}
              {orders.length === 0 && (
                <Tr>
                  <Td colSpan={6} textAlign="center" py={12} color="gray.400">
                    No orders found.
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

export default OrdersList;
