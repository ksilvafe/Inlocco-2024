import React from 'react';
import {IProfilePost} from './../@types/components';

import {TouchableOpacity} from 'react-native';
import ImageGrid from './FeedPost/ImageGrid';

export const ProfilePost: React.FC<IProfilePost> = (props: IProfilePost) => {
  const {post, onPress} = props;

  return (
    <TouchableOpacity style={{width: '31%'}} onPress={onPress}>
      <ImageGrid uri={post} />
    </TouchableOpacity>
  );
};
