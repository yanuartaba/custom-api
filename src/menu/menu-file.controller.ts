import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { Next } from '@nestjs/common';
import { NextFunction } from 'express';

@Controller('files')
export class MenuFileController {
  @Get()
  getTest() {
    return { msg: 'test file' };
  }

  @Get(':imagename')
  findProfileImage(
    @Param('imagename') imagename: string,
    @Res() res,
  ) {
    try {
      res.sendFile(
        imagename,
        {
          root: 'files',
        },
        // function (err) {
        //   if (err) {
        //     // console.log(err);
        //     // res
        //     //   .status(err.status)
        //     //   .send({ msg: 'not found' });
        //     // res.end();
        //     // @Next()
        //     throw new NotFoundException(
        //       'Media not found',
        //     );
        //   } else {
        //     console.log('Sent:', imagename);
        //   }
        // },
      );
    } catch (error) {
      // res.end();
      throw new NotFoundException(
        'Media not found',
      );
    }
  }
}
