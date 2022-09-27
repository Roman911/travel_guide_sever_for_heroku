import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { CreateLocationDto } from '../../locations/dto/create-location.dto';

@ObjectType()
class TripValue {
  @Field()
  distance: number;
  @Field()
  travel_time: number;
  @Field()
  waypoints: number;
}

@ObjectType()
class Obj {
  @Field()
  text: string;
  @Field()
  value: number;
}

@ObjectType()
class Legs {
  @Field()
  distance: Obj;
  @Field()
  duration: Obj;
}

@ObjectType()
class Location {
  @Field()
  lat: number;
  @Field()
  lng: number;
}

@ObjectType()
class Waypoints {
  @Field()
  latLng: Location;
  @Field((type) => CreateLocationDto, { nullable: true })
  location: CreateLocationDto;
}

@ObjectType()
export class CreateTripDto {
  @Field()
  _id: string;
  @Field()
  cover: string;
  @Field()
  title: string;
  @Field((type) => [String])
  travelMode: string[];
  @Field()
  link: string;
  @Field((type) => [Legs])
  legs: Legs[];
  @Field((type) => [String])
  tags: string[];
  @Field()
  isType: string;
  @Field(() => Int)
  views: number;
  @Field((type) => [String])
  likes: string[];
  @Field()
  small_text: string;
  @Field((type) => TripValue)
  trip_value: TripValue;
  @Field((type) => [Waypoints])
  waypoints: Waypoints[];
  @Field({ nullable: true })
  last_seen: Date;
  @Field()
  createdAt: Date;
  @Field((type) => CreateUserDto, { nullable: true })
  author: CreateUserDto;
}

@ObjectType()
export class CreateTripsDto {
  @Field(() => Int)
  page: number;
  @Field(() => Int)
  total_pages: number;
  @Field(() => Int)
  total_trips: number;
  @Field((type) => [CreateTripDto])
  trips: CreateTripDto[];
}
