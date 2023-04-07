import { Controller, Post } from '@nestjs/common';
import { successResponse } from 'src/helpers/success-response';
import { Public } from '../common/decorators/Public.decorator';
import { SeedService } from 'src/services/seed.service';

@Public()
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  async seed() {
    return successResponse(await this.seedService.seed());
  }
}
