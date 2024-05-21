import React, {useEffect, useState} from 'react';

import {ActivityIndicator, ColorValue} from 'react-native';
import {getTokens} from '@tamagui/core';
import {Image, ZStack, YStack} from 'tamagui';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';

interface IImageGrid {
  uri: string;
}
export const ImageGrid: React.FC<IImageGrid> = ({uri}) => {
  const [loading, setLoading] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    if (uri) {
      Image.getSize(uri, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  }, []);

  return (
    <YStack style={{aspectRatio}} f={1}>
      {loading && (
        <ContentLoader
          speed={2}
          width={400}
          height={160}
          viewBox="0 0 400 160"
          backgroundColor="#EFEFEF"
          foregroundColor="#2F3E27">
          <Rect x="8" y="0" rx="10" ry="10" width={160} height={100} />
        </ContentLoader>
      )}
      <Image
        f={1}
        borderRadius={'$5'}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        aspectRatio={aspectRatio}
        source={{
          uri,
        }}
      />
    </YStack>
  );
};
