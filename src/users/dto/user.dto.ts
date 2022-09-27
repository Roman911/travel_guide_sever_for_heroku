type Props = {
  email: string;
  _id: string;
  name: string;
  isActivated: boolean;
  rating: number;
  avatar: string;
  avatars: string[];
};

export class UserDto {
  email: string;
  _id: string;
  name: string;
  isActivated: boolean;
  rating: number;
  avatar: string;
  avatars: string[];

  constructor(model: Props) {
    this.email = model.email;
    this._id = model._id;
    this.name = model.name;
    this.isActivated = model.isActivated;
    this.rating = model.rating;
    this.avatar = model.avatar;
    this.avatars = model.avatars;
  }
}
