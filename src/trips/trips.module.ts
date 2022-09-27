import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripsResolver } from './trip.resolver';
import { Trip, TripSchema } from './trips.schema';
import { TripService } from './trips.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
  ],
  providers: [TripsResolver, TripService],
})
export class TripsModule {}
