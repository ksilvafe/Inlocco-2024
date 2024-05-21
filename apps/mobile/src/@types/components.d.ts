import {ImageProps, TextInputProps, TouchableOpacityProps} from 'react-native';

interface IController {
  control: any;
  name: string;
  touched?: boolean;
  errors?: FieldError;
  register: RegisterOptions;
}
interface IGaleryItem extends ImageProps {}

interface IProfilePicture extends IController {
  picture?: string;
}

interface IButtons extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  colorText?: string;
  weightText?: number;
}

interface INotificationItem extends TouchableOpacityProps {
  profile: string;
  senderUsername: string;
  notificationMessage: string;
  post?: string;
}

interface IFeedPost extends TouchableOpacityProps {
  user: {
    cuid: string;
    username: string;
    profile: {
      name: string;
      picture?: string;
    };
  };
  posts: IPost[];
  cuid: string;
  isLiked: boolean;
}

interface IExplorerPost extends TouchableOpacityProps {
  post: string;
}

interface IProfilePost extends TouchableOpacityProps {
  post: string;
}

interface IProfileActionButton extends IButtons {
  iconName?: string;
  color?: string;
}

interface IProfileStarCounter {
  stars?: number;
}

interface IProfileFlags {
  flags: string[];
}

interface IHorizntalInput extends TextInputProps, IController {
  title: string;
}

interface IListTagInput extends TextInputProps, IController {
  title: string;
  items?: string[];
  type?: string;
}

interface IInput extends TextInputProps, IController {
  title?: string;
  iconName?: string;
}

interface ISearchInput
  extends TextInputProps,
    TouchableOpacityProps,
    IController {
  iconName?: string;
  handleClose?: () => void;
  closeButton?: boolean;
}

interface IErroMessage {
  children?: ReactNode;
}

interface ITag extends TouchableOpacityProps {
  title?: string;
}

interface ITravelers {
  iconUrl: string;
  username: string;
}

interface ILocations extends TouchableOpacityProps {
  displayName: string;
  country: string;
}
interface IAddProposeModal {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  append: UseFieldArrayAppend<FieldValues, string>;
}

interface IObservationLocationModal {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  description: string;
}

interface IAddTravelersModal {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  append: UseFieldArrayAppend<FieldValues, string>;
}

interface IAddTripModal {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<ITrip[], unknown>>;
}
