import React from 'react';
import { Box, Flex, Text, Button, Container, HStack, Stack, Link as ChakraLink, useColorModeValue } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicLayout = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const bg = useColorModeValue('bg.900', 'gray.900');

  return (
    <Box minH="100vh" bg={bg}>
      {/* Navbar */}
      <Box borderBottom="1px" borderColor="gray.800" bg="bg.900" position="sticky" top={0} zIndex={100}>
        <Container maxW="container.xl">
          <Flex h={20} alignItems="center" justifyContent="space-between">
            <Text 
              fontSize="2xl" 
              fontWeight="bold" 
              fontFamily="monospace" 
              color="brand.500" 
              cursor="pointer"
              onClick={() => navigate('/')}
            >
              Audical
            </Text>

            <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
              <ChakraLink as={Link} to="/" color="gray.300" _hover={{ color: 'white' }}>Buy</ChakraLink>
              <ChakraLink color="gray.300" _hover={{ color: 'white' }}>Sell</ChakraLink>
              <ChakraLink color="gray.300" _hover={{ color: 'white' }}>About</ChakraLink>
              <ChakraLink color="gray.300" _hover={{ color: 'white' }}>Contact</ChakraLink>
            </HStack>

            <HStack spacing={4}>
              {user ? (
                <Button colorScheme="teal" size="sm" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </Button>
              ) : (
                <Button variant="ghost" colorScheme="teal" size="sm" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
              )}
              {!user && (
                 <Button colorScheme="teal" size="sm">Get Started</Button>
              )}
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Content */}
      <Box>
        {children}
      </Box>

      {/* Footer */}
      <Box bg="gray.900" borderTop="1px" borderColor="gray.800" py={10} mt={20}>
        <Container maxW="container.xl">
           <Flex justify="space-between" direction={{ base: 'column', md: 'row' }} gap={8}>
              <Stack>
                 <Text fontSize="lg" fontWeight="bold" color="white">Audical</Text>
                 <Text color="gray.500" fontSize="sm">The marketplace for audiology professionals.</Text>
              </Stack>
              <HStack spacing={8} align="start">
                 <Stack spacing={2}>
                    <Text fontWeight="bold" color="white">Marketplace</Text>
                    <ChakraLink color="gray.500" fontSize="sm">Browse Equipment</ChakraLink>
                    <ChakraLink color="gray.500" fontSize="sm">Sell Equipment</ChakraLink>
                 </Stack>
                 <Stack spacing={2}>
                    <Text fontWeight="bold" color="white">Company</Text>
                    <ChakraLink color="gray.500" fontSize="sm">About Us</ChakraLink>
                    <ChakraLink color="gray.500" fontSize="sm">Contact</ChakraLink>
                 </Stack>
              </HStack>
           </Flex>
           <Text color="gray.600" fontSize="xs" mt={10} textAlign="center">© 2025 Audical. All rights reserved.</Text>
        </Container>
      </Box>
    </Box>
  );
};

export default PublicLayout;
