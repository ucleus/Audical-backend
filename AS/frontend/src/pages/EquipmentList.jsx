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
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  HStack,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
  Divider,
  Tag,
  VStack,
} from '@chakra-ui/react';
import { FiPlus, FiSearch, FiEye, FiEdit2, FiCheckCircle, FiInfo } from 'react-icons/fi';
import api from '../lib/api';
import Layout from '../components/Layout';

import { Link } from 'react-router-dom';

const EquipmentList = () => {
  // ... existing states ...

  return (
    <Layout>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg" color="white">Equipment Inventory</Heading>
        <Button as={Link} to="/equipment/create" leftIcon={<FiPlus />} colorScheme="teal">
          Add Equipment
        </Button>
      </Flex>

      <Box bg="bg.800" p={4} borderRadius="lg" mb={6} borderWidth="1px" borderColor="gray.700">
        <HStack spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.400" />
            </InputLeftElement>
            <Input 
              placeholder="Search by title, manufacturer, or model..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg="bg.900"
            />
          </InputGroup>
          <Select 
            placeholder="All Statuses" 
            maxW="200px" 
            bg="bg.900"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="sold">Sold</option>
            <option value="archived">Archived</option>
          </Select>
        </HStack>
      </Box>

      {loading ? (
        <Flex justify="center" align="center" h="200px">
          <Spinner size="xl" color="brand.500" />
        </Flex>
      ) : (
        <Box bg="bg.800" borderRadius="lg" overflow="hidden" boxShadow="sm" borderWidth="1px" borderColor="gray.700">
          <Table variant="simple">
            <Thead bg="gray.800">
              <Tr>
                <Th color="gray.400">Item</Th>
                <Th color="gray.400">Model / Mfg</Th>
                <Th color="gray.400">Condition</Th>
                <Th color="gray.400">Price</Th>
                <Th color="gray.400">Status</Th>
                <Th color="gray.400">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item) => (
                <Tr key={item.id} _hover={{ bg: 'gray.700' }}>
                  <Td>
                    <HStack>
                      <Box w="40px" h="40px" bg="gray.700" borderRadius="md" overflow="hidden">
                         {item.images?.[0] ? (
                           <Image src={`http://localhost:8000/storage/${item.images[0].file_path}`} objectFit="cover" />
                         ) : (
                           <Flex align="center" justify="center" h="100%"><Text fontSize="xs">NA</Text></Flex>
                         )}
                      </Box>
                      <Box>
                        <Text color="white" fontWeight="medium" isTruncated maxW="200px">{item.title}</Text>
                        <Text fontSize="xs" color="gray.400">{item.type}</Text>
                      </Box>
                    </HStack>
                  </Td>
                  <Td>
                    <Box>
                      <Text color="gray.300">{item.model_number}</Text>
                      <Text fontSize="xs" color="gray.500">{item.manufacturer}</Text>
                    </Box>
                  </Td>
                  <Td>
                    <Badge variant="outline" colorScheme="teal">{item.condition}</Badge>
                  </Td>
                  <Td color="brand.300" fontWeight="bold">
                    ${parseFloat(item.price).toLocaleString()}
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(item.status)}>{item.status}</Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button size="sm" leftIcon={<FiEye />} variant="ghost" onClick={() => handleViewDetails(item)}>View</Button>
                      <Button size="sm" leftIcon={<FiEdit2 />} variant="ghost" colorScheme="blue">Edit</Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
              {items.length === 0 && (
                <Tr>
                  <Td colSpan={6} textAlign="center" py={12} color="gray.400">
                    No equipment found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent bg="bg.800" color="white" border="1px" borderColor="gray.700">
          <ModalHeader borderBottomWidth="1px" borderColor="gray.700">
            <HStack>
              <FiInfo color="#0EA5A4" />
              <Text>Equipment Details</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            {selectedItem && (
              <VStack align="stretch" spacing={6}>
                <Flex gap={4}>
                   <Box w="120px" h="120px" bg="gray.900" borderRadius="lg" overflow="hidden" border="1px" borderColor="gray.700">
                      {selectedItem.images?.[0] ? (
                        <Image src={`http://localhost:8000/storage/${selectedItem.images[0].file_path}`} objectFit="cover" w="100%" h="100%" />
                      ) : (
                        <Flex align="center" justify="center" h="100%"><Text color="gray.600">No Image</Text></Flex>
                      )}
                   </Box>
                   <VStack align="flex-start" spacing={1} flex={1}>
                      <Heading size="md">{selectedItem.title}</Heading>
                      <Text color="brand.400" fontWeight="bold">${parseFloat(selectedItem.price).toLocaleString()}</Text>
                      <HStack>
                        <Tag size="sm" colorScheme="teal">{selectedItem.type}</Tag>
                        <Tag size="sm" colorScheme={getStatusColor(selectedItem.status)}>{selectedItem.status}</Tag>
                      </HStack>
                   </VStack>
                </Flex>

                <Divider borderColor="gray.700" />

                <SimpleGrid columns={2} spacing={6}>
                  <InfoRow label="Manufacturer" value={selectedItem.manufacturer} />
                  <InfoRow label="Model Number" value={selectedItem.model_number} />
                  <InfoRow label="Year" value={selectedItem.year_of_manufacture} />
                  <InfoRow label="Condition" value={selectedItem.condition} />
                  <InfoRow label="Location" value={selectedItem.location} />
                  <InfoRow label="Stock" value={selectedItem.stock_quantity} />
                </SimpleGrid>

                <Divider borderColor="gray.700" />

                <Heading size="xs" textTransform="uppercase" color="gray.500">Compliance & Warranty</Heading>
                <SimpleGrid columns={2} spacing={6}>
                  <InfoRow label="FDA Approved" value={selectedItem.fda_approved} isBoolean />
                  <InfoRow label="CE Marked" value={selectedItem.ce_marked} isBoolean />
                  <InfoRow label="Last Calibration" value={selectedItem.last_calibration_date} />
                  <InfoRow label="Warranty" value={selectedItem.warranty_details} />
                </SimpleGrid>

                <Box>
                  <Text fontSize="xs" color="gray.500" fontWeight="bold" textTransform="uppercase" mb={1}>Description</Text>
                  <Text fontSize="sm" color="gray.300">{selectedItem.description || 'No description provided.'}</Text>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter borderTopWidth="1px" borderColor="gray.700">
            <Button variant="ghost" mr={3} onClick={onClose}>Close</Button>
            <Button colorScheme="blue">Edit Item</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

// Internal Icon fix
const Icon = ({ as, ...props }) => {
  const Comp = as;
  return <Box as={Comp} {...props} />;
};

export default EquipmentList;
