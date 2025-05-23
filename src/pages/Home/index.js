import React from 'react';
import { Container, Heading, Text, VStack, Button, Box, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Home = () => {
    const { isAuthenticated, profile } = useAuth();

    // Cores personalizadas
    const bgColor = useColorModeValue('#ffffff', '#5c4033'); // fundo geral
    const cardBg = useColorModeValue('#001f3f', '#c61f00'); // fundo dos cards
    const textColor = useColorModeValue('#ffffff', '#ffffff'); // textos

    return (
        <Box
            minH="100vh"
            display="flex"
            flexDirection="column"
            bg={bgColor}
            backgroundImage="url('https://videos.openai.com/vg-assets/assets%2Ftask_01jvz4m02sfjnb2gj4jh10bpve%2F1748023068_img_1.webp?st=2025-05-23T16%3A55%3A44Z&se=2025-05-29T17%3A55%3A44Z&sks=b&skt=2025-05-23T16%3A55%3A44Z&ske=2025-05-29T17%3A55%3A44Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=NyTD3RIKuxFQlXhKjPsn9F33W8tsQg4wfcraSrZSynw%3D&az=oaivgprodscus')" // coloque o caminho da imagem aqui
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
        >
            <Header />

            <Container maxW="container.md" py={10} flex="1">
                <VStack spacing={8} textAlign="center" color={textColor}>
                    <Heading as="h1" size="2xl">
                        Plataforma de Gestão de Equipes
                    </Heading>

                    <Text fontSize="xl">
                        Solução completa para organização de times, tarefas, funções e cronogramas em um só lugar.
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
                                Acesse seu perfil ou gerencie os membros da equipe com facilidade e agilidade.
                            </Text>
                            <VStack spacing={4}>
                                <Button as={RouterLink} to="/profile" bg="#5c4033" color="white" _hover={{ bg: '#ffffff' }} size="lg" width="full">
                                    Meu Perfil
                                </Button>
                                <Button as={RouterLink} to="/users" bg="#d7ccc8" color="#5c4033" _hover={{ bg: '#013b70' }} size="lg" width="full">
                                    Gerenciar Usuários
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

                            <VStack spacing={3}>
                                <Button as={RouterLink} to="/login" bg="#013B70FF" color="013B70FF" _hover={{ bg: '#013B70FF' }} size="lg" width="full">
                                    Login
                                </Button>
                                <Button as={RouterLink} to="/register" bg="#FFFFFFFF" color="#013B70FF" _hover={{ bg: '#FFFFFFFF' }} size="lg" width="full">
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
