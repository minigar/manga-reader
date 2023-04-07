import { ListModel } from './list.model';
import { TitleCommentModel } from './title.comment.model';
import { PageCommentModel } from './page.comment.model';
import { Role } from '../enums/role';

export interface UserModel {
  id: number,
  name: string,
  email: string,
  password: string,
  hashedRT: string,
  avatarImgUri: string,
  lists: ListModel[],
  title: TitleCommentModel[],
  PageComments: PageCommentModel[],
  role: Role,
  isAdmin: boolean,
  isAuthor: Boolean,
  createdAt: Date,
  updatedAt: Date
}
