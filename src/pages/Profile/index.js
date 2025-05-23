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
      <Box
          minH="100vh"
          display="flex"
          flexDirection="column"
          bgImage="url('https://videos.openai.com/vg-assets/assets%2Ftask_01jvza04jvfjebm9km2cqzbwze%2F1748028681_img_1.webp?st=2025-05-23T18%3A28%3A36Z&se=2025-05-29T19%3A28%3A36Z&sks=b&skt=2025-05-23T18%3A28%3A36Z&ske=2025-05-29T19%3A28%3A36Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=N0%2FJIk5e7LmbYiFmLH8n7e%2Bh%2BfEaFRQIjt1%2BlKaR3C0%3D&az=oaivgprodscus')"
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
      >

      <Header />
      
      <Container maxW="container.md" py={10} flex="1">
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" mb={4} color={"#FFFFFF"}>
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
                   Atenção!
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
