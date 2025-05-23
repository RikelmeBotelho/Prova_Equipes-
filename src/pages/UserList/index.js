import React, { useState, useEffect } from 'react';
import { Container, Heading, Box, Alert, AlertIcon, useColorModeValue, VStack, Spinner, Center, SimpleGrid, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/users';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UserCard from '../../components/UserCard';

const UserList = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  useEffect(() => {
    // Redirecionar para login se não estiver autenticado
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
      return;
    }

    // Buscar lista de usuários
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data, error } = await userService.getAllUsers();
        
        if (error) throw error;
        
        setUsers(data || []);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        setError(err.message || 'Erro ao carregar usuários. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <Box minH="100vh" display="flex" flexDirection="column" bg={bgColor}>
        <Header />
        <Center flex="1">
          <Spinner size="xl" color="blue.500" thickness="4px" />
        </Center>
        <Footer />
      </Box>
    );
  }

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg={bgColor}>
      <Header />
      
      <Container maxW="container.xl" py={10} flex="1">
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" mb={4}>
            Lista de Usuários
          </Heading>
          
          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}
          
          {users.length === 0 ? (
            <Box textAlign="center" py={10}>
              <Text fontSize="xl" color="gray.500">
                Nenhum usuário encontrado.
              </Text>
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {users.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default UserList;
