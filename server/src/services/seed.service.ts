import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { ListService } from './list.service';
import { GenreService } from './genre.service';
import { TitleCommentsService } from './title-comments.service';
import { PageService } from './page.service';
import { ChapterService } from './chapter.service';
import { PageCommentsService } from './page-comments.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly db: DatabaseService,
    private readonly listService: ListService,
    private readonly genreService: GenreService,
    private readonly titleCommentsService: TitleCommentsService,
    private readonly pageCommentsService: PageCommentsService,
    private readonly pageService: PageService,
    private readonly chapterService: ChapterService,
  ) {}

  async seed() {
    await this.db.user.deleteMany();
    await this.db.list.deleteMany();
    await this.db.title.deleteMany();
    await this.db.genre.deleteMany();
    await this.db.titleComment.deleteMany();
    await this.db.pageComment.deleteMany();
    await this.db.page.deleteMany();
    await this.db.chapter.deleteMany();
    await this.db.rating.deleteMany();

    const user1 = await this.db.user.create({
      data: {
        name: 'user1',
        email: 'user1@gmail.com',
        password: '1234',
        isAdmin: true,
      },
    });

    await this.createRequiredUserLists(user1.id);

    const user2 = await this.db.user.create({
      data: {
        name: 'user2',
        email: 'user2@gmail.com',
        password: '1234',
        isAdmin: true,
      },
    });

    await this.createRequiredUserLists(user2.id);

    // ____________________________

    const genre1 = await this.db.genre.create({
      data: { name: 'genre1', description: 'genre1 description ...' },
    });

    const genre2 = await this.db.genre.create({
      data: { name: 'genre2', description: 'genre2 description ...' },
    });

    const genre3 = await this.db.genre.create({
      data: { name: 'genre3', description: 'genre3 description ...' },
    });

    const genre4 = await this.db.genre.create({
      data: { name: 'genre4', description: 'genre4 description ...' },
    });

    const genre5 = await this.db.genre.create({
      data: { name: 'genre5', description: 'genre5 description ...' },
    });

    const genre6 = await this.db.genre.create({
      data: { name: 'genre6', description: 'genre6 description ...' },
    });

    // ______________________________

    const title1 = await this.db.title.create({
      data: {
        name: 'title1',
        description: 'title1 description',
        type: 'MANGA',
        status: 'ONGOING',
      },
    });

    const title2 = await this.db.title.create({
      data: {
        name: 'title2',
        description: 'title2 description',
        type: 'MANHWA',
        status: 'ANNOUNCEMENT',
      },
    });

    const title3 = await this.db.title.create({
      data: {
        name: 'title3',
        description: 'title3 description',
        type: 'MANGA',
        status: 'FINISHED',
      },
    });

    const title4 = await this.db.title.create({
      data: {
        name: 'title4',
        description: 'title4 description',
        type: 'COMICS',
        status: 'SUSPENDED',
      },
    });

    const title5 = await this.db.title.create({
      data: {
        name: 'title5',
        description: 'title5 description',
        type: 'MAMHUA',
        status: 'FINISHED',
      },
    });
    // _______________________

    await this.genreService.addTitleTo(genre1.id, title1.id);
    await this.genreService.addTitleTo(genre2.id, title1.id);

    await this.genreService.addTitleTo(genre2.id, title2.id);
    await this.genreService.addTitleTo(genre3.id, title2.id);

    await this.genreService.addTitleTo(genre6.id, title3.id);
    await this.genreService.addTitleTo(genre2.id, title3.id);

    await this.genreService.addTitleTo(genre4.id, title4.id);
    await this.genreService.addTitleTo(genre5.id, title4.id);

    await this.genreService.addTitleTo(genre5.id, title5.id);
    await this.genreService.addTitleTo(genre1.id, title5.id);

    // _________________________

    const comment1ForTitle1 = await this.titleCommentsService.create(
      title1.id,
      null,
      user1.id,
      'message from user 1 to title1',
    );

    const comment2ForTitle1 = await this.titleCommentsService.create(
      title1.id,
      comment1ForTitle1.id,
      user2.id,
      'message from user 2 to title1 to user 1',
    );

    const comment3ForTitle1 = await this.titleCommentsService.create(
      title1.id,
      comment2ForTitle1.id,
      user1.id,
      'nested message to user 1',
    );

    const comment4ForTitle1 = await this.titleCommentsService.create(
      title2.id,
      null,
      user1.id,
      'message from user 1 to title2',
    );

    const commentFor5Title1 = await this.titleCommentsService.create(
      title2.id,
      null,
      user2.id,
      'message from user 2 to title2',
    );

    const comment6ForTitle1 = await this.titleCommentsService.create(
      title1.id,
      comment2ForTitle1.id,
      user1.id,
      'message from user 1 to title2 to user2',
    );

    // _________________________________

    const chapter1ForTitle1 = await this.chapterService.create(
      title1.id,
      'chapter1Fortitle1',
      1,
      1,
    );

    const chapter2ForTitle1 = await this.chapterService.create(
      title1.id,
      'chapter2Fortitle1',
      2,
      1,
    );

    const chapter3ForTitle1 = await this.chapterService.create(
      title1.id,
      'chapte31Fortitle1',
      3,
      1,
    );

    const chapter4ForTitle1 = await this.chapterService.create(
      title1.id,
      'chapter4Fortitle1',
      4,
      1,
    );

    const chapter5ForTitle1 = await this.chapterService.create(
      title1.id,
      'chapter5Fortitle1',
      5,
      2,
    );

    const chapter6ForTitle1 = await this.chapterService.create(
      title1.id,
      'chapter6Fortitle1',
      6,
      2,
    );

    // ______________________________________

    const page1ForChaper1 = await this.pageService.create(
      title1.id,
      chapter1ForTitle1.id,
      'https://img33.imgslib.link//manga/3-second-strip/chapters/2390891/1_BKNW.png',
      1,
    );

    const page2ForChaper1 = await this.pageService.create(
      title1.id,
      chapter1ForTitle1.id,
      'https://img33.imgslib.link//manga/3-second-strip/chapters/2390891/3-o-1_CMr0.png',
      2,
    );

    const page3ForChaper1 = await this.pageService.create(
      title1.id,
      chapter1ForTitle1.id,
      'https://img2.mixlib.me//manga/3-second-strip/chapters/2390289/3-o_ixis.png',
      3,
    );

    const page4orChaper1 = await this.pageService.create(
      title1.id,
      chapter1ForTitle1.id,
      'https://img33.imgslib.link//manga/3-second-strip/chapters/2390289/2-o_huU9.png',
      4,
    );

    const page5ForChaper1 = await this.pageService.create(
      title1.id,
      chapter1ForTitle1.id,
      'https://img33.imgslib.link//manga/3-second-strip/chapters/2390891/2-o-1_F8mB.png',
      5,
    );
    //___________________________________________________________________________________

    const comment1ForPage1 = await this.pageCommentsService.create(
      title1.id,
      chapter1ForTitle1.id,
      page1ForChaper1.id,
      user1.id,
      'message from user 1 to page1',
      null,
    );

    const comment2ForPage1 = await this.pageCommentsService.create(
      title1.id,
      chapter1ForTitle1.id,
      page1ForChaper1.id,
      user2.id,
      'message from user 2 to user 1 on page1',
      comment1ForPage1.id,
    );

    const comment3ForPage1 = await this.pageCommentsService.create(
      title1.id,
      chapter1ForTitle1.id,
      page1ForChaper1.id,
      user2.id,
      'message from user 2 to user 2 on page1',
      comment2ForPage1.id,
    );

    const comment4ForPage1 = await this.pageCommentsService.create(
      title1.id,
      chapter1ForTitle1.id,
      page1ForChaper1.id,
      user2.id,
      'message from user 2 to page1',
      null,
    );

    const comment5ForPage1 = await this.pageCommentsService.create(
      title1.id,
      chapter1ForTitle1.id,
      page1ForChaper1.id,
      user1.id,
      'message from user 1 to page1 second not nested',
      null,
    );

    const comment6ForPage1 = await this.pageCommentsService.create(
      title1.id,
      chapter1ForTitle1.id,
      page1ForChaper1.id,
      user2.id,
      'message from user 2 to user 1 on page1 second',
      comment1ForPage1.id,
    );

    await this.db.rating.create({
      data: { userId: user1.id, titleId: title1.id, value: 8 },
    });

    await this.db.rating.create({
      data: { userId: user2.id, titleId: title1.id, value: 5 },
    });
  }

  async createRequiredUserLists(userId: number) {
    await this.listService.create(userId, 'All');
    await this.listService.create(userId, 'Read');
    await this.listService.create(userId, 'Planned');
    await this.listService.create(userId, 'Quit');
    await this.listService.create(userId, 'Done');
    await this.listService.create(userId, 'Favorites');
  }
}
