import React from 'react';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';

export const FeedSkeleton: React.FC = props => {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={160}
      viewBox="0 0 400 160"
      backgroundColor="#EFEFEF"
      foregroundColor="#2F3E27"
      {...props}>
      <Rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <Rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <Rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <Rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <Rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <Circle cx="20" cy="20" r="20" />
    </ContentLoader>
  );
};
