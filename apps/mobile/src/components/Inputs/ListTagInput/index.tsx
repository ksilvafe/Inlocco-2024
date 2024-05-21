import React, {useState} from 'react';

import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'styled-components';
import {IListTagInput} from '../../../@types/components';
import {Container, Content, Divider, Input, Label, List} from './styles';
import {Controller, useFieldArray} from 'react-hook-form';
import { AddProposeModal} from '../../Modals/AddProposeModal';
import {AddTravelersModal as AddLocationsModal} from '../../Modals/AddLocationsModal';
import { ErroMessage } from '../../ErroMessage';
import { Tag } from '../../Tag';

export const ListTagInput: React.FC<IListTagInput> = (props: IListTagInput) => {
  const theme = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const {title, control, type = 'propose', name, touched, errors} = props;

  const {fields, append} = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name, // unique name for your Field Array
  });

  const renderItem = ({item, index}: {item: string, index: any}) => (
    <Controller
      control={control}
      name={`${name}[${index}]`}
      render={({field}) => (
        <Tag
          title={`${
            field.value.username
              ? field.value.username
              : field.value.displayName
          }`}
        />
      )}
    />
  );

  return (
    <Container>
      {type === 'propose' ? (
        <AddProposeModal
          append={append}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : type === 'location' ? (
        <AddLocationsModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          append={append}
        />
      ) : (
        <AddLocationsModal
          append={append}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
      <Content>
        <Label>{title}</Label>
        {/* <Input {...props} /> */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="plus" color={theme.colors.primary} size={25} />
        </TouchableOpacity>
      </Content>
      <List
        data={fields}
        horizontal
        renderItem={renderItem}
        contentContainerStyle={{gap: 2}}
        keyExtractor={item => String(item.id)}
      />
      {errors && <ErroMessage>{errors.message}</ErroMessage>}
      <Divider />
    </Container>
  );
};
