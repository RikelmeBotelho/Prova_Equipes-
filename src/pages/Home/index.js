import React from 'react';
import { Container, Heading, Text, VStack, Button, Box, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Home = () => {
  const { isAuthenticated, profile } = useAuth();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg={bgColor}>
      <Header />
      
      <Container maxW="container.md" py={10} flex="1">
        <VStack spacing={8} textAlign="center">
          <Heading as="h1" size="2xl">
            CRUD de Usuários com Supabase
          </Heading>
          
          <Text fontSize="xl" color="gray.600">
            Sistema completo para gerenciamento de usuários com autenticação e perfis.
          </Text>
          
          {isAuthenticated ? (
            <Box 
              p={8} 
              borderRadius="lg" 
              bg={cardBg} 
              boxShadow="md" 
              width="100%"
              textAlign="center"
            >
              <Heading as="h2" size="lg" mb={4}>
                Bem-vindo, {profile?.nome || 'Usuário'}!
              </Heading>
              <Text mb={6}>
                Você está logado no sistema. Acesse seu perfil ou veja a lista de usuários.
              </Text>
              <VStack spacing={4}>
                <Button as={RouterLink} to="/profile" colorScheme="blue" size="lg" width="full">
                  Meu Perfil
                </Button>
                <Button as={RouterLink} to="/users" colorScheme="teal" size="lg" width="full">
                  Ver Usuários
                </Button>
              </VStack>
            </Box>
          ) : (
            <Box 
              p={8} 
              borderRadius="lg" 
              bg={cardBg} 
              boxShadow="md" 
              width="100%"
              textAlign="center"
            >
              <Heading as="h2" size="lg" mb={4}>
                Comece Agora
              </Heading>
              <Text mb={6}>
                Faça login ou registre-se para acessar todas as funcionalidades do sistema.
              </Text>
              <VStack spacing={4}>
                <Button as={RouterLink} to="/login" colorScheme="blue" size="lg" width="full">
                  Login
                </Button>
                <Button as={RouterLink} to="/register" colorScheme="teal" size="lg" width="full">
                  Registrar
                </Button>
              </VStack>
            </Box>
          )}
        </VStack>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default Home;
