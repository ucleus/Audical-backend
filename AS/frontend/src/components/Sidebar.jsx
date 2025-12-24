import React from 'react';
import { Box, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import { FiHome, FiUsers, FiBox, FiSettings, FiMessageSquare, FiShoppingCart } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ icon, children, to }) => {
  return (
    <NavLink to={to} style={{ width: '100%' }}>
      {({ isActive }) => (
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={isActive ? 'brand.500' : 'transparent'}
          color={isActive ? 'white' : 'gray.400'}
          _hover={{
            bg: 'brand.400',
            color: 'white',
          }}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              as={icon}
            />
          )}
          {children}
        </Flex>
      )}
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <Box
      transition="3s ease"
      bg="bg.900"
      borderRight="1px"
      borderRightColor="gray.700"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="brand.500">
          Audical
        </Text>
      </Flex>
      <VStack spacing={2} align="stretch">
        <SidebarItem icon={FiHome} to="/">Dashboard</SidebarItem>
        <SidebarItem icon={FiBox} to="/equipment">Equipment</SidebarItem>
        <SidebarItem icon={FiMessageSquare} to="/inquiries">Inquiries</SidebarItem>
        <SidebarItem icon={FiShoppingCart} to="/orders">Orders</SidebarItem>
        <SidebarItem icon={FiUsers} to="/users">Users</SidebarItem>
        <SidebarItem icon={FiSettings} to="/settings">Settings</SidebarItem>
      </VStack>
    </Box>
  );
};

export default Sidebar;
