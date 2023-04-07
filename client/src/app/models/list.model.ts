import { UserModel } from './user.model';
import { TitleModel } from './title.model';

export interface ListModel {
  id: number,
  name: string,
  User: UserModel,
  userId: number,
  titles: TitleModel[],
  createdAt: Date,
  updatedAt: Date
}
