export type IPost = {
  createdAt: string;
  cuid: string;
  description: string;
  purposes: string[];
  id: number;
  location: ILocation;
  photos: string[];
  title: string;
  tripId?: string;
  updatedAt: string;
  videos: string[];
  travelers: IProfile[];
};

export type IComment = {
  createdAt: string;
  cuid: string;
  text: string;
  id: number;
  user: string;
  updatedAt: string;
};

export type ILocation = {
  createdAt: string;
  cuid: string;
  coordinates: number[];
  id: number;
  country: string;
  city: string;
  displayName: string;
  updatedAt: string;
};

export type ITrip = {
  createdAt: string;
  cuid: string;
  user: IProfile;
  shares: string;
  status: string;
  saves: string[];
  comments: IComment[];
  likes: string[];
  description: string;
  id: number;
  title: string;
  updatedAt: string;
  posts: IPost[];
};

export type IProfile = {
  acceptedTerms: boolean;
  createdAt: string;
  cuid: string;
  email: string;
  followers: number;
  following: number;
  id: number;
  likes: number;
  trips: ITrip[];
  profile: {
    biography?: string;
    birthday?: string;
    gender: string;
    link?: string;
    name?: s;
    phone?: string;
    picture: string;
    updatedAt: string;
    link?: string;
  };
  address: {
    zipcode: string;
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement: string;
    updatedAt: string;
  };
  isFollowing: boolean;
  status: string;
  trips: number;
  twoFactorAuth: boolean;
  updatedAt: string;
  username: string;
};

export type INotification = {
  id: number;
  cuid: string;
  title: string;
  message: string;
  sender: IProfile;
  trip: ITrip;
  updatedAt: string;
  createdAt: string;
};
