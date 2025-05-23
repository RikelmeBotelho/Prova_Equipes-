import React, { useState } from 'react';
import { Container, Heading, Box, Alert, AlertIcon, useColorModeValue, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UserForm from '../../components/UserForm';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { success, error } = await register(
        values.email, 
        values.password, 
        {
          nome: values.nome,
          idade: parseInt(values.idade),
          descricao: values.descricao
        }
      );

      if (success) {
        navigate('/profile');
      } else {
        setError(error || 'Erro ao registrar. Tente novamente.');
      }
    } catch (err) {
      setError(err.message || 'Erro ao registrar. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <Box
          minH="100vh"
          display="flex"
          flexDirection="column"
          bg={bgColor}
          backgroundColor={'background: #03376b;\n' +
              'background: linear-gradient(181deg, rgba(0, 31, 63, 1) 20%, rgba(1, 67, 133, 1) 84%);'} c
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
      >
      <Header />
      
      <Container maxW="container.md" py={10} flex="1">
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" mb={4} color="#FFFFFF">
            Novo por aqui? Crie uma nova Conta
          </Heading>
          
          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}
          
          <UserForm 
            onSubmit={handleSubmit} 
            isRegister={true}
          />
        </VStack>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default Register;
