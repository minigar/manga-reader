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
    titleId: number,
    chapterNumber: number,
    pageNumber: number,
    page: number,
    perPage: number,
    parentId: number | null = null,
  ) {
    let skip: number;
    let take: number;

    if (page && perPage) {
      take = Number(perPage);
      skip = (Number(page) - 1) * take;
    }

    const title = await this.db.title.findUnique({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { number: chapterNumber, titleId },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const isMatchesTitleId = titleId === chapter.titleId;

    if (!isMatchesTitleId)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'Title Id');

    const pageForComments = await this.db.page.findFirst({
      where: { number: pageNumber, chapterId: chapter.id },
    });

    if (!pageForComments) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const isMatches = pageForComments.chapterId === chapter.id;

    if (!isMatches)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'Chapter Id');

    const comments = await this.db.pageComment.findMany({
      where: { pageId: pageForComments.id, parentId },
      skip,
      take,
      orderBy: { createdAt: 'asc' },
    });

    const childComments = await Promise.all(
      comments.map(async (comment) => {
        const nestedComments = await this.getList(
          titleId,
          chapterNumber,
          pageNumber,
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
    chapterNumber: number,
    pageNumber: number,
    userId: number,
    message: string,
    parentId: number,
  ) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { titleId, number: chapterNumber },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const isTitleIdMatches = title.id === chapter.titleId;

    if (!isTitleIdMatches)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'titleId');

    const page = await this.db.page.findFirst({
      where: { chapterId: chapter.id, number: pageNumber },
    });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const isChapterIdMatches = chapter.id === page.chapterId;

    if (!isChapterIdMatches)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'chapterId');

    const comment = await this.db.pageComment.create({
      data: {
        pageId: page.id,
        userId,
        parentId: parentId || null,
        message,
      },
    });

    return comment;
  }

  async updateById(
    id: number,
    titleId: number,
    chapterNumber: number,
    pageNumber: number,
    userId: number,
    message: string,
  ) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { titleId, number: chapterNumber },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const isTitleIdMatches = titleId === chapter.titleId;

    if (!isTitleIdMatches)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'titleId');

    const page = await this.db.page.findFirst({
      where: { chapterId: chapter.id, number: pageNumber },
    });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const isChapterIdMatches = chapter.id === page.chapterId;

    if (!isChapterIdMatches)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'chapterId');

    const comment = await this.db.pageComment.findFirst({
      where: { id, pageId: page.id },
    });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    const isMatches = userId === comment.userId;

    if (!isMatches)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'user Id');

    const updatedComment = await this.db.pageComment.update({
      where: { id },
      data: {
        message,
      },
    });

    return updatedComment;
  }

  async deleteById(
    id: number,
    titleId: number,
    chapterNumber: number,
    pageNumber: number,
    userId: number,
  ) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const chapter = await this.db.chapter.findFirst({
      where: { titleId, number: chapterNumber },
    });

    if (!chapter) throw new BusinessError(ChapterErrorKey.CHAPTER_NOT_EXIST);

    const isTitleIdMatches = titleId === chapter.titleId;

    if (!isTitleIdMatches)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'titleId');

    const page = await this.db.page.findFirst({
      where: { chapterId: chapter.id, number: pageNumber },
    });

    if (!page) throw new BusinessError(PageErrorKey.PAGE_NOT_EXIST);

    const isChapterIdMatches = chapter.id === page.chapterId;

    if (!isChapterIdMatches)
      throw new BusinessError(GeneralErrorKey.ID_NOT_SAME + 'chapterId');

    const comment = await this.db.pageComment.findFirst({
      where: { id, pageId: page.id },
    });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const user = await this.db.user.findFirst({ where: { id: userId } });

    if (!user) throw new BusinessError(UserErrorKey.USER_NOT_FOUND);

    // ___________________________________________________________________

    const isMatches = userId === comment.userId;

    if (!isMatches) throw new BusinessError(GeneralErrorKey.ID_NOT_SAME);

    await this.db.pageComment.delete({ where: { id } });

    return;
  }
}
