import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';
import { SelectedMediaScreenProps } from '../../../../@types/screens';
import { ListTagInput } from '../../../../components/Inputs/ListTagInput';
import { TextArea } from '../../../../components/Inputs/TextArea';

// import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {ActivityIndicator, Alert, View} from 'react-native';
import {Image} from 'react-native-compressor';
import Toast from 'react-native-toast-message';
import {useMutation, useQueryClient} from 'react-query';
import { api } from '../../../../services/api';
import {
  ActionsContainer,
  Container,
  Content,
  ListSelectedMedia,
  Localization,
  Photo,
  PhotoContainer,
  Preview,
  ScreenTitle,
  Title,
} from './styles';

interface FormData {
  fields: {
    description: string;
    travelers: {cuid: string}[];
    propose: {username: string}[];
    period: string;
    location: [
      {
        lat: number;
        lng: number;
        country: string;
        city: string;
      },
    ];
    photo: {
      node: {
        image: {
          extension: string;
          uri: string;
          filename: string;
        };
        type: string;
        location: {
          latitude: number;
          longitude: number;
        };
      };
    };
  }[];
}

export const PreviewImageAndAddInformation: React.FC<SelectedMediaScreenProps> = ({
  navigation,
  route,
}) => {
  const queryClient = useQueryClient();
  const {selectedMedia = [], trip} = route.params ?? {};

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const fieldsSchema = yup
    .array()
    .of(
      yup.object().shape({
        photo: yup.object().required('A foto é obrigatória'),
        description: yup.string(),
        traveles: yup.array().of(yup.number()),
        objective: yup.array().of(yup.string()),
        date: yup.string(),
        location: yup.array().of(yup.object()),
        tripCuid: yup.string(),
      }),
    )
    .required();

  const schema = yup.object().shape({fields: fieldsSchema}).required();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: {errors, touchedFields},
  } = useForm({
    defaultValues: {
      fields: selectedMedia?.map((item: any) => {
        return {
          photo: item,
          travelers: [],
          location: [],
        };
      }),
    },
    resolver: yupResolver(schema),
  });

  const {fields} = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'fields', // unique name for your Field Array
  });

  const createPostMutation = useMutation(
    (formData: globalThis.FormData) =>
      api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries({queryKey: ['feed']});
        navigation.popToTop();
        navigation.navigate('FeedTopTabScreen');
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Postagem realizada com sucesso',
          position: 'top',
        });
      },
      onError: (e: any) => {
        navigation.navigate('FeedTopTabScreen');
        Toast.show({
          type: 'error',
          text1: 'Ocorreu um erro',
          text2: 'Não foi possivel realizar a sua publicação',
          position: 'top',
        });
        console.error('Erro ao enviar a foto:', e.response.data.message);
      },
    },
  );

  const updateTripMutation = useMutation(
    ({tripCuid, formData}) => api.put(`/trips/${tripCuid}`, formData),
    {
      onError: (e: any) => {
        Toast.show({
          type: 'error',
          text1: 'Ocorreu um erro',
          text2: 'Não foi possivel realizar a sua viagem',
          position: 'top',
        });
        console.error('Erro ao atualizar viagem:', e.response.data.message);
      },
    },
  );

  const {mutate, isError, error, isLoading} = useMutation(
    ({lat, lng}: {lat: number; lng: number}) =>
      api.get(`/locations/reverse?lat=${lat}&lng=${lng}`),
    {
      onSuccess: async (data, variables, context) => {
        const location = {
          ...data.data,
          coordinates: [data.data.lat, data.data.lng],
        };
        delete location.lng;
        delete location.lat;
        setValue(`fields[${currentIndex}].location`, [location]);
      },
      onError: (e: any, variables, context) => {
        console.error(e.response.data.message);
      },
    },
  );

  const processField = async file => {
    const res = await Image.compress(file);
    return res;
  };

  const onSubmit = async (data: FormData, publish: boolean) => {
    data.fields.forEach(field => {
      //console.log(
      // 'URI',
      //  `${field.photo.node.image.uri}/${field.photo.node.image.filename}`,
      //);
      //const result = processField(
      //  `${field.photo.node.image.uri}${field.photo.node.image.extension}`,
      //);
      //console.log(result);

      const formData = new FormData();

      const photoFileName = field.photo.node.image.uri.split('/').pop();
      const photoData = {
        uri: field.photo.node.image.uri,
        type: `${field.photo.node.type}`, // ou 'image/png' ou o tipo correto da imagem
        name: field.photo.node.image.filename
          ? `${field.photo.node.image.filename}`
          : photoFileName,
      };
      formData.append('photos', photoData);
      //formData.append('status', 'PUBLISHED');
      field.description && formData.append('description', field.description);
      /* field.travelers.length > 0 &&
        formData.append(
          'travelers',
          field.travelers.map(traveler => traveler?.cuid),
        );
      field.propose.length > 0 &&
        formData.append(
          'propose',
          field.propose.map(propose => propose?.username),
        );
      field.period && formData.append('period', field.period); */

      const location = field.location[0];
      location && formData.append('location', JSON.stringify(location));

      formData.append('tripCuid', trip.cuid);
      createPostMutation.mutate(formData);
      //console.log(formData._parts);
      /*       if (trip) {
        updateTripMutation.mutate({tripCuid: trip.cuid, formData: formData});
      } else {
        createPostMutation.mutate(formData);
      } */
    });
  };

  const handleBefore = () => {
    navigation.goBack();
  };

  const handlePressPhotoItem = (item: any, index: number) => {
    setCurrentIndex(index);
  };

  const createPublushOptionAlert = (data: FormData) =>
    Alert.alert(
      'Nova Publicação',
      'Sua publicação está pronta? se desejar, pode deixar a publicação salva em rascunhos para finalizar depois',
      [
        {
          text: 'Cancelar',
          onPress: () => console.info('Ask me later pressed'),
          style: 'cancel',
        },
        {
          text: 'Rascunho',
          onPress: () => onSubmit(data, false),
        },
        {text: 'Publicar', onPress: () => onSubmit(data, true)},
      ],
    );

  if (createPostMutation.isError) {
    Toast.show({
      type: 'error',
      text1: 'Ocorreu um erro',
      text2: createPostMutation.error.response.data.message,
      position: 'bottom',
    });
  }

  useEffect(() => {
    if (selectedMedia[currentIndex]?.node?.location) {
      mutate({
        lat: selectedMedia[currentIndex]?.node?.location?.latitude,
        lng: selectedMedia[currentIndex]?.node?.location?.longitude,
      });
    }
  }, [currentIndex]);

  if (isLoading || createPostMutation.isLoading) {
    return (
      <Content>
        <ActivityIndicator color={'red'} />
      </Content>
    );
  }

  return (
    <Container>
      <Content>
        <ActionsContainer>
          <Icon name="chevron-left" size={30} onPress={handleBefore} />
          <ScreenTitle>Nova viagem</ScreenTitle>
          <Icon
            name="chevron-right"
            size={30}
            onPress={handleSubmit(createPublushOptionAlert)}
          />
        </ActionsContainer>
        <Preview
          source={{
            uri: selectedMedia[currentIndex]?.node.image.uri,
          }}
        />
        <ListSelectedMedia
          data={selectedMedia}
          horizontal
          renderItem={({item, index}) => (
            <PhotoContainer onPress={() => handlePressPhotoItem(item, index)}>
              <Photo
                source={{
                  uri: item?.node.image.uri,
                }}
              />
            </PhotoContainer>
          )}
          keyExtractor={(item: any) => String(item.node.image.uri)}
        />

        <Title>{trip?.title}</Title>
        {trip?.updatedAt && (
          <Localization>
            {Intl.DateTimeFormat('pt-BR', {
              year: 'numeric',
            }).format(new Date(trip?.updatedAt as string))}
          </Localization>
        )}
        {fields.map((field, index) => {
          if (index === currentIndex) {
            return (
              <View key={field.id}>
                <TextArea
                  title={'Descricao'}
                  placeholder="Conte-nos sobre sua viagem..."
                  multiline
                  control={control}
                  name={`fields[${index}].description` as const}
                  errors={errors.fields && errors.fields[index]?.description}
                  touched={
                    touchedFields.fields &&
                    touchedFields.fields[index]?.description
                  }
                  register={register}
                />
                {/* <ListTagInput
                  title="Viajantes"
                  control={control}
                  name={`fields[${index}].travelers` as const}
                  errors={errors.fields && errors.fields[index]?.travelers}
                  touched={
                    touchedFields.fields &&
                    touchedFields.fields[index]?.travelers
                  }
                  register={register}
                  type={'travelers'}
                />
                <ListTagInput
                  title="Objetivo"
                  control={control}
                  name={`fields[${index}].propose` as const}
                  errors={errors.fields && errors.fields[index]?.propose}
                  touched={
                    touchedFields.fields && touchedFields.fields[index]?.propose
                  }
                  register={register}
                />
                <PeriodInput
                  title="Periodo"
                  control={control}
                  name={`fields[${index}].period` as const}
                  errors={errors.fields && errors.fields[index]?.period}
                  touched={
                    touchedFields.fields && touchedFields.fields[index]?.period
                  }
                  register={register}
                />
*/}
                <ListTagInput
                  title="Localização"
                  placeholder="Onde essa foto foi tirada?"
                  control={control}
                  type="location"
                  name={`fields[${index}].location` as const}
                  register={register}
                  errors={errors.fields && errors.fields[index]?.location}
                  touched={
                    touchedFields.fields &&
                    touchedFields.fields[index]?.location
                  }
                />
              </View>
            );
          }
        })}
      </Content>
    </Container>
  );
};