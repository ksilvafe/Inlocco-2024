import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  ActionsContainer,
  Container,
  Content,
  Form,
  Name,
  ScreenTitle,
} from './styles';
import { HorizntalInput } from '../../../components/Inputs/HorizntalInput';
import { ProfilePicture } from '../../../components/Inputs/ProfilePicture';
import { TextButton } from '../../../components/Buttons/TextButton';
import {EditProfileScreenProps} from '../../../@types/screens';
import Toast from 'react-native-toast-message';
import {ActivityIndicator, Platform} from 'react-native';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {HOST, api} from '../../../services/api';
import {IProfile} from '../../../@types/api';
import {useAuth} from '../../../contexts/auth';

export const EditProfile: React.FC<EditProfileScreenProps> = ({navigation}) => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const editProfileMutation = useMutation(
    (formData: globalThis.FormData) =>
      api.put('/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries({queryKey: ['profile']});
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Usuario atualizado com sucesso!',
          position: 'top',
        });
        navigation.navigate('Profile', {userCuid: user?.user.cuid});
      },
      onError: (e, variables, context) => {
        console.error(e, variables, context);
        Toast.show({
          type: 'error',
          text1: 'Ocorreu um erro',
          text2: e.response.data.message,
          position: 'bottom',
        });
      },
    },
  );

  const {isLoading, isError, data, error} = useQuery<IProfile>('profile');

  const handleClose = () => {
    navigation.navigate('Profile', {userCuid: user?.user.cuid});
  };

  const handleSave = values => {
    const formData = new FormData();
    const photoData = {
      uri: values.picture.uri,
      type: values.picture.type, // ou 'image/png' ou o tipo correto da imagem
      name: values.picture.fileName,
    };
    values.picture && formData.append('picture', photoData);
    values.name && formData.append('name', values.name);
    values.email && formData.append('email', values.email);
    values.password && formData.append('password', values.password);
    values.username && formData.append('username', values.username);
    values.link && formData.append('link', values.link);
    values.biography && formData.append('biography', values.biography);
    values.phone && formData.append('phone', values.phone);
    values.city && formData.append('city', values.city);

    editProfileMutation.mutate(formData);
  };

  const schema = yup
    .object({
      picture: yup.object(),
      name: yup.string(),
      email: yup
        .string()
        .email('Campo deve ser um email valido.')
        .required('Campo obrigatório.'),
      password: yup.string(),
      username: yup.string().required('Campo obrigatório.'),
      link: yup.string(),
      biography: yup.string(),
      phone: yup.string(),
      city: yup.string(),
    })
    .required();

  const {
    control,
    register,
    handleSubmit,
    formState: {errors, touchedFields},
  } = useForm({
    defaultValues: {
      picture: data?.profile.picture,
      name: data?.profile?.name,
      email: data?.email,
      password: '',
      username: data?.username,
      link: data?.profile?.link,
      biography: data?.profile?.biography,
      phone: data?.profile?.phone,
      city: data?.address?.city,
    },
    resolver: yupResolver(schema),
  });

  if (isError) {
    Toast.show({
      type: 'error',
      text1: 'Ocorreu um erro',
      text2: error.response.data.message,
      position: 'bottom',
    });
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Container>
      <Content>
        <ActionsContainer>
          <Icon name="close" size={20} onPress={handleClose} />
          <ScreenTitle>Editar Perfil</ScreenTitle>
          <TextButton title="Salvar" onPress={handleSubmit(handleSave)} />
        </ActionsContainer>
        <Form behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
          <ProfilePicture
            picture={data?.profile.picture}
            control={control}
            errors={errors.picture}
            touched={touchedFields.picture}
            name="picture"
            register={register('picture')}
          />
          <HorizntalInput
            title="Name"
            placeholder="Nome Sobrenome"
            control={control}
            errors={errors.name}
            touched={touchedFields.name}
            name="name"
            register={register('name')}
          />
          <HorizntalInput
            title="Email"
            placeholder="email@mail.com"
            control={control}
            errors={errors.email}
            touched={touchedFields.email}
            name="email"
            register={register('email')}
          />
          <HorizntalInput
            title="Senha"
            placeholder="***********"
            control={control}
            errors={errors.password}
            touched={touchedFields.password}
            name="password"
            register={register('password')}
          />
          <HorizntalInput
            title="Usuário"
            control={control}
            errors={errors.username}
            touched={touchedFields.username}
            name="username"
            register={register('username')}
          />
          <HorizntalInput
            title="Link"
            placeholder="inlocco.com.br"
            control={control}
            errors={errors.link}
            touched={touchedFields.link}
            name="link"
            register={register('link')}
          />
          <HorizntalInput
            title="Sobre"
            multiline
            numberOfLines={3}
            placeholder="Sobre você"
            control={control}
            errors={errors.biography}
            touched={touchedFields.biography}
            name="biography"
            register={register('biography')}
          />
          <HorizntalInput
            title="Telefone"
            placeholder="+55"
            control={control}
            errors={errors.phone}
            touched={touchedFields.phone}
            name="phone"
            register={register('phone')}
          />
          <HorizntalInput
            title="Cidade"
            placeholder="Onde você mora?"
            control={control}
            errors={errors.city}
            touched={touchedFields.city}
            name="city"
            register={register('city')}
          />
        </Form>
      </Content>
    </Container>
  );
};
