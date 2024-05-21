import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type RootStackParamList = {
  Feed;
  PostDetails: {postUuid: string};
};

//type FeedScreenProps = NativeStackScreenProps<RootStackParamList, 'Feed'>;
interface ScreenProps {
  navigation: NativeStackNavigationProp<ParamList, RouteName, NavigatorID>;
  route: RouteProp<ParamList, RouteName>;
}
type FeedScreenProps = ScreenProps;

type PostDetailsScreenProps = ScreenProps;
type RoadMapDetailsScreenProps = ScreenProps;

type ProfileScreenProps = ScreenProps;

type EditProfileScreenProps = ScreenProps;

type SelectedMediaScreenProps = ScreenProps;
type ContinueTripScreenProps = ScreenProps;
type PreviewImageAndAddInformationScreenProps = ScreenProps;

type LoginScreenProps = ScreenProps;
type RegisterScreenProps = ScreenProps;
