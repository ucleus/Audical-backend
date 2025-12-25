import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Container,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('email'); // email or otp
  const [isLoading, setIsLoading] = useState(false);
  const { login, verifyOtp } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email);
      setStep('otp');
      toast({
        title: 'OTP Sent',
        description: 'Check your email for the code.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to send OTP.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await verifyOtp(email, otp);
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error.response?.data?.message || 'Invalid OTP.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container centerContent h="100vh" justifyContent="center">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" bg="bg.800" w="100%">
        <VStack spacing={4} align="stretch">
          <Heading textAlign="center" color="brand.500">Audical</Heading>
          <Text textAlign="center" color="gray.400">Medical Equipment Management</Text>
          
          {step === 'email' ? (
            <form onSubmit={handleSendOtp}>
              <VStack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="admin@audical.com"
                  />
                </FormControl>
                <Button type="submit" colorScheme="teal" width="full" isLoading={isLoading}>
                  Send OTP
                </Button>
              </VStack>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <VStack spacing={4}>
                <FormControl id="otp" isRequired>
                  <FormLabel>Enter OTP</FormLabel>
                  <Input 
                    type="text" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    placeholder="123456"
                    maxLength={6}
                    textAlign="center"
                    letterSpacing="0.5em"
                  />
                </FormControl>
                <Button type="submit" colorScheme="green" width="full" isLoading={isLoading}>
                  Verify & Login
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setStep('email')}>
                  Back to Email
                </Button>
              </VStack>
            </form>
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default LoginPage;
