import React, {useState} from 'react';
import {Container, Photo} from './styles';
import {Button} from '../Buttons/Button';

export const PhotoPicker: React.FC = () => {
  const [photo, setPhoto] = useState(null);

  const selectPhoto = () => {
    const options = {
      title: 'Selecione uma foto',
      mediaType: 'photo',
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  };

  return (
    <Container>
      {photo && <Photo source={{uri: photo}} />}
      <Button title="Selecionar foto" onPress={selectPhoto} />
    </Container>
  );
};
