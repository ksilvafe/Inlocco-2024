import {
  UsersCreateInput,
  PostsCreateInput,
  FollowsCreateInput,
  TripsCreateInput,
  NotificationsCreateInput,
  CommentsCreateInput,
} from "@prisma/client";

export type IUsers = UsersCreateInput;
export type IPosts = PostsCreateInput;
export type IFollows = FollowsCreateInput;
export type ITrips = TripsCreateInput;
export type IComments = CommentsCreateInput;
export type INotifications = NotificationsCreateInput;
export type ILocations = LocationsCreateInput;

export type IReverse = {
  displayName: string;
  lat: string;
  lng: string;
  city: string;
  countryCode: string;
  country: string;
};
export type ISearch = {
  displayName: string;
  lat: string;
  lng: string;
  city: string;
  countryCode: string;
  country: string;
};

export interface IAuthenticateUserResponse {
  token: string;
  user: Pick<IUsers, "cuid" | "name" | "email">;
}
