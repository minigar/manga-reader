import { GenreModel } from './genre.model';
import { ChapterModel } from './chapter.model';
import { TitleCommentModel } from './title.comment.model';
import { ListModel } from './list.model';
import { TitleTypes } from '../enums/title.types';
import { TitleStatuses } from '../enums/title.statuses';

export interface TitleModel {
  id: number,
  name: string,
  description: string,
  type: TitleTypes,
  status: TitleStatuses,
  yearRelease: number,
  rating: number,
  imgUrl: string,
  authorId: number
  genres: GenreModel[];
  chapters: ChapterModel[];
  comments: TitleCommentModel[]
  list: ListModel[],
  createdAt: Date;
  updatedAt: Date;
}
