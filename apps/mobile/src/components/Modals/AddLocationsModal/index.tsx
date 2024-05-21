import React, {useState} from 'react';
import {Alert, Modal} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useForm} from 'react-hook-form';
import {Locations} from '../../Locations';
import { EmptyModal } from '../../ListEmptyComponent/EmptyModal';
import {IAddTravelersModal} from '../../../@types/components';
import {Container, ContentRow, List, ModalView, Title} from './styles';

const GOOGLE_PLACES_API_KEY = 'AIzaSyBTn_KCvMdiEmaCIAIf0D35p5KefW6l9Xc';

export const AddTravelersModal: React.FC<IAddTravelersModal> = props => {
  const {modalVisible, setModalVisible, append} = props;

  const [searchData, setSearchData] = useState([]);

  const {
    control,
    handleSubmit,
    formState: {errors, touchedFields},
  } = useForm();

  const onSelectLocation = (data, details = null) => {
    const location = details
      ? {
          coordinates: [
            details.geometry.location.lat,
            details.geometry.location.lng,
          ],
          displayName: details.formatted_address,
        }
      : {};

    append(location);
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <Container>
        <ModalView>
          <ContentRow>
            <Icon
              name="chevron-left"
              size={25}
              onPress={() => setModalVisible(false)}
            />
            <Title>Localização</Title>
            <Icon
              name="google-maps"
              size={25}
              onPress={() => setModalVisible(false)}
            />
          </ContentRow>
          <GooglePlacesAutocomplete
            placeholder="Pesquisar"
            fetchDetails={true}
            onPress={onSelectLocation}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: 'pt',
            }}
            onFail={error => console.error(error)}
            styles={{
              textInputContainer: {
                width: '100%',
                marginTop: 10,
              },
              textInput: {
                height: 38,
                backgroundColor: '#EFEFEF',
                fontSize: 14,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          />
          {searchData.length > 0 && (
            <List
              data={searchData}
              renderItem={({item}) => (
                <Locations
                  displayName={item.display_name}
                  country={item.address.country}
                />
              )}
              keyExtractor={item => item.place_id}
              ListEmptyComponent={EmptyModal}
            />
          )}
        </ModalView>
      </Container>
    </Modal>
  );
};
