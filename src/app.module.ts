import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { LocationsModule } from './locations/locations.module';
import { MailModule } from './mail/mail.module';
import { PostsModule } from './posts/posts.module';
import { TokenModule } from './token/token.module';
import { TripsModule } from './trips/trips.module';
import { UploadModule } from './uploadFile/uploadFile.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CommentsModule,
    LocationsModule,
    MailModule,
    PostsModule,
    TokenModule,
    TripsModule,
    UploadModule,
    UsersModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://Roman:${process.env.MONGO_DB_KEY}@cluster0-vogsm.mongodb.net/travel?retryWrites=true&w=majority`,
    ),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'uploads') }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
