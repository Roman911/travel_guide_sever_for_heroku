import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { TripService } from './trips.service';
import { CreateTripDto, CreateTripsDto } from './dto/create-trips.dto';
import { Trip, TripDocument } from './trips.schema';
import { ParamsTripInput } from './inputs/params-trip.input';
//import { LikeInput } from '../likes/inputs/create-like.input';

@Resolver()
export class TripsResolver {
  constructor(
    private tripsService: TripService,
    @InjectModel(Trip.name)
    private tripModel: Model<TripDocument>,
  ) {}

  @Query(() => CreateTripsDto)
  async tripsAndParams(@Args('input') input: ParamsTripInput) {
    return this.tripsService.trips(input);
  }

  @Query(() => [CreateTripDto])
  async trips(@Args('input') input: ParamsTripInput) {
    return this.tripsService.findAll(input);
  }

  @Query(() => CreateTripDto)
  async trip(@Args('tripID') tripID: string) {
    return this.tripsService.trip(tripID);
  }

  @Mutation(() => CreateTripDto)
  async setLikeForTrip(
    @Args('input') input: string,
    {
      /*LikeInput*/
    },
  ) {
    //return this.directionsService.setLike(input);
  }

  //@Mutation(() => CreatePostDto)
  //async addCommentForPost(@Args('input') input: CommentInput) {
  // return this.postsService.addComment(input)
  //}

  //@Mutation(() => CreatePostDto)
  //async addAnswerForComment(@Args('input') input: AnswerCommentInput) {
  // return this.postsService.addAnswer(input)
  //}
}
