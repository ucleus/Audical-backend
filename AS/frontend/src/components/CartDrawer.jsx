import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Image,
  Box,
  Divider,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { BACKEND_URL } from '../lib/api';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, cartTotal, clearCart } = useCart();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent bg="bg.900" color="white" borderLeft="1px" borderColor="gray.800">
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px" borderColor="gray.800">
          <HStack>
            <FiShoppingCart color="#59d0c0" />
            <Text>Your Cart ({cart.length})</Text>
          </HStack>
        </DrawerHeader>

        <DrawerBody>
          {cart.length === 0 ? (
            <Center h="full" flexDirection="column">
              <FiShoppingCart size="48px" color="gray" />
              <Text mt={4} color="gray.500">Your cart is empty.</Text>
            </Center>
          ) : (
            <VStack align="stretch" spacing={4} py={4}>
              {cart.map((item) => (
                <Box key={item.id} p={3} bg="bg.800" borderRadius="lg" border="1px" borderColor="gray.700">
                  <HStack spacing={4}>
                    <Box w="60px" h="60px" borderRadius="md" overflow="hidden" bg="black">
                      {item.images?.[0] && (
                        <Image src={`${BACKEND_URL}/storage/${item.images[0].file_path}`} objectFit="cover" />
                      )}
                    </Box>
                    <VStack align="start" spacing={0} flex={1}>
                      <Text fontWeight="bold" fontSize="sm" isTruncated maxW="200px">{item.title}</Text>
                      <Text fontSize="xs" color="gray.400">{item.manufacturer}</Text>
                      <Text fontWeight="bold" color="brand.400" mt={1}>${parseFloat(item.price).toLocaleString()}</Text>
                    </VStack>
                    <IconButton 
                      icon={<FiTrash2 />} 
                      size="sm" 
                      variant="ghost" 
                      colorScheme="red" 
                      onClick={() => removeFromCart(item.id)}
                    />
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px" borderColor="gray.800" flexDirection="column" gap={4}>
          <Flex justify="space-between" w="full">
            <Text color="gray.400">Total Amount</Text>
            <Text fontWeight="bold" fontSize="xl">${cartTotal.toLocaleString()}</Text>
          </Flex>
          <HStack w="full" spacing={4}>
            <Button variant="outline" w="full" onClick={clearCart}>Clear</Button>
            <Button colorScheme="teal" w="full" isDisabled={cart.length === 0}>
              Checkout
            </Button>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

// Internal Import fix
import { Center } from '@chakra-ui/react';

export default CartDrawer;
