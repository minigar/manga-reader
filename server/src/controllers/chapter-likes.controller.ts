import { Controller } from '@nestjs/common';
import { ChapterService } from 'src/services/chapter.service';

@Controller('titles/:titleId/chapters/:chapterId')
export class ChapterLikesController {
  constructor(private readonly chapterService: ChapterService) {}
}
