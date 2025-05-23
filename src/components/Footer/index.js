import React from 'react';
import { Box, Text, Container, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box as="footer" bg={bgColor} py={6} mt="auto">
      <Container maxW="container.xl">
        <Text textAlign="center" color={textColor} fontSize="sm">
          © {new Date().getFullYear()} CRUD de Usuários com Supabase. Todos os direitos reservados.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
