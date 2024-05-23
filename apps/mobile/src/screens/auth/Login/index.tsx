import React from 'react';
import {useForm} from 'react-hook-form';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import {Text, XStack, YStack} from 'tamagui';

// Types
import {LoginScreenProps} from '../../../@types/screens';
//  Components
import { Button } from '../../../components/Buttons/Button';
import { Input } from '../../../components/Inputs/Input';
import { TextButton } from '../../../components/Buttons/TextButton';

// Hooks
import {yupResolver} from '@hookform/resolvers/yup';
import {useAuth} from '../../../contexts/auth';

// Styles
import {theme} from '../../../styles/themes';
import { Content, Container } from './styles';
import {version} from '../../../../package.json';
import {Platform} from 'react-native';

export const Login: React.FC<LoginScreenProps> = ({navigation}) => {
  const {signIn, loading, error} = useAuth();
  const schema = yup
    .object({
      username: yup
        .string()
        .email('Campo deve ser um email valido.')
        .required('Campo obrigatório.'),
      password: yup.string().required('Campo obrigatório.'),
    })
    .required();

  const handleNavigateToRegister = () => navigation.navigate('Register');

  const onSubmit = async (data: any) => {
    await signIn(data);
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Ocorreu um erro',
        text2: error.response.data.message,
        position: 'bottom',
      });
    }
  };

  const {
    control,
    register,
    handleSubmit,
    formState: {errors, touchedFields},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <Text
        mt={'$5'}
        als={'center'}
        color="$secondary"
        fontWeight={'bold'}
        fontSize={'$10'}>
        inLocco
      </Text>
      <Content behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text als={'center'} fontSize={'$8'} mt={'$5'}>
          Acessar sua conta
        </Text>
        <YStack mb={'$5'}>
          <Input
            register={register('username')}
            title="Usuário"
            name="username"
            iconName="at"
            placeholder="email@mail.com"
            autoCapitalize="none"
            control={control}
            errors={errors.username}
            touched={touchedFields.username}
          />
          <Input
            register={register('password')}
            title="Senha"
            name="password"
            iconName="lock"
            placeholder="********"
            secureTextEntry
            control={control}
            errors={errors.password}
            touched={touchedFields.password}
          />

          <Button
            title="Entrar"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          />
        </YStack>

        <XStack justifyContent={'center'}>
          <Text>Ainda nao tem uma conta?</Text>
          <TextButton
            colorText={theme.colors.primary}
            weightText={600}
            title=" Cadastre-se"
            onPress={handleNavigateToRegister}
          />
        </XStack>
        <Text als={'center'} fontSize={'$2'} mb={'$3'}>
          v{version}
        </Text>
      </Content>
    </Container>
  );
};
