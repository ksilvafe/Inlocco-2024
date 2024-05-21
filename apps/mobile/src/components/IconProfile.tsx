import React from 'react';
import {Avatar} from 'tamagui';

interface IIconProfile {
  uri: string;
  size?: string;
}

export const IconProfile: React.FC<IIconProfile> = ({uri, size = '$6'}) => {
  return (
    <Avatar size={size} circular>
      <Avatar.Image src={uri} alignSelf="center" />
      <Avatar.Fallback backgroundColor="$primary" />
    </Avatar>
  );
};
