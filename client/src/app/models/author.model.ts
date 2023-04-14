import { TitleModel } from './title.model';

export interface AuthorModel {
  data: {
    id: number,
    name: string,
    createdAt: string;
    updatedAt: string,
    titles: TitleModel[]
  }
}
