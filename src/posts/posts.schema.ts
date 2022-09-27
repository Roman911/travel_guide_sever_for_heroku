import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/users.schema';
import { Location } from '../locations/locations.schema';
//import { Comment, CommentSchema } from '../comments/comments.schema'

export type PostDocument = Post & mongoose.Document;

@Schema()
export class Post {
  @Prop()
  editor: string;
  @Prop()
  type_material: string;
  @Prop()
  cover: string;
  @Prop()
  title: string;
  @Prop()
  link: string;
  @Prop()
  tags: string[];
  @Prop()
  region: string;
  @Prop()
  work_time: string;
  @Prop()
  how_to_get_there: string;
  @Prop({ default: 0 })
  views: number;
  @Prop()
  likes: string[];
  @Prop({ default: false })
  confirmed: boolean;
  @Prop({ default: '' })
  confirm_hash: string;
  @Prop()
  small_text: string;
  @Prop({ default: new Date() })
  last_seen: Date;
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location' })
  location: Location;
}

export const PostSchema = SchemaFactory.createForClass(Post);

@Schema()
export class Posts {
  @Prop()
  page: number;
  @Prop()
  total_pages: number;
  @Prop()
  total_posts: number;
  @Prop({ type: [PostSchema] })
  posts: Post[];
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
