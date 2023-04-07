import { TitleModel } from './title.model';
import { UserModel } from './user.model';

export interface TitleCommentModel {
  id: number,
  message: string,
  parent: TitleCommentModel,
  children: TitleCommentModel[],
  parentId: number,
  Title: TitleModel,
  titleId: number,
  User: UserModel,
  userId: number,
  createdAt: Date,
  updatedAt: Date
}
