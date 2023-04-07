import { GenreModel } from './genre.model';
import { ChapterModel } from './chapter.model';
import { TitleCommentModel } from './title.comment.model';
import { ListModel } from './list.model';
import { TitleType } from '../enums/title.type';
import { TitleStatus } from '../enums/title.status';

export interface TitleModel {
  id: number,
  name: string,
  description: string,
  type: TitleType,
  status: TitleStatus,
  yearRelease: number,
  genres: GenreModel[];
  chapters: ChapterModel[];
  comments: TitleCommentModel[]
  list: ListModel[],
  createdAt: Date;
  updatedAt: Date;
}
