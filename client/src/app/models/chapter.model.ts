import { TitleModel } from './title.model';
import { PageModel } from './page.model';

export interface ChapterModel {
  id: number,
  name: string,
  number: number,
  volume: number,
  title: TitleModel,
  titleId: number,
  pages: PageModel[]
  createdAt: Date,
  updatedAt: Date
}
