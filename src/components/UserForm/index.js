import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  VStack,
  Box,
  useColorModeValue
} from '@chakra-ui/react';

// Schema de validação para o formulário de usuário - removida validação de formato de email
const UserSchema = Yup.object().shape({
  nome: Yup.string()
    .min(2, 'Nome muito curto')
    .max(50, 'Nome muito longo')
    .required('Nome é obrigatório'),
  idade: Yup.number()
    .min(1, 'Idade deve ser maior que 0')
    .max(120, 'Idade deve ser menor que 120')
    .required('Idade é obrigatória'),
  descricao: Yup.string()
    .max(500, 'Descrição muito longa'),
  email: Yup.string()
    .required('Email é obrigatório'), // Removida validação de formato de email
  password: Yup.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
});

const UserForm = ({ initialValues, onSubmit, isRegister = false }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Valores iniciais padrão
  const defaultValues = {
    nome: '',
    idade: '',
    descricao: '',
    email: '',
    password: ''
  };

  // Mesclar valores iniciais com os padrões
  const formInitialValues = { ...defaultValues, ...initialValues };

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      p={6} 
      bg={bgColor}
      borderColor={borderColor}
      boxShadow="md"
      width="100%"
    >
      <Formik
        initialValues={formInitialValues}
        validationSchema={UserSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <VStack spacing={4} align="flex-start">
              <FormControl isInvalid={errors.nome && touched.nome}>
                <FormLabel htmlFor="nome">Nome</FormLabel>
                <Field
                  as={Input}
                  id="nome"
                  name="nome"
                  type="text"
                  variant="filled"
                  placeholder="Seu nome completo"
                />
                <FormErrorMessage>{errors.nome}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.idade && touched.idade}>
                <FormLabel htmlFor="idade">Idade</FormLabel>
                <Field
                  as={Input}
                  id="idade"
                  name="idade"
                  type="number"
                  variant="filled"
                  placeholder="Sua idade"
                />
                <FormErrorMessage>{errors.idade}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.descricao && touched.descricao}>
                <FormLabel htmlFor="descricao">Descrição</FormLabel>
                <Field
                  as={Textarea}
                  id="descricao"
                  name="descricao"
                  variant="filled"
                  placeholder="Fale um pouco sobre você"
                  resize="vertical"
                />
                <FormErrorMessage>{errors.descricao}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.email && touched.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="text"
                  variant="filled"
                  placeholder="Insira qualquer texto como email"
                  isReadOnly={!isRegister && initialValues?.email}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              {isRegister && (
                <FormControl isInvalid={errors.password && touched.password}>
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    placeholder="Sua senha"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              )}

              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                isLoading={isSubmitting}
                loadingText="Enviando"
              >
                {isRegister ? 'Registrar' : 'Atualizar'}
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UserForm;
