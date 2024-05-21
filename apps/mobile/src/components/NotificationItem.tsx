import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Avatar, Text, View, XStack, YStack} from 'tamagui';
import {INotificationItem} from '../@types/components';
import {IconProfile} from './IconProfile';

export const NotificationItem: React.FC<INotificationItem> = (
  props: INotificationItem,
) => {
  const {profile, senderUsername, notificationMessage, post} = props;

  return (
    <TouchableOpacity {...props}>
      <XStack space="$2" ai="center" jc="space-between" gap="$2" m="$2">
        <IconProfile uri={profile} />
        <YStack f={1}>
          <Text color={'$text'} fontWeight={'bold'}>
            {senderUsername}
          </Text>
          <Text color={'$text'}>{notificationMessage}</Text>
        </YStack>
        {post && (
          <Avatar size="$6" br={'$3'}>
            <Avatar.Image src={post} />
            <Avatar.Fallback backgroundColor="$secondary" />
          </Avatar>
        )}
        <View ai="center" jc="center" bg="$primary" p={'$2'} br={'$2'}>
          <Text color={'white'}>Seguir</Text>
        </View>
      </XStack>
    </TouchableOpacity>
  );
};
