import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Container,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Image,
  Badge,
  VStack,
  Flex,
  Icon,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { FiSearch, FiCheckCircle, FiShield, FiGlobe } from 'react-icons/fi';
import PublicLayout from '../components/PublicLayout';
import api, { BACKEND_URL } from '../lib/api';
import InquiryModal from '../components/InquiryModal';

const CategoryIcon = ({ label, icon }) => (
  <VStack 
    cursor="pointer" 
    transition="all 0.2s" 
    _hover={{ transform: 'translateY(-5px)' }}
    spacing={3}
  >
    <Flex 
      w="80px" 
      h="80px" 
      borderRadius="full" 
      bg="gray.800" 
      align="center" 
      justify="center"
      border="1px"
      borderColor="gray.700"
      _hover={{ borderColor: 'brand.500', bg: 'gray.700' }}
    >
      {/* Placeholder Icon or Real Icon */}
      <Box w="30px" h="30px" bg="brand.500" borderRadius="md" opacity={0.8} /> 
    </Flex>
    <Text color="gray.300" fontSize="sm" fontWeight="medium">{label}</Text>
  </VStack>
);

const ProductCard = ({ item, onInquire }) => (
  <Box 
    bg="bg.800" 
    borderRadius="xl" 
    overflow="hidden" 
    border="1px" 
    borderColor="gray.800"
    transition="all 0.2s"
    _hover={{ transform: 'translateY(-4px)', shadow: 'xl', borderColor: 'brand.500' }}
  >
    <Box h="200px" bg="gray.900" pos="relative" overflow="hidden">
       {item.images?.[0] ? (
          <Image 
            src={`${BACKEND_URL}/storage/${item.images[0].file_path}`} 
            w="100%" 
            h="100%" 
            objectFit="cover" 
          />
       ) : (
          <Center h="100%" color="gray.600">No Image</Center>
       )}
       <Badge pos="absolute" top={3} left={3} colorScheme="teal">{item.type}</Badge>
    </Box>
    <Box p={5}>
       <Flex justify="space-between" align="center" mb={2}>
          <Badge variant="outline" colorScheme={item.condition === 'New' ? 'green' : 'blue'} fontSize="xs">
            {item.condition}
          </Badge>
          <Text fontSize="xs" color="gray.500">{item.location}</Text>
       </Flex>
       <Heading size="md" mb={2} color="white" isTruncated>{item.title}</Heading>
       <Text color="gray.400" fontSize="sm" noOfLines={2} mb={4}>{item.description}</Text>
       <Flex justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold" color="white">
            ${parseFloat(item.price).toLocaleString()}
          </Text>
          <Button size="sm" colorScheme="teal" variant="outline" onClick={() => onInquire(item)}>
            Inquire
          </Button>
       </Flex>
    </Box>
  </Box>
);

const PublicHome = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get('/public/equipment');
        setItems(response.data.data);
      } catch (error) {
        console.error("Failed to load public items");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleInquire = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <Box 
        bgGradient="linear(to-b, bg.900, gray.900)" 
        py={{ base: 20, md: 32 }} 
        textAlign="center"
        borderBottom="1px"
        borderColor="gray.800"
      >
        <Container maxW="container.lg">
          <Badge colorScheme="teal" mb={4} px={3} py={1} borderRadius="full">
            The Trusted Marketplace
          </Badge>
          <Heading size="3xl" color="white" mb={6} lineHeight="tight">
            The Leading Marketplace for <br />
            <Text as="span" color="brand.400">Pre-owned Audiology Equipment</Text>
          </Heading>
          <Text color="gray.400" fontSize="xl" mb={10} maxW="2xl" mx="auto">
            Buy and sell certified audiometers, tympanometers, and sound booths with confidence. Verified sellers, secure transactions.
          </Text>

          <Box maxW="xl" mx="auto">
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.500" />
              </InputLeftElement>
              <Input 
                placeholder="Search for equipment (e.g., 'GSI 61', 'Sound Booth')..." 
                bg="white" 
                color="gray.900"
                _placeholder={{ color: 'gray.500' }}
                border="none"
                focusBorderColor="brand.500"
              />
              <Button h="100%" colorScheme="teal" borderLeftRadius={0} px={8}>
                Search
              </Button>
            </InputGroup>
          </Box>
        </Container>
      </Box>

      {/* Categories */}
      <Box py={16} bg="bg.900">
        <Container maxW="container.xl">
           <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} spacing={8} justifyContent="center">
              <CategoryIcon label="Audiometers" />
              <CategoryIcon label="Tympanometers" />
              <CategoryIcon label="REM Systems" />
              <CategoryIcon label="Sound Booths" />
              <CategoryIcon label="OAE Systems" />
              <CategoryIcon label="Screeners" />
           </SimpleGrid>
        </Container>
      </Box>

      {/* Featured Listings */}
      <Box py={16} bg="gray.900">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" mb={10}>
             <Heading size="xl" color="white">Recent Arrivals</Heading>
             <Button variant="link" colorScheme="teal">View All Inventory</Button>
          </Flex>

          {loading ? (
             <Center py={20}><Spinner size="xl" color="brand.500" /></Center>
          ) : (
             <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                {items.map(item => (
                   <ProductCard key={item.id} item={item} onInquire={handleInquire} />
                ))}
             </SimpleGrid>
          )}
        </Container>
      </Box>

      {/* Value Props */}
      <Box py={20} bg="bg.900" borderTop="1px" borderColor="gray.800">
         <Container maxW="container.xl">
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
               <VStack align="start" spacing={4} p={6} bg="gray.800" borderRadius="xl">
                  <Icon as={FiCheckCircle} w={8} h={8} color="brand.400" />
                  <Heading size="md" color="white">Quality Assured</Heading>
                  <Text color="gray.400">All equipment is verified for condition and calibration status before listing.</Text>
               </VStack>
               <VStack align="start" spacing={4} p={6} bg="gray.800" borderRadius="xl">
                  <Icon as={FiShield} w={8} h={8} color="brand.400" />
                  <Heading size="md" color="white">Secure Payments</Heading>
                  <Text color="gray.400">Transactions are protected with escrow-style payments until delivery is confirmed.</Text>
               </VStack>
               <VStack align="start" spacing={4} p={6} bg="gray.800" borderRadius="xl">
                  <Icon as={FiGlobe} w={8} h={8} color="brand.400" />
                  <Heading size="md" color="white">Global Shipping</Heading>
                  <Text color="gray.400">We handle logistics and crating to ensure safe delivery anywhere in the world.</Text>
               </VStack>
            </SimpleGrid>
         </Container>
      </Box>

      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        equipment={selectedItem} 
      />
    </PublicLayout>
  );
};

export default PublicHome;
