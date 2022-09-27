import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleRef } from '@nestjs/core';
import { Location, LocationDocument, Locations } from './locations.schema';
import {
  CreateLocationInput,
  ParamsLocationInput,
  UpdateLinkToPostInput,
} from './inputs';
import { TokenService } from '../token/token.service';

@Injectable()
export class LocationService {
  private tokenService: TokenService;
  constructor(
    private moduleRef: ModuleRef,
    @InjectModel(Location.name)
    private locationModel: Model<LocationDocument>,
  ) {}

  async location(locationID: string): Promise<Location> {
    return this.locationModel.findById(locationID).populate('author').exec();
  }

  async allLocations(params: ParamsLocationInput): Promise<Locations> {
    const { debounced, region, types } = params;
    const typeBySorted = types.length === 0 ? {} : { isType: params.types };
    const regionBySorted = region.length === 0 ? {} : { region: params.region };
    const debouncedBySorted =
      debounced.length === 0
        ? {}
        : {
            latitude: {
              $gte: debounced[0][0],
              $lte: debounced[0][1],
            },
            longitude: {
              $gte: debounced[1][0],
              $lte: debounced[1][1],
            },
          };

    const locations = await this.locationModel
      .find({
        ...typeBySorted,
        ...regionBySorted,
        ...debouncedBySorted,
      })
      .sort({ createdAt: -1 })
      .exec();

    const total_locations = locations.length;

    return {
      total_locations,
      locations,
    };
  }

  async saveLocation(
    createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    const { token } = createLocationInput;

    this.tokenService = await this.moduleRef.get(TokenService, {
      strict: false,
    });
    const userData = this.tokenService.validateRefreshToken(token);

    return await this.locationModel.create({
      ...createLocationInput,
      author: userData._id,
    });
  }

  async updateLinkToPost(
    updateInput: UpdateLinkToPostInput,
  ): Promise<Location> {
    const { locationID, linkToPost } = updateInput;
    return await this.locationModel
      .findByIdAndUpdate(locationID, { linkToPost }, { new: true })
      .exec();
  }
}
