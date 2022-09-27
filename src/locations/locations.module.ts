import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LocationsResolver } from './location.resolver'
import { Location, LocationSchema } from './locations.schema'
import { LocationService } from './locations.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }])
  ],
  providers: [LocationsResolver, LocationService]
})
export class LocationsModule { }