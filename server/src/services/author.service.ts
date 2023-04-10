import { Injectable } from '@nestjs/common';
import { AuthorErrorKey } from 'src/controllers/errorKeys';
import { DatabaseService } from 'src/data/database.service';
import { BusinessError } from 'src/errors/businessErrors/businessError';

@Injectable()
export class AuthorService {
  constructor(private readonly db: DatabaseService) {}
  async getList() {
    return await this.db.author.findMany({});
  }

  async getById(id: number) {
    const author = await this.db.author.findFirst({
      where: { id },
      include: { titles: { include: { _count: true } } },
    });

    if (!author) throw new BusinessError(AuthorErrorKey.AUTHOR_NOT_EXIST);

    return author;
  }

  async create(name: string) {
    const author = await this.db.author.findUnique({ where: { name } });

    if (author)
      throw new BusinessError(AuthorErrorKey.AUTHOR_NAME_ALREADY_EXIST);

    return await this.db.author.create({ data: { name } });
  }

  async updateById(id: number, name: string) {
    const author = await this.db.author.findUnique({ where: { name } });

    if (!author) throw new BusinessError(AuthorErrorKey.AUTHOR_NOT_EXIST);

    if (author)
      throw new BusinessError(AuthorErrorKey.AUTHOR_NAME_ALREADY_EXIST);

    return await this.db.author.update({ where: { id }, data: { name } });
  }

  async deleteById(id: number) {
    const author = await this.db.author.findFirst({ where: { id } });

    if (!author) throw new BusinessError(AuthorErrorKey.AUTHOR_NOT_EXIST);

    await this.db.author.delete({ where: { id } });

    return;
  }
}
