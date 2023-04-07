import { TitleModel } from './title.model';

export interface GenreModel {
  id: number,
  name: string,
  description: string,
  titles: TitleModel[],
  createdAt: Date,
  updatedAt: Date
}
