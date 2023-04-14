import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from '../errors/businessErrors/businessError';
import { TitleErrorKey } from '../controllers/errorKeys/TitleErrorKey';
import { CommentsErrorKey } from 'src/controllers/errorKeys';

@Injectable()
export class TitleCommentsService {
  constructor(private readonly db: DatabaseService) {}
  async getList(
    titleId: number,
    page: number,
    perPage: number,
    parentId: number | null = null,
  ) {
    let skip: number;
    let take: number;

    const title = await this.db.title.findUnique({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    if (page && perPage) {
      take = Number(perPage);
      skip = (Number(page) - 1) * take;
    }

    const comments = await this.db.titleComment.findMany({
      where: { titleId, parentId },
      skip,
      take,
      orderBy: { createdAt: 'asc' },
    });

    const childComments = await Promise.all(
      comments.map(async (comment) => {
        const nestedComments = await this.getList(
          titleId,
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
    parentId: number,
    userId: number,
    message: string,
  ) {
    const title = await this.db.title.findFirst({ where: { id: titleId } });

    if (!title) throw new BusinessError(TitleErrorKey.TITLE_NOT_FOUND);

    const comment = await this.db.titleComment.create({
      data: {
        titleId,
        userId,
        parentId: parentId || null,
        message,
      },
    });

    return comment;
  }

  async updateById(userId: number, id: number, message: string) {
    const comment = await this.db.titleComment.findFirst({
      where: { id, userId },
    });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const updatedComment = await this.db.titleComment.update({
      where: { id },
      data: {
        message,
      },
    });

    return updatedComment;
  }

  async deleteById(userId: number, id: number) {
    const comment = await this.db.titleComment.findFirst({
      where: { id, userId },
    });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    await this.db.titleComment.delete({ where: { id } });

    return;
  }
}
