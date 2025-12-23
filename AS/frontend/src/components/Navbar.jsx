import React from 'react';
import {
  Flex,
  IconButton,
  Text,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Box,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpen, ...rest }) => {
  const { user, logout } = useAuth();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg="bg.900"
      borderBottomWidth="1px"
      borderBottomColor="gray.700"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        color="brand.500"
      >
        Audical
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  name={user?.name}
                  bg="brand.500"
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" color="gray.200">{user?.name}</Text>
                  <Text fontSize="xs" color="gray.400">
                    {user?.role?.name}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown color="gray.400" />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg="bg.800"
              borderColor="gray.700"
            >
              <MenuItem bg="bg.800" _hover={{ bg: 'gray.700' }} icon={<FiLogOut />} onClick={logout}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Navbar;
