import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';

@Injectable()
export class Service {
  constructor(private readonly db: DatabaseService) {}
}

// if (!translationVersions) {
//   throw new BusinessError(VersionErrorKey.TRANSLATION_VERSION_NOT_FOUND);
// }
