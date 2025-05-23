import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Heading, 
  Box, 
  Alert, 
  AlertIcon, 
  useColorModeValue, 
  VStack, 
  Spinner, 
  Center, 
  useToast, 
  Button, 
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UserForm from '../../components/UserForm';

const Profile = () => {
  const { profile, updateProfile, deleteAccount, loading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState('');
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {
    // Redirecionar para login se não estiver autenticado
    if (!loading && !profile) {
      navigate('/login');
    }
  }, [profile, loading, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { success, error } = await updateProfile({
        nome: values.nome,
        idade: parseInt(values.idade),
        descricao: values.descricao
      });

      if (success) {
        toast({
          title: 'Perfil atualizado',
          description: 'Suas informações foram atualizadas com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        setError(error || 'Erro ao atualizar perfil. Tente novamente.');
      }
    } catch (err) {
      setError(err.message || 'Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const { success, error } = await deleteAccount();
      
      if (success) {
        toast({
          title: 'Conta excluída',
          description: 'Sua conta foi excluída com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/');
      } else {
        setError(error || 'Erro ao excluir conta. Tente novamente.');
      }
    } catch (err) {
      setError(err.message || 'Erro ao excluir conta. Tente novamente.');
    } finally {
      onClose();
    }
  };

  if (loading) {
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
      
      <Container maxW="container.md" py={10} flex="1">
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" mb={4}>
            Meu Perfil
          </Heading>
          
          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}
          
          {profile && (
            <>
              <UserForm 
                initialValues={{
                  nome: profile.nome,
                  idade: profile.idade,
                  descricao: profile.descricao,
                  email: profile.email
                }}
                onSubmit={handleSubmit}
                isRegister={false}
              />
              
              <Box mt={8} p={6} borderWidth="1px" borderRadius="lg" bg={cardBg}>
                <VStack spacing={4} align="stretch">
                  <Heading as="h3" size="md" color="red.500">
                    Zona de Perigo
                  </Heading>
                  <Text>
                    Ao excluir sua conta, todos os seus dados serão permanentemente removidos e não poderão ser recuperados.
                  </Text>
                  <Button colorScheme="red" onClick={onOpen}>
                    Excluir Minha Conta
                  </Button>
                </VStack>
              </Box>
            </>
          )}
        </VStack>
      </Container>
      
      <Footer />
      
      {/* Diálogo de confirmação para exclusão de conta */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir Conta
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza? Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente excluídos.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDeleteAccount} ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Profile;
