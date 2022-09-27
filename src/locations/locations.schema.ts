import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/users.schema';

export type LocationDocument = Location & mongoose.Document;

@Schema()
export class Location {
  @Prop()
  title: string;
  @Prop()
  linkToPost: string;
  @Prop()
  small_text: string;
  @Prop()
  cover: string;
  @Prop()
  isType: string;
  @Prop()
  address: string;
  @Prop()
  region: string;
  @Prop()
  isTicket: boolean;
  @Prop({ default: [] })
  tickets: string[];
  @Prop()
  latitude: Number;
  @Prop()
  longitude: Number;
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const LocationSchema = SchemaFactory.createForClass(Location);

@Schema()
export class Locations {
  @Prop()
  total_locations: number;
  @Prop({ type: [LocationSchema] })
  locations: Location[];
}

export const LocationsSchema = SchemaFactory.createForClass(Locations);
