import { ChapterModel } from './chapter.model';
import { PageCommentModel } from './page.comment.model';


export interface PageModel {
  id: number,
  imgUri: string,
  number: number,
  Chapter: ChapterModel,
  chapterId: number,
  comments: PageCommentModel[]
  createdAt: Date,
  updatedAt: Date
}
