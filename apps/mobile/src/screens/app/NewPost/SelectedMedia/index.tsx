import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SelectedMediaScreenProps } from '../../../../@types/screens';
import {
  ActionsContainer,
  Container,
  Content,
  GaleryItem,
  GaleryItemContainer,
  GaleryItemMark,
  ListGalery,
  ListSelectedMedia,
  Photo,
  ScreenTitle,
  Title,
} from './styles';
export const SelectedMedia: React.FC<SelectedMediaScreenProps> = ({
  navigation,
  route,
}) => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<PhotoIdentifier[]>([]);

  const handleClose = () => {
    navigation.navigate('Camera');
  };

  const handleNavigateToContinueTrip = () =>
    navigation.navigate('ContinueTrip', {
      selectedMedia,
    });

  async function hasAndroidPermission() {
    const permission =
      parseInt(Platform.Version as string, 10) >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const handleSelectGaleryItem = (item: PhotoIdentifier) => {
    let arr = [...selectedMedia];
    if (arr.includes(item)) {
      arr = arr.filter(arrItem => arrItem !== item);
    } else {
      arr.push(item);
    }
    setSelectedMedia(arr);
  };

  const renderItem = ({item}: {item: PhotoIdentifier}) => {
    const isSelected = selectedMedia.includes(item);
    return (
      <GaleryItemContainer onPress={() => handleSelectGaleryItem(item)}>
        <GaleryItem
          isSelected={isSelected}
          source={{
            uri: item.node.image.uri,
          }}
        />
        {isSelected && <GaleryItemMark />}
      </GaleryItemContainer>
    );
  };

  const loadPhotos = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      console.log('Permission denied', hasAndroidPermission());
      return;
    }
    CameraRoll.getPhotos({
      first: 1000,
      assetType: 'Photos',
    })
      .then(r => {
        setPhotos(r.edges);
        setSelectedMedia([r.edges[0]]);
      })
      .catch(err => {
        //Error Loading Images
      });
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <Container>
      <Content>
        <ActionsContainer>
          <Icon name="close" size={30} onPress={handleClose} />
          <ScreenTitle>Nova Publicação</ScreenTitle>
          <Icon
            name="chevron-right"
            size={30}
            onPress={handleNavigateToContinueTrip}
          />
        </ActionsContainer>
        <ListSelectedMedia
          ListEmptyComponent={
            <Photo
              source={{
                uri: photos[0]?.node.image.uri,
              }}
            />
          }
          data={selectedMedia}
          horizontal
          renderItem={({item}) => (
            <Photo
              source={{
                uri: item?.node.image.uri,
              }}
            />
          )}
          keyExtractor={(item: PhotoIdentifier) => String(item.node.image.uri)}
        />

        <ListGalery
          ListEmptyComponent={<></>}
          ListHeaderComponent={<Title>Selecionar</Title>}
          data={photos}
          renderItem={renderItem}
          keyExtractor={(item: PhotoIdentifier) => String(item.node.image.uri)}
        />
      </Content>
    </Container>
  );
};