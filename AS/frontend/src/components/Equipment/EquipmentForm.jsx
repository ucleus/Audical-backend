import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { FiUpload, FiX } from 'react-icons/fi';

const EquipmentForm = ({ initialData = {}, onSubmit, isLoading }) => {
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

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="sm" mb={4} color="brand.400" textTransform="uppercase">General Information</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Philips Affiniti 70 Ultrasound" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Equipment Type</FormLabel>
              <Select name="type" value={formData.type} onChange={handleChange} placeholder="Select Type">
                <option value="Diagnostic">Diagnostic</option>
                <option value="Surgical">Surgical</option>
                <option value="Therapeutic">Therapeutic</option>
                <option value="Dental">Dental</option>
                <option value="Imaging">Imaging</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Manufacturer</FormLabel>
              <Input name="manufacturer" value={formData.manufacturer} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Model Number</FormLabel>
              <Input name="model_number" value={formData.model_number} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Year of Manufacture</FormLabel>
              <Input name="year_of_manufacture" type="number" value={formData.year_of_manufacture} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Condition</FormLabel>
              <Select name="condition" value={formData.condition} onChange={handleChange} placeholder="Select Condition">
                <option value="New">New</option>
                <option value="Used - Like New">Used - Like New</option>
                <option value="Used - Good">Used - Good</option>
                <option value="Used - Fair">Used - Fair</option>
              </Select>
            </FormControl>
          </SimpleGrid>
        </Box>

        <Divider borderColor="gray.700" />

        <Box>
          <Heading size="sm" mb={4} color="brand.400" textTransform="uppercase">Pricing & Logistics</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <FormControl isRequired>
              <FormLabel>Price ($)</FormLabel>
              <Input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} />
            </FormControl>
            <FormControl pt={8}>
              <Checkbox name="is_negotiable" isChecked={formData.is_negotiable} onChange={handleChange}>
                Negotiable
              </Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Stock Quantity</FormLabel>
              <NumberInput min={0} value={formData.stock_quantity}>
                <NumberInputField name="stock_quantity" onChange={handleChange} />
              </NumberInput>
            </FormControl>
            <FormControl gridColumn={{ md: "span 2" }}>
              <FormLabel>Item Location</FormLabel>
              <Input name="location" value={formData.location} onChange={handleChange} placeholder="City, Country" />
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </Select>
            </FormControl>
          </SimpleGrid>
        </Box>

        <Divider borderColor="gray.700" />

        <Box>
          <Heading size="sm" mb={4} color="brand.400" textTransform="uppercase">Compliance & Support</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <HStack spacing={8} pt={4}>
              <Checkbox name="fda_approved" isChecked={formData.fda_approved} onChange={handleChange}>FDA Approved</Checkbox>
              <Checkbox name="ce_marked" isChecked={formData.ce_marked} onChange={handleChange}>CE Marked</Checkbox>
            </HStack>
            <FormControl>
              <FormLabel>Last Calibration Date</FormLabel>
              <Input name="last_calibration_date" type="date" value={formData.last_calibration_date} onChange={handleChange} />
            </FormControl>
            <FormControl gridColumn={{ md: "span 2" }}>
              <FormLabel>Warranty Details</FormLabel>
              <Textarea name="warranty_details" value={formData.warranty_details} onChange={handleChange} placeholder="Details about warranty coverage..." />
            </FormControl>
          </SimpleGrid>
        </Box>

        <Divider borderColor="gray.700" />

        <Box>
          <Heading size="sm" mb={4} color="brand.400" textTransform="uppercase">Images</Heading>
          <FormControl>
            <FormLabel>Upload Equipment Photos</FormLabel>
            <Box
              border="2px dashed"
              borderColor="gray.600"
              borderRadius="lg"
              p={6}
              textAlign="center"
              cursor="pointer"
              _hover={{ borderColor: 'brand.500' }}
              onClick={() => document.getElementById('image-upload').click()}
            >
              <FiUpload style={{ margin: '0 auto', fontSize: '24px', color: '#0EA5A4' }} />
              <Text mt={2}>Click to upload or drag and drop</Text>
              <Text fontSize="xs" color="gray.500">PNG, JPG up to 10MB</Text>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </Box>
          </FormControl>

          {imagePreviews.length > 0 && (
            <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} spacing={4} mt={4}>
              {imagePreviews.map((src, index) => (
                <Box key={index} pos="relative" borderRadius="md" overflow="hidden" h="100px" border="1px" borderColor="gray.700">
                  <Image src={src} objectFit="cover" w="100%" h="100%" />
                  <IconButton
                    size="xs"
                    icon={<FiX />}
                    pos="absolute"
                    top={1}
                    right={1}
                    colorScheme="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                  />
                  {index === 0 && (
                    <Badge pos="absolute" bottom={0} left={0} w="100%" textAlign="center" colorScheme="teal" fontSize="2xs">
                      Primary
                    </Badge>
                  )}
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>

        <Box pt={4}>
          <Button type="submit" colorScheme="teal" size="lg" width="full" isLoading={isLoading}>
            Save Equipment
          </Button>
        </Box>
      </VStack>
    </form>
  );
};

export default EquipmentForm;
