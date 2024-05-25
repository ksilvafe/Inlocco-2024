import {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
// import {
//   useCameraDevice,
//   Camera as RNCamera,
//   useCameraPermission,
//   useMicrophonePermission,
//   PhotoFile,
// } from 'react-native-vision-camera';
import {
  Button as TButton,
  H1,
  YStack,
  XStack,
  Image,
  Text,
  Square,
} from 'tamagui';
// import {
//   CameraRoll,
//   PhotoIdentifier,
// } from '@react-native-camera-roll/camera-roll';
import Toast from 'react-native-toast-message';
import { Button } from '../../../../components/Buttons/Button';
import {FileImage} from '@tamagui/lucide-icons';
import React from 'react';

export const Camera: React.FC<{ navigation: any }> = ({navigation}) => {
  // const camera = useRef<RNCamera>(null);
  // const {
  //   hasPermission: hasCameraPermission,
  //   requestPermission: requestCameraPermission,
  // } = useCameraPermission();
  // const {
  //   hasPermission: hasMicrophonePermission,
  //   requestPermission: requestMicrophonePermission,
  // } = useMicrophonePermission();
  // const device = useCameraDevice('back');

  const [firstItemGalery, setFirstItemGalery] = useState<null>();

  // const loadPermissions = () => {
  //   if (!hasCameraPermission) {
  //     requestCameraPermission();
  //   }
  //   if (!hasMicrophonePermission) {
  //     requestMicrophonePermission();
  //   }
  // };
  // useEffect(() => {
  //   //const devices = RNCamera.getAvailableCameraDevices();
  //   loadPermissions();

  //   CameraRoll.getPhotos({
  //     first: 1,
  //     assetType: 'Photos',
  //   })
  //     .then(r => {
  //       setFirstItemGalery(r.edges[0]);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }, []);

  if (null == null) {
    return (
      <SafeAreaView>
        <YStack m={10} gap={10}>
          <H1 p={10}>Nenhum dispositivo de camera encontrado.</H1>
          <Button
            title="Ir para galeria"
            onPress={() => navigation.navigate('SelectedMedia')}
          />
          <TButton
            color={'$primary'}
            backgroundColor={'$secondary'}
            onPress={() => navigation.goBack()}>
            Voltar
          </TButton>
        </YStack>
      </SafeAreaView>
    );
  }

  const handleNavigateToContinueTrip = (selectedMedia: any[]) =>
    navigation.navigate('ContinueTrip', {
      selectedMedia,
    });

  const handleNavigateSelectMedia = () => navigation.navigate('SelectedMedia');

  const handleNavigateSavedTrip = () => navigation.navigate('SavedTrip');

  const savePhotoOnCameraRoll = async (file: any) => {
    // await CameraRoll.save(`file://${file.path}`, {
    //   type: 'photo',
    // });
  };

  const takePhotos = async () => {
    // if (camera.current !== null) {
    //   const file = await camera.current.takePhoto();
    //   await savePhotoOnCameraRoll(file);

    //   CameraRoll.getPhotos({
    //     first: 1,
    //     assetType: 'Photos',
    //   })
    //     .then(r => {
    //       handleNavigateToContinueTrip([r.edges[0]]);
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });
    // } else {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Ocorreu um erro',
    //     text2: 'Nao foi possivel conectar com o seu dispositivo de camera',
    //     position: 'bottom',
    //   });
    // }
  };

  return (
    <YStack f={1}>
      {/* <RNCamera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        photo
      /> */}
      <XStack
        position={'absolute'}
        bottom={0}
        h={120}
        w={'100%'}
        bg={'$primary'}
        jc="space-around"
        ai={'center'}>
        <TouchableOpacity onPress={handleNavigateSavedTrip}>
          <YStack jc={'center'} ai={'center'} gap={'$1'}>
            <Square
              size={45}
              backgroundColor="white"
              elevation="$4"
              borderRadius={'$2'}>
              <FileImage size="$3" color={'gray'} />
            </Square>
            <Text color={'white'}> Arquivos</Text>
          </YStack>
        </TouchableOpacity>

        <TButton
          alignSelf="center"
          size="$7"
          circular
          borderColor={'$primary'}
          borderWidth={'$1.5'}
          onPress={takePhotos.bind(this)}
        />

        <TouchableOpacity onPress={handleNavigateSelectMedia}>
          <YStack jc={'center'} ai={'center'} gap={'$1'}>
            <Image
              borderRadius={'$2'}
              backgroundColor={'$background'}
              source={{
                uri: firstItemGalery?.node.image.uri,
                width: 45,
                height: 45,
              }}
            />
            <Text color={'white'}>Galeria</Text>
          </YStack>
        </TouchableOpacity>
      </XStack>
    </YStack>
  );
};
