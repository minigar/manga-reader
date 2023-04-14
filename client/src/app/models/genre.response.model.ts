import { GenreModel } from './genre.model';

export interface GenreResponseModel {
  statusCode: number,
  data: GenreModel[]
}
