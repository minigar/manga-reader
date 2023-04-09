import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from '../errors/businessErrors/businessError';
import { TitleErrorKey } from '../controllers/errorKeys/TitleErrorKey';
import { UserErrorKey } from '../controllers/errorKeys/UserErrorKey';
import {
  ChapterErrorKey,
  CommentsErrorKey,
  GeneralErrorKey,
  PageErrorKey,
} from 'src/controllers/errorKeys';

@Injectable()
export class PageCommentsService {
  constructor(private readonly db: DatabaseService) {}
  async getList(
    pageId: number,
    page: number,
    perPage: number,
    parentId: number | null = null,
  ) {
    const offset = (page - 1) * perPage;

    const comments = await this.db.pageComment.findMany({
      where: { pageId, parentId },
      skip: offset,
      take: perPage,
      orderBy: { createdAt: 'asc' },
    });

    const childComments = await Promise.all(
      comments.map(async (comment) => {
        const nestedComments = await this.getList(
          pageId,
          page,
          perPage,
          comment.id,
        );
        return {
          ...comment,
          clidren: nestedComments,
        };
      }),
    );

    return childComments;
  }

  async create(
    titleId: number,
    chapterId: number,
    pageId: number,
    userId: number,
    message: string,
    parentId: number,
  ) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { id: chapterId },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const page = await this.db.page.findFirst({ where: { id: pageId } });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const isTitleIdMatches = title.id === chapter.titleId;

    if (!isTitleIdMatches)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'titleId');

    const isChapterIdMatches = chapter.id === page.chapterId;

    if (!isChapterIdMatches)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'chapterId');

    const comment = await this.db.pageComment.create({
      data: {
        pageId,
        userId,
        parentId: parentId || null,
        message,
      },
    });

    return comment;
  }

  async updateById(
    id: number,
    pageId: number,
    titleId: number,
    chapterId: number,
    userId: number,
    message: string,
  ) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { id: chapterId },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const page = await this.db.page.findFirst({ where: { id: pageId } });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const comment = await this.db.pageComment.findFirst({ where: { id } });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const isTitleIdMatches = titleId === chapter.titleId;

    if (!isTitleIdMatches)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'titleId');

    const isChapterIdMatches = chapter.id === page.chapterId;

    if (!isChapterIdMatches)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'chapterId');

    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    const updatedComment = await this.db.pageComment.update({
      where: { id },
      data: {
        message,
      },
    });

    return updatedComment;
  }

  async deleteById(userId: number, id: number) {
    const comment = await this.db.pageComment.findFirst({ where: { id } });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const isMatches = userId === comment.userId;

    if (!isMatches) throw new BusinessError(GeneralErrorKey.ID_NOT_SAME);

    await this.db.pageComment.delete({ where: { id } });

    return;
  }
}
