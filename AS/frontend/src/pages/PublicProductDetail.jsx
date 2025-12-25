import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Image,
  Heading,
  Text,
  Badge,
  Button,
  Grid,
  GridItem,
  VStack,
  HStack,
  Divider,
  SimpleGrid,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { FiMessageSquare, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import PublicLayout from '../components/PublicLayout';
import api, { BACKEND_URL } from '../lib/api';
import InquiryModal from '../components/InquiryModal';

const PublicProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/public/equipment/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error("Failed to load item");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) return (
    <PublicLayout>
        <Center h="50vh"><Spinner size="xl" color="brand.500" /></Center>
    </PublicLayout>
  );

  if (!item) return (
    <PublicLayout>
        <Center h="50vh"><Text>Product not found.</Text></Center>
    </PublicLayout>
  );

  return (
    <PublicLayout>
      <Container maxW="container.xl" py={10}>
        <Button leftIcon={<FiArrowLeft />} variant="ghost" mb={6} onClick={() => navigate('/')}>
            Back to Catalog
        </Button>

        <Grid templateColumns={{ base: '1fr', lg: '1.5fr 1fr' }} gap={10}>
            {/* Left: Images */}
            <GridItem>
                <Box 
                    bg="black" 
                    borderRadius="xl" 
                    overflow="hidden" 
                    h="500px" 
                    mb={4} 
                    border="1px" 
                    borderColor="gray.700"
                >
                    {item.images?.[activeImage] ? (
                        <Image 
                            src={`${BACKEND_URL}/storage/${item.images[activeImage].file_path}`} 
                            w="100%" h="100%" objectFit="contain" 
                        />
                    ) : (
                        <Center h="100%" color="gray.500">No Image Available</Center>
                    )}
                </Box>
                {item.images?.length > 1 && (
                    <SimpleGrid columns={5} spacing={2}>
                        {item.images.map((img, idx) => (
                            <Box 
                                key={img.id} 
                                h="80px" 
                                bg="black" 
                                borderRadius="lg" 
                                overflow="hidden" 
                                cursor="pointer"
                                border="2px"
                                borderColor={activeImage === idx ? 'brand.500' : 'gray.700'}
                                onClick={() => setActiveImage(idx)}
                            >
                                <Image src={`${BACKEND_URL}/storage/${img.file_path}`} w="100%" h="100%" objectFit="cover" />
                            </Box>
                        ))}
                    </SimpleGrid>
                )}
            </GridItem>

            {/* Right: Details */}
            <GridItem>
                <VStack align="start" spacing={6}>
                    <Box>
                        <HStack mb={2}>
                            <Badge colorScheme="teal" fontSize="sm">{item.type}</Badge>
                            <Badge colorScheme="blue" variant="outline" fontSize="sm">{item.condition}</Badge>
                        </HStack>
                        <Heading size="xl" color="white">{item.title}</Heading>
                        <Text color="gray.400" fontSize="lg" mt={2}>{item.manufacturer} - {item.model_number}</Text>
                    </Box>

                    <Text fontSize="3xl" fontWeight="bold" color="brand.400">
                        ${parseFloat(item.price).toLocaleString()}
                    </Text>

                    <Box w="full" bg="bg.800" p={6} borderRadius="xl" border="1px" borderColor="gray.700">
                        <Button 
                            w="full" 
                            colorScheme="teal" 
                            size="lg" 
                            leftIcon={<FiMessageSquare />} 
                            onClick={() => setIsModalOpen(true)}
                        >
                            Inquire / Purchase
                        </Button>
                        <Text fontSize="xs" color="gray.500" mt={3} textAlign="center">
                            Contact us to arrange payment and shipping.
                        </Text>
                    </Box>

                    <Box>
                        <Heading size="md" color="white" mb={3}>About this item</Heading>
                        <Text color="gray.300" whiteSpace="pre-wrap">{item.description}</Text>
                    </Box>

                    <Divider borderColor="gray.700" />

                    <SimpleGrid columns={2} w="full" spacing={4}>
                        <Box>
                            <Text color="gray.500" fontSize="sm">Year</Text>
                            <Text color="white">{item.year_of_manufacture || 'N/A'}</Text>
                        </Box>
                        <Box>
                            <Text color="gray.500" fontSize="sm">Location</Text>
                            <Text color="white">{item.location || 'N/A'}</Text>
                        </Box>
                        <Box>
                            <Text color="gray.500" fontSize="sm">Calibration</Text>
                            <Text color="white">{item.last_calibration_date || 'Unknown'}</Text>
                        </Box>
                        <Box>
                            <Text color="gray.500" fontSize="sm">Warranty</Text>
                            <Text color="white">{item.warranty_details || 'None'}</Text>
                        </Box>
                    </SimpleGrid>

                    {item.fda_approved && (
                        <HStack color="green.400">
                            <FiCheckCircle />
                            <Text fontSize="sm">FDA Approved</Text>
                        </HStack>
                    )}
                </VStack>
            </GridItem>
        </Grid>
      </Container>

      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        equipment={item} 
      />
    </PublicLayout>
  );
};

export default PublicProductDetail;
