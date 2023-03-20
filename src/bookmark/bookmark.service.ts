import { EditBookmarkDto } from './dto/edit-bookmar.dto';
import { CreateBookmarkDto } from './dto/create-bookmar.dto';
import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ) {
    // console.log(userId);
    const bookmark =
      await this.prisma.bookmark.create({
        data: {
          title: dto.title,
          description: dto.description,
          link: dto.link,
          userId: userId,
        },
      });
    return bookmark;
  }

  async getBookmarks(userId: number) {
    const bookmarks =
      await this.prisma.bookmark.findMany({
        where: {
          userId,
        },
      });
    return bookmarks;
  }

  async getBookmarkById(bookmarkId: number) {
    const bookmark =
      await this.prisma.bookmark.findFirst({
        where: {
          id: bookmarkId,
        },
      });
    if (!bookmark) {
      throw new NotFoundException(
        'Bookmark not found',
      );
    }

    return bookmark;
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    const bookmark =
      await this.prisma.bookmark.findFirst({
        where: {
          id: bookmarkId,
        },
      });

    if (!bookmark)
      throw new NotFoundException(
        'Bookmark not found',
      );

    if (bookmark.userId !== userId) {
      throw new UnauthorizedException(
        'This bookmark not belong to you',
      );
    }

    const updateBookmark =
      await this.prisma.bookmark.update({
        where: {
          id: bookmarkId,
        },
        data: {
          ...dto,
        },
      });
    return updateBookmark;
  }

  async deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    const bookmark =
      await this.prisma.bookmark.findFirst({
        where: {
          id: bookmarkId,
        },
      });

    if (!bookmark) {
      throw new NotFoundException(
        'Bookmark not found',
      );
    }

    if (bookmark.userId !== userId) {
      throw new UnauthorizedException(
        'This bookmark not belong to you',
      );
    }

    return this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
