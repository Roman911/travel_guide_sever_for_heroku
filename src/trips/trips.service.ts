import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleRef } from '@nestjs/core';
import { Trip, TripDocument, Trips } from './trips.schema';
import { ParamsTripInput } from './inputs/params-trip.input';
import { TokenService } from '../token/token.service';
import { LikeInput } from '../likes/inputs/create-like.input';

@Injectable()
export class TripService {
  private tokenService: TokenService;
  constructor(
    private moduleRef: ModuleRef,
    @InjectModel(Trip.name)
    private tripModel: Model<TripDocument>,
  ) {}

  async trip(tripID: string): Promise<Trip> {
    const trip = await this.tripModel.findById(tripID);

    let { views } = trip;
    views++;

    return this.tripModel
      .findByIdAndUpdate(tripID, { views }, { new: true })
      .populate('author')
      .populate('waypoints.location')
      .exec();
  }

  async findAll(params: ParamsTripInput): Promise<Trip[]> {
    const { page, limit } = params;
    const skip = page === 1 ? 0 : page * limit;
    return this.tripModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author')
      .exec();
  }

  //async setLike(CreatePostDto: LikeInput): Promise<Post> {
  //const { postId, token } = CreatePostDto;

  //const post = this.postModel.findById(postId).exec();
  //const { likes } = await post;

  //this.tokenService = await this.moduleRef.get(TokenService, {
  //strict: false,
  //});
  //const userData = this.tokenService.validateRefreshToken(token);

  //let update =
  //likes.length !== 0 && likes.includes(userData._id)
  //? { $pull: { likes: userData._id } }
  //: { $push: { likes: userData._id } };

  //this.postModel.findByIdAndUpdate(postId, update, { new: true }).exec();

  //return post;
  //}

  async trips(params: ParamsTripInput): Promise<Trips> {
    const { page, limit } = params;
    const skip = page === 1 ? 0 : page * limit;

    const allTrips = await this.tripModel.find().exec();
    const trips = await this.tripModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author')
      .exec();
    const total_trips = allTrips.length;
    const total_pages = Math.ceil(total_trips / limit);

    return {
      page,
      total_pages,
      total_trips,
      trips,
    };
  }
}
