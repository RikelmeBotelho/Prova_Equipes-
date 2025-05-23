import React from 'react';
import { Box, Flex, Heading, Button, useColorModeValue, Container } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  const bgColor = useColorModeValue('#ffffff', '#001f3f'); // marrom escuro / branco
  const borderColor = useColorModeValue('#ffffff', '#f6e6e2'); // borda mais escura / marrom claro
  const textColor = useColorModeValue('#001f3f', '#5c4033'); // branco / marrom escuro

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
          opacity={1.0}  // << aqui: 0 = invisível, 1 = totalmente visível
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="md" color={textColor}>
              <RouterLink to="/">GestorPro</RouterLink>
            </Heading>

            <Flex gap={4}>
              {isAuthenticated ? (
                  <>
                    <Button as={RouterLink} to="/profile" variant="ghost" color={textColor} _hover={{ bg: '#013b70' }}>
                      Meu Perfil
                    </Button>
                    <Button as={RouterLink} to="/users" variant="ghost" color={textColor} _hover={{ bg: '#013b70' }}>
                      Usuários
                    </Button>
                    <Button onClick={handleLogout} variant="outline" color={textColor} borderColor={textColor} _hover={{ bg: '#d62a2a' }}>
                      Sair
                    </Button>
                  </>
              ) : (
                  <>
                    <Button as={RouterLink} to="/login" bg="#001F3FFF" variant="ghost" color="#ffffff" _hover={{ bg: '#013B70FF' }}>
                      Login
                    </Button>
                    <Button as={RouterLink} to="/register" bg="#001F3FFF" color="#ffffff" _hover={{ bg: '#013B70FF' }}>
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
