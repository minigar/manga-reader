import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/data/database.service';
import { ListService } from './list.service';
import { GenreService } from './genre.service';
import { TitleCommentsService } from './title-comments.service';
import { PageService } from './page.service';
import { ChapterService } from './chapter.service';
import { PageCommentsService } from './page-comments.service';
import * as bcrypt from 'bcrypt';

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
    await this.db.author.deleteMany();

    const Oda = await this.db.author.create({
      data: {
        name: 'Oda',
      },
    });

    const user1 = await this.db.user.create({
      data: {
        name: 'hii1',
        email: 'hi@gmail.com',
        password: await bcrypt.hash('qwerty', 10),
        isAdmin: true,
      },
    });

    await this.createRequiredUserLists(user1.id);

    const user2 = await this.db.user.create({
      data: {
        name: 'hii2',
        email: 'hi2@gmail.com',
        password: await bcrypt.hash('qwerty', 10),
        isAdmin: true,
      },
    });

    await this.createRequiredUserLists(user2.id);

    // ____________________________

    const genre1 = await this.db.genre.create({
      data: { name: 'comedy', description: 'comedy description ...' },
    });

    const genre2 = await this.db.genre.create({
      data: { name: 'drama', description: 'drama description ...' },
    });

    const genre3 = await this.db.genre.create({
      data: { name: 'horror', description: 'horror description ...' },
    });

    const genre4 = await this.db.genre.create({
      data: { name: 'sport', description: 'sport description ...' },
    });

    const genre5 = await this.db.genre.create({
      data: { name: 'romantic', description: 'romantic description ...' },
    });

    const genre6 = await this.db.genre.create({
      data: { name: 'psyho', description: 'psyho description ...' },
    });

    // ______________________________

    const title1 = await this.db.title.create({
      data: {
        name: 'BTOOM',
        description:
          'В 22 года Рёта Сакамото ненавидит реальный мир. Что в нем есть хорошего? Друзей нету, Мать, которая постоянно компостирует мозги и заставляет искать работу. Нет ничего, что бы могло удержать его от онлайн-игры, в которой Сакамото лидер в общем рейтинге. Но что будет, если виртуальный мир вдруг поменяется местами с реальностью? Что, если однажды утром ты проснешься не в собственной кровати, а на острове, где есть только одно правило - убей или будь убитым? Сможет ли наш герой выжить и выяснить, кто стоит за этой жестокой игрой?',
        type: 'MANGA',
        status: 'ONGOING',
        authorId: Oda.id,
        imgUrl:
          'https://cover.imglib.info/uploads/cover/btoom/cover/oIICYMFMS4SH_250x350.jpg',
        rating: 8,
        yearRelease: 1895,
      },
    });

    const title2 = await this.db.title.create({
      data: {
        name: 'Berserk',
        description:
          'Гатс, известный как Чёрный Мечник, ищет убежища от демонов, охотящихся за ним, и отмщения человеку, сделавшему из него жертву на своём алтаре. С помощью только своей титанической силы, умения и меча, Гатс должен биться против жестокого рока, пока битва с ненавистью мало-помалу лишает его человечности. Берсерк — это тёмная и погружающая в раздумья история о неистовых сражениях и безжалостном роке.',
        type: 'MANHWA',
        status: 'ANNOUNCEMENT',
        authorId: Oda.id,
        imgUrl:
          'https://cover.imglib.info/uploads/cover/berserk/cover/QPXzTLH6zrIw_250x350.jpg',
        rating: 10,
        yearRelease: 2001,
      },
    });

    const title3 = await this.db.title.create({
      data: {
        name: 'Claymore',
        description:
          'В мире, где монстры по имени Йома охотятся на людей и живут среди них, маскируясь, единственная надежда человечества — новая порода воинов, известных как Клейморы. Наполовину люди, наполовину монстры, эти сереброглазые истребители обладают сверхъестественной силой, но обречены бороться со своими дикими порывами или полностью потерять человечность.        ',
        type: 'MANGA',
        status: 'FINISHED',
        authorId: Oda.id,
        imgUrl:
          'https://cover.imglib.info/uploads/cover/claymore/cover/IvGp6xsjocAM_250x350.jpg',
        rating: 9,
        yearRelease: 2003,
      },
    });

    const title4 = await this.db.title.create({
      data: {
        name: 'Dwaejiuri',
        description:
          'Расслабляющий отдых в раю или смертельная ловушка? Главный герой просыпается на захватывающем дух пляже, но понятия не имеет, кто он и как сюда попал. Как бы он ни пытался собрать всё воедино, распутать эту головокружительную тайну будет нелегко, когда каждая подсказка ведёт к ещё более безумным вопросам... и семья, которая приветствует его в своем доме, не такая, какой кажется.        ',
        type: 'COMICS',
        status: 'SUSPENDED',
        authorId: Oda.id,
        imgUrl:
          'https://cover.imglib.info/uploads/cover/dwaejiuri-/cover/HoQzzL1Ov53y_250x350.jpg',
        rating: 4,
        yearRelease: 2023,
      },
    });

    const title5 = await this.db.title.create({
      data: {
        name: 'Kanojo no Tokutouseki',
        description: 'Манга о юноше, и его особенной посетительнице.',
        type: 'MAMHUA',
        status: 'FINISHED',
        authorId: Oda.id,
        imgUrl:
          'https://cover.imglib.info/uploads/cover/kanojo-no-tokutousek-sh1r0/cover/ymhV8i3Tglsd_250x350.jpg',
        rating: 8,
        yearRelease: 2020,
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

    const comment1ForTitle5 = await this.titleCommentsService.create(
      title5.id,
      null,
      user1.id,
      'message from user 1 to title5',
    );

    await this.db.titleCommentLike.create({
      data: { userId: user1.id, commentId: comment1ForTitle5.id },
    });

    await this.db.titleCommentDislike.create({
      data: { userId: user2.id, commentId: comment1ForTitle5.id },
    });

    const comment2ForTitle5 = await this.titleCommentsService.create(
      title5.id,
      comment1ForTitle5.id,
      user2.id,
      'message from user 2 to title5 to user 1',
    );

    const comment3ForTitle5 = await this.titleCommentsService.create(
      title5.id,
      comment2ForTitle5.id,
      user1.id,
      'nested message to user 1',
    );

    const comment4ForTitle5 = await this.titleCommentsService.create(
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

    const comment6ForTitle5 = await this.titleCommentsService.create(
      title5.id,
      comment2ForTitle5.id,
      user1.id,
      'message from user 1 to title2 to user2',
    );

    // _________________________________

    const chapter1ForTitle5 = await this.chapterService.create(
      title5.id,
      'chapter1Fortitle5',
      1,
      1,
    );

    // ______________________________________

    const page1ForChaper1 = await this.pageService.create(
      title5.id,
      chapter1ForTitle5.number,
      'https://img33.imgslib.link//manga/kanojo-no-tokutousek-sh1r0/chapters/1-1/nn001.png.jpg',
      1,
    );

    const page2ForChaper1 = await this.pageService.create(
      title5.id,
      chapter1ForTitle5.number,
      'https://img2.mixlib.me//manga/kanojo-no-tokutousek-sh1r0/chapters/1-1/nn002.png.jpg',
      2,
    );

    const page3ForChaper1 = await this.pageService.create(
      title5.id,
      chapter1ForTitle5.number,
      'https://img33.imgslib.link//manga/kanojo-no-tokutousek-sh1r0/chapters/1-1/nn003.png.jpg',
      3,
    );

    const page4orChaper1 = await this.pageService.create(
      title5.id,
      chapter1ForTitle5.number,
      'https://img2.mixlib.me//manga/kanojo-no-tokutousek-sh1r0/chapters/1-1/nn004.png.jpg',
      4,
    );

    const page5ForChaper1 = await this.pageService.create(
      title5.id,
      chapter1ForTitle5.number,
      'https://img2.mixlib.me//manga/kanojo-no-tokutousek-sh1r0/chapters/1-1/nn005.png.jpg',
      5,
    );

    const page6ForChaper1 = await this.pageService.create(
      title5.id,
      chapter1ForTitle5.number,
      'https://img33.imgslib.link//manga/kanojo-no-tokutousek-sh1r0/chapters/1-1/nn006.png.jpg',
      6,
    );

    const page7ForChaper1 = await this.pageService.create(
      title5.id,
      chapter1ForTitle5.number,
      'https://img33.imgslib.link//manga/kanojo-no-tokutousek-sh1r0/chapters/1-1/nn010.png.jpg',
      7,
    );
    //___________________________________________________________________________________

    const comment1ForPage1 = await this.pageCommentsService.create(
      title5.id,
      chapter1ForTitle5.number,
      page1ForChaper1.number,
      user1.id,
      'message from user 1 to page1',
      null,
    );

    await this.db.pageCommentLike.create({
      data: { userId: user1.id, commentId: comment1ForPage1.id },
    });

    await this.db.pageCommentDislike.create({
      data: { userId: user2.id, commentId: comment1ForPage1.id },
    });

    const comment2ForPage1 = await this.pageCommentsService.create(
      title5.id,
      chapter1ForTitle5.number,
      page1ForChaper1.number,
      user2.id,
      'message from user 2 to user 1 on page1',
      comment1ForPage1.id,
    );

    const comment3ForPage1 = await this.pageCommentsService.create(
      title5.id,
      chapter1ForTitle5.number,
      page1ForChaper1.number,
      user2.id,
      'message from user 2 to user 2 on page1',
      comment2ForPage1.id,
    );

    const comment4ForPage1 = await this.pageCommentsService.create(
      title5.id,
      chapter1ForTitle5.number,
      page1ForChaper1.number,
      user2.id,
      'message from user 2 to page1',
      null,
    );

    const comment5ForPage1 = await this.pageCommentsService.create(
      title5.id,
      chapter1ForTitle5.number,
      page1ForChaper1.number,
      user1.id,
      'message from user 1 to page1 second not nested',
      null,
    );

    const comment6ForPage1 = await this.pageCommentsService.create(
      title5.id,
      chapter1ForTitle5.number,
      page1ForChaper1.number,
      user2.id,
      'message from user 2 to user 1 on page1 second',
      comment1ForPage1.id,
    );
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
