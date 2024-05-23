import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../../components/Buttons/Button';
import { Input } from '../../../components/Inputs/Input';
import { TextButton } from '../../../components/Buttons/TextButton';
import {RegisterScreenProps} from '../../../@types/screens';
import {
  AppName,
  Container,
  Content,
  Form,
  Text,
  TextContainer,
  Title,
} from './styles';
import Toast from 'react-native-toast-message';
import {useMutation} from 'react-query';
import {api} from '../../../services/api';
import {useAuth} from '../../../contexts/auth';
import {Platform} from 'react-native';

type IRegisterData = {username: string; email: string; password: string};

export const Register: React.FC<RegisterScreenProps> = ({navigation}) => {
  const {signIn} = useAuth();
  const handleNavigateToLogin = () => navigation.navigate('Login');

  const registerMutation = useMutation(
    (data: IRegisterData) => api.post('/users', data),
    {
      onSuccess: async (data, variables, context) => {
        const login = {username: variables.email, password: variables.password};
        await signIn(login);
      },
      onError: (error: any, variables, context) => {
        console.error(error, variables, context);
        Toast.show({
          type: 'error',
          text1: 'Ocorreu um erro',
          text2: error.response.data.message,
          position: 'bottom',
        });
      },
    },
  );

  const onSubmit = async (data: any) => {
    registerMutation.mutate(data);
  };

  const schema = yup
    .object({
      username: yup.string().required('Campo obrigatório.'),
      email: yup
        .string()
        .email('Campo deve ser um email valido.')
        .required('Campo obrigatório.'),
      password: yup
        .string()
        .min(6, 'Senha deve conter no minimo 6 digitos')
        .required('Campo obrigatório.'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), ''], 'Senhas devem ser iguais.'),
    })
    .required();

  const {
    control,
    register,
    handleSubmit,
    formState: {errors, touchedFields},
  } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <AppName>inLocco</AppName>
      <Content>
        <Form behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Title>Crie sua conta</Title>
          <Input
            register={register('username')}
            name="username"
            placeholder="seu nome de usuario"
            control={control}
            title="Usuário"
            autoCapitalize="none"
            errors={errors.username}
            touched={touchedFields.username}
          />
          <Input
            register={register('email')}
            name="email"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="mail@mail.com"
            title="Email"
            control={control}
            errors={errors.email}
            touched={touchedFields.email}
          />
          <Input
            register={register('password')}
            name="password"
            title="Senha"
            placeholder="*******"
            secureTextEntry
            control={control}
            errors={errors.password}
            touched={touchedFields.password}
          />

          <Button title="Cadastrar" onPress={handleSubmit(onSubmit)} />
        </Form>

        <TextContainer>
          <Text>Já tem uma conta?</Text>
          <TextButton title=" Entre" onPress={handleNavigateToLogin} />
        </TextContainer>
      </Content>
    </Container>
  );
};
