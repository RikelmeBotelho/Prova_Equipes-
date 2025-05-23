import React from 'react';
import { Box, Heading, Text, Avatar, Badge, useColorModeValue } from '@chakra-ui/react';

const UserCard = ({ user }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      p={5} 
      bg={bgColor}
      borderColor={borderColor}
      boxShadow="sm"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'md' }}
    >
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar 
          name={user.nome} 
          size="md" 
          mr={4} 
          bg="blue.500"
        />
        <Box>
          <Heading as="h3" size="md">{user.nome}</Heading>
          <Text fontSize="sm" color="gray.500">{user.email}</Text>
        </Box>
      </Box>

      <Box>
        <Badge colorScheme="blue" mb={2}>{user.idade} anos</Badge>
        <Text noOfLines={3}>{user.descricao || 'Sem descrição'}</Text>
      </Box>
    </Box>
  );
};

export default UserCard;
