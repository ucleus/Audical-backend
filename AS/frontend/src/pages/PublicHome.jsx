import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Spinner,
  Center,
  HStack,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import PublicLayout from '../components/PublicLayout';
import api, { BACKEND_URL } from '../lib/api';
import InquiryModal from '../components/InquiryModal';

const ProductCard = ({ item, onInquire, navigate }) => (
  <Box 
    bg="bg.800" 
    borderRadius="xl" 
    overflow="hidden" 
    border="1px" 
    borderColor="gray.800"
    transition="all 0.2s"
    cursor="pointer"
    onClick={() => navigate(`/product/${item.id}`)}
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
          <HStack spacing={2}>
            <Button 
                size="sm" 
                colorScheme="teal" 
                variant="solid" 
                onClick={(e) => { e.stopPropagation(); onInquire(item); }}
            >
                Inquire
            </Button>
            <Button 
                size="sm" 
                variant="ghost" 
                colorScheme="whiteAlpha"
            >
                Details
            </Button>
          </HStack>
       </Flex>
    </Box>
  </Box>
);

const PublicHome = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate();

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

  const filteredItems = items.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const mfgMatch = item.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || mfgMatch;
    
    const matchesCategory = activeFilter === 'all' || item.type.toLowerCase().includes(activeFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <PublicLayout>
      {/* HERO */}
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
                placeholder="Search products..." 
                bg="white" 
                color="gray.900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* PRODUCT CATALOG */}
      <Box py={16} id="shop">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" mb={8} direction={{base: 'column', md: 'row'}} gap={4}>
            <Heading size="xl" color="white">Equipment Catalog</Heading>
            
            <HStack spacing={2} overflowX="auto" pb={{base: 2, md: 0}} maxW="full">
                {['all', 'Audiometer', 'Tympanometer', 'Booth'].map(cat => (
                    <Button 
                        key={cat}
                        size="sm" 
                        variant={activeFilter === cat ? 'solid' : 'outline'}
                        colorScheme="teal"
                        onClick={() => setActiveFilter(cat)}
                        textTransform="capitalize"
                    >
                        {cat}
                    </Button>
                ))}
            </HStack>
          </Flex>

          {loading ? (
             <Center py={20}><Spinner size="xl" color="brand.500" /></Center>
          ) : (
             <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                {filteredItems.map(item => (
                   <ProductCard 
                        key={item.id} 
                        item={item} 
                        onInquire={handleInquire} 
                        navigate={navigate} 
                    />
                ))}
             </SimpleGrid>
          )}
          
          {!loading && filteredItems.length === 0 && (
              <Center py={20} flexDirection="column">
                  <Text color="gray.500" fontSize="lg">No equipment found matching your criteria.</Text>
                  <Button variant="link" colorScheme="teal" mt={4} onClick={() => {setActiveFilter('all'); setSearchTerm('');}}>Clear Filters</Button>
              </Center>
          )}
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
