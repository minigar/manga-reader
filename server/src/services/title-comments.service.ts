import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from '../errors/businessErrors/businessError';
import { TitleErrorKey } from '../controllers/errorKeys/TitleErrorKey';
import { CommentsErrorKey } from 'src/controllers/errorKeys/CommentsErrorKey';
import { GeneralErrorKey } from 'src/controllers/errorKeys/GeneralErrorKey';

@Injectable()
export class TitleCommentsService {
  constructor(private readonly db: DatabaseService) {}
  async getList(titleId: number, parentId: number | null = null) {
    const comments = await this.db.titleComment.findMany({
      where: { titleId, parentId },
    });

    const childComments = await Promise.all(
      comments.map(async (comment) => {
        const nestedComments = await this.getList(titleId, comment.id);
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
    const comment = await this.db.titleComment.findFirst({ where: { id } });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const isMatches = userId === comment.userId;

    if (!isMatches) throw new BusinessError(GeneralErrorKey.ID_NOT_SAME);

    const updatedComment = await this.db.titleComment.update({
      where: { id },
      data: {
        message,
      },
    });

    return updatedComment;
  }

  async deleteById(userId: number, id: number) {
    const comment = await this.db.titleComment.findFirst({ where: { id } });

    if (!comment) throw new BusinessError(CommentsErrorKey.COMMENT_NOT_EXIST);

    const isMatches = userId === comment.userId;

    if (!isMatches) throw new BusinessError(GeneralErrorKey.ID_NOT_SAME);

    await this.db.titleComment.delete({ where: { id } });

    return;
  }
}
