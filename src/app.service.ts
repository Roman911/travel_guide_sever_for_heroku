import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
import { GenerateRandomString } from './helpers/generateRandomeString';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class SharpPipeForLocation
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    const randomName = Date.now() + '_' + GenerateRandomString(16);

    await sharp(image.buffer)
      .resize({
        width: 260,
        height: 147,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
      })
      .webp({ effort: 3 })
      .toFile(path.join('./uploads/images', randomName + 'm' + '.webp'));

    await sharp(image.buffer)
      .resize({
        width: 560,
        height: 315,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
      })
      .webp({ effort: 3 })
      .toFile(path.join('./uploads/images', randomName + 'l' + '.webp'));

    return randomName;
  }
}

@Injectable()
export class SharpPipeForPost
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    const randomName = Date.now() + '_' + GenerateRandomString(16);

    await sharp(image.buffer)
      .resize({
        width: 300,
        height: 169,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
      })
      .webp({ effort: 3 })
      .toFile(path.join('./uploads/images', randomName + 'm' + '.webp'));

    await sharp(image.buffer)
      .resize({
        width: 750,
        height: 422,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
      })
      .webp({ effort: 3 })
      .toFile(path.join('./uploads/images', randomName + 'l' + '.webp'));

    return randomName;
  }
}

@Injectable()
export class SharpForCreatePost
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    const randomName = Date.now() + '_' + GenerateRandomString(16);

    await sharp(image.buffer)
      .resize({
        width: 715,
        height: 402,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
      })
      .webp({ effort: 3 })
      .toFile(path.join('./uploads/images', randomName + '.webp'));

    return randomName + '.webp';
  }
}

@Injectable()
export class SharpPipeAvatar
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    const randomName = Date.now() + '_' + GenerateRandomString(16) + '.webp';
    //const metadata = await sharp(image.buffer).metadata();

    //const left = Math.round(0.11372888533298747 * metadata.width);
    //const top = Math.round(0.3911769593598094 * metadata.height);

    //const width = Math.round(0.29761904761904767 * metadata.width);
    //const height = Math.round(0.5291005291005292 * metadata.height);

    await sharp(image.buffer)
      //.extract({ left, top, width, height })
      .resize({
        width: 150,
        height: 150,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
      })
      .webp({ effort: 3 })
      .toFile(path.join('./uploads/images', randomName));

    return randomName;
  }
}

@Injectable()
export class SharpTransformImage
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    const randomName = 'velosipedyi-banner';

    await sharp(image.buffer)
      .resize({
        width: 1540,
        height: 600,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
      })
      .webp({ effort: 3 })
      .toFile(path.join('./uploads/images', randomName + '.webp'));

    return randomName + '.webp';
  }
}

@Injectable()
export class SharpMarker
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    const name = 'marker';

    await sharp(image.buffer)
      .resize({
        width: 38,
        height: 46,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
      })
      .webp({ effort: 3 })
      .toFile(path.join('./uploads/images', name + '-hover' + '.webp'));

    await sharp(image.buffer)
      .resize({
        width: 24,
        height: 29,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
      })
      .webp({ effort: 3 })
      .toFile(path.join('./uploads/images', name + '.webp'));

    return name + '.webp';
  }
}
