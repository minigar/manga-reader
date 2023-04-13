import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';

@Injectable()
export class ChapterLikesService {
  constructor(private readonly db: DatabaseService) {}
}
