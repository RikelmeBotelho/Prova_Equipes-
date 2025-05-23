import React from 'react';
import { Box, Flex, Heading, Button, useColorModeValue, Container } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Box 
      as="header" 
      bg={bgColor} 
      borderBottom="1px" 
      borderColor={borderColor} 
      py={4} 
      position="sticky" 
      top={0} 
      zIndex={10}
      boxShadow="sm"
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="md">
            <RouterLink to="/">CRUD de Usuários</RouterLink>
          </Heading>
          
          <Flex gap={4}>
            {isAuthenticated ? (
              <>
                <Button as={RouterLink} to="/profile" variant="ghost" colorScheme="blue">
                  Meu Perfil
                </Button>
                <Button as={RouterLink} to="/users" variant="ghost" colorScheme="blue">
                  Usuários
                </Button>
                <Button onClick={handleLogout} colorScheme="red" variant="outline">
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button as={RouterLink} to="/login" variant="ghost" colorScheme="blue">
                  Login
                </Button>
                <Button as={RouterLink} to="/register" colorScheme="blue">
                  Registrar
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
