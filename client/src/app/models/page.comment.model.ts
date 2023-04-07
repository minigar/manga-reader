import { UserModel } from './user.model';
import { PageModel } from './page.model';

export interface PageCommentModel {
  id: number,
  message: string,
  parent: PageCommentModel,
  children: PageCommentModel[],
  parentId: number,
  User: UserModel,
  userId: number,
  Page: PageModel,
  pageId: number,
  createdAt: Date,
  updatedAt: Date
}
