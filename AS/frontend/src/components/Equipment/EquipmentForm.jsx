import React, { useState, useRef } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  Textarea,
  Checkbox,
  Button,
  Box,
  Heading,
  Divider,
  HStack,
  Text,
  IconButton,
  Image,
  Flex,
  Grid,
  GridItem,
  Badge,
  useColorModeValue,
  Container,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiX, FiCamera, FiDollarSign, FiTag, FiTrash2 } from 'react-icons/fi';

const EquipmentForm = ({ initialData = {}, onSubmit, isLoading }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [formData, setFormData] = useState({
    title: '',
    manufacturer: '',
    model_number: '',
    year_of_manufacture: '',
    type: '',
    condition: '',
    description: '',
    price: '',
    is_negotiable: false,
    stock_quantity: 1,
    location: '',
    fda_approved: false,
    ce_marked: false,
    last_calibration_date: '',
    warranty_details: '',
    status: 'active',
    ...initialData
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
    
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    });

    images.forEach((image) => {
      data.append('images[]', image);
    });

    onSubmit(data);
  };

  const handleDiscard = () => {
    navigate('/equipment');
  };

  const bgColor = useColorModeValue('white', 'bg.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Container maxW="container.xl" p={0}>
      <form onSubmit={handleSubmit}>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 350px' }} gap={6}>
          
          {/* Main Content Column */}
          <GridItem>
             {/* 1. Media Upload (Hero Section) */}
            <Box bg={bgColor} p={6} borderRadius="xl" borderWidth="1px" borderColor={borderColor} mb={6} position="relative">
              <Heading size="md" mb={4}>Photos</Heading>
              <Text fontSize="sm" color="gray.500" mb={4}>Add photos to attract more buyers. Show all angles and details.</Text>
              
              <Flex direction="column" gap={4}>
                 <Box
                  border="2px dashed"
                  borderColor="gray.500"
                  borderRadius="xl"
                  bg="whiteAlpha.50"
                  h="200px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  _hover={{ borderColor: 'brand.500', bg: 'whiteAlpha.100' }}
                  onClick={() => document.getElementById('image-upload').click()}
                  transition="all 0.2s"
                >
                  <VStack spacing={2}>
                    <Box p={3} bg="brand.500" borderRadius="full">
                       <FiCamera size={24} color="white" />
                    </Box>
                    <Text fontWeight="bold">Add Photos</Text>
                    <Text fontSize="xs" color="gray.400">or drag and drop</Text>
                  </VStack>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </Box>

                {/* Preview Grid */}
                {imagePreviews.length > 0 && (
                  <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4}>
                    {imagePreviews.map((src, index) => (
                      <Box key={index} pos="relative" borderRadius="lg" overflow="hidden" pt="100%" bg="black" border="1px" borderColor="gray.600">
                        <Image src={src} objectFit="cover" pos="absolute" top={0} left={0} w="100%" h="100%" />
                        <IconButton
                          size="xs"
                          icon={<FiX />}
                          pos="absolute"
                          top={1}
                          right={1}
                          colorScheme="red"
                          borderRadius="full"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                        />
                        {index === 0 && (
                          <Badge pos="absolute" bottom={0} left={0} w="100%" textAlign="center" colorScheme="teal" fontSize="xs" py={1}>
                            Cover Photo
                          </Badge>
                        )}
                      </Box>
                    ))}
                  </SimpleGrid>
                )}
              </Flex>
            </Box>

            {/* 2. Key Details */}
            <Box bg={bgColor} p={6} borderRadius="xl" borderWidth="1px" borderColor={borderColor} mb={6}>
              <Heading size="md" mb={4}>Item Details</Heading>
              <VStack spacing={4}>
                <FormControl isRequired>
                   <FormLabel>Title</FormLabel>
                   <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Interacoustics AC40 Clinical Audiometer" size="lg" fontSize="md" />
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                    <FormControl isRequired>
                      <FormLabel>Equipment Type</FormLabel>
                      <Select name="type" value={formData.type} onChange={handleChange} placeholder="Select Type">
                        <option value="Audiometer">Audiometer</option>
                        <option value="Tympanometer">Tympanometer</option>
                        <option value="Sound Booth">Sound Booth</option>
                        <option value="Real Ear Measurement (REM)">Real Ear Measurement (REM)</option>
                        <option value="Otoscope">Otoscope</option>
                        <option value="OAE System">OAE System</option>
                        <option value="Hearing Aid Analyzer">Hearing Aid Analyzer</option>
                        <option value="VNG/ENG System">VNG/ENG System</option>
                        <option value="Other">Other</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Condition</FormLabel>
                      <Select name="condition" value={formData.condition} onChange={handleChange} placeholder="Select Condition">
                        <option value="New">New</option>
                        <option value="Used - Like New">Used - Like New</option>
                        <option value="Used - Good">Used - Good</option>
                        <option value="Used - Fair">Used - Fair</option>
                        <option value="For Parts">For Parts</option>
                      </Select>
                    </FormControl>
                </SimpleGrid>

                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    placeholder="Describe the item in detail (specs, included accessories, known issues)..." 
                    rows={6} 
                  />
                </FormControl>
              </VStack>
            </Box>

            {/* 3. Technical Specs */}
            <Box bg={bgColor} p={6} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
              <Heading size="md" mb={4}>Technical Specifications</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                 <FormControl>
                    <FormLabel>Manufacturer</FormLabel>
                    <Input name="manufacturer" value={formData.manufacturer} onChange={handleChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Model Number</FormLabel>
                    <Input name="model_number" value={formData.model_number} onChange={handleChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Year of Manufacture</FormLabel>
                    <Input name="year_of_manufacture" type="number" value={formData.year_of_manufacture} onChange={handleChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Last Calibration</FormLabel>
                    <Input name="last_calibration_date" type="date" value={formData.last_calibration_date} onChange={handleChange} />
                  </FormControl>
                  <Box gridColumn={{ md: "span 2" }} pt={2}>
                    <HStack spacing={6}>
                        <Checkbox name="fda_approved" isChecked={formData.fda_approved} onChange={handleChange}>FDA Approved</Checkbox>
                        <Checkbox name="ce_marked" isChecked={formData.ce_marked} onChange={handleChange}>CE Marked</Checkbox>
                    </HStack>
                  </Box>
              </SimpleGrid>
            </Box>
          </GridItem>

          {/* Sidebar Column (Pricing & Logistics) */}
          <GridItem>
            <VStack spacing={6} position="sticky" top="100px">
              <Box bg={bgColor} p={6} borderRadius="xl" borderWidth="1px" borderColor={borderColor} w="full" boxShadow="sm">
                <Heading size="sm" mb={4} color="gray.400" textTransform="uppercase" letterSpacing="wide">Pricing</Heading>
                <FormControl isRequired mb={4}>
                  <FormLabel>Price</FormLabel>
                   <Box position="relative">
                      <Input 
                        name="price" 
                        type="number" 
                        step="0.01" 
                        value={formData.price} 
                        onChange={handleChange} 
                        pl={8} 
                        placeholder="0.00" 
                        size="lg"
                        fontWeight="bold"
                      />
                      <Box position="absolute" left={3} top={3}>
                        <FiDollarSign color="gray" />
                      </Box>
                   </Box>
                </FormControl>
                <Checkbox name="is_negotiable" isChecked={formData.is_negotiable} onChange={handleChange} mb={2}>
                  Price is negotiable
                </Checkbox>
              </Box>

              <Box bg={bgColor} p={6} borderRadius="xl" borderWidth="1px" borderColor={borderColor} w="full">
                 <Heading size="sm" mb={4} color="gray.400" textTransform="uppercase" letterSpacing="wide">Inventory</Heading>
                 <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Stock Quantity</FormLabel>
                      <NumberInput min={1} value={formData.stock_quantity} w="full">
                        <NumberInputField name="stock_quantity" onChange={handleChange} />
                      </NumberInput>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Location</FormLabel>
                      <Input name="location" value={formData.location} onChange={handleChange} placeholder="City, State" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Status</FormLabel>
                       <Select name="status" value={formData.status} onChange={handleChange}>
                        <option value="active">Active (Visible)</option>
                        <option value="draft">Draft (Hidden)</option>
                      </Select>
                    </FormControl>
                 </VStack>
              </Box>

              <VStack spacing={3} w="full">
                <Button type="submit" colorScheme="teal" size="lg" w="full" isLoading={isLoading} h="50px" fontSize="lg">
                  Publish Listing
                </Button>
                <Button 
                  variant="ghost" 
                  colorScheme="red" 
                  w="full" 
                  leftIcon={<FiTrash2 />} 
                  onClick={onOpen}
                >
                  Discard
                </Button>
              </VStack>
            </VStack>
          </GridItem>
        </Grid>
      </form>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="bg.800" color="white" border="1px" borderColor="gray.700">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Discard Changes
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to discard this listing? All unsaved changes will be lost.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} variant="ghost">
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDiscard} ml={3}>
                Discard
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default EquipmentForm;
