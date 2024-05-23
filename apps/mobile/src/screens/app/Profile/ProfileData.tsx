import React from 'react';
import {Text, XStack, YStack, getTokens} from 'tamagui';

interface IProfileData {
  followers?: number;
  following?: number;
  trips?: number;
}

export const ProfileData: React.FC<IProfileData> = ({
  followers = 0,
  following = 0,
  trips = 0,
}) => {
  return (
    <XStack position="absolute" top={320}>
      <YStack f={1} ai={'center'}>
        <Text
          color={'$background'}
          fontWeight={'700'}
          fontSize={getTokens().fontSize.$huge}>
          {followers}
        </Text>
        <Text
          color={'$background'}
          fontWeight={'600'}
          fontSize={getTokens().fontSize.$regular}>
          Seguidores
        </Text>
      </YStack>
      <YStack f={1} ai={'center'}>
        <Text
          color={'$background'}
          fontWeight={'700'}
          fontSize={getTokens().fontSize.$huge}>
          {trips}
        </Text>
        <Text
          color={'$background'}
          fontWeight={'600'}
          fontSize={getTokens().fontSize.$regular}>
          Viagens
        </Text>
      </YStack>
      <YStack f={1} ai={'center'}>
        <Text
          color={'$background'}
          fontWeight={'700'}
          fontSize={getTokens().fontSize.$huge}>
          {following}
        </Text>
        <Text
          color={'$background'}
          fontWeight={'600'}
          fontSize={getTokens().fontSize.$regular}>
          Seguindo
        </Text>
      </YStack>
    </XStack>
  );
};
