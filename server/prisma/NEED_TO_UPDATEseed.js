/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  await prisma.user.deleteMany();
  await prisma.list.deleteMany();
  await prisma.title.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.page.deleteMany();
  await prisma.pageComment.deleteMany();
  await prisma.titleComment.deleteMany();

  const danya = await prisma.user.create({
    data: { name: 'Danya', email: 'dd8556205@gmail.com', password: '123' },
  });
  const jorik = await prisma.user.create({
    data: { name: 'Jorik', email: 'jorikThee@gmail.com', password: '123' },
  });

  console.log(danya);
  console.log(jorik);

  const list1 = await prisma.list.create({
    data: {
      name: 'favorites',
      User: {
        connect: {
          id: danya.id,
        },
      },
    },
  });

  const list2 = await prisma.list.create({
    data: {
      name: 'reading',
      User: {
        connect: {
          id: jorik.id,
        },
      },
    },
  });

  const onePiece = await prisma.title.create({
    data: {
      name: 'One Piece',
      description:
        "it's manga about one guy who wanted to be the Pirate King. But if you are real capitan you need a team, right? So he start to earn him nakama's",
    },
  });

  const onePunchman = await prisma.title.create({
    data: {
      name: 'Onepunch-Man',
      description:
        "it's manga about one guy who can beat each mobster by one punch, but he hero cuz boring",
    },
  });

  const updatedList1 = await prisma.list.update({
    where: {
      id: list1.id,
    },

    data: {
      titles: {
        connect: {
          id: onePiece.id,
        },
      },
    },
  });

  const updatedList2 = await prisma.list.update({
    where: {
      id: list2.id,
    },
    data: {
      titles: {
        connect: {
          id: onePunchman.id,
        },
      },
    },
  });

  const onePiece1Comment1 = await prisma.titleComment.create({
    data: {
      message: 'onePieceChapter1Page1Comment1',
      userId: danya.id,
      titleId: onePiece.id,
    },
  });

  const onePieceComment1Childer1 = await prisma.titleComment.create({
    data: {
      parentId: onePiece1Comment1.id,
      message: 'onePieceChapter1Page1Comment1Childer1',
      userId: jorik.id,
      titleId: onePiece.id,
    },
  });

  const onePieceChapter1 = await prisma.chapter.create({
    data: {
      name: 'Strong World',
      titleId: onePiece.id,
    },
  });

  console.log(onePiece);

  const onePieceChapter1Page1 = await prisma.page.create({
    data: {
      imgUri: 'Frame1',
      number: 1,
      chapterId: onePieceChapter1.id,
    },
  });

  const onePieceChapter1Page2 = await prisma.page.create({
    data: {
      imgUri: 'Frame2',
      number: 2,
      chapterId: onePieceChapter1.id,
    },
  });

  const onePieceChapter1Page1Comment1 = await prisma.pageComment.create({
    data: {
      message: 'onePieceChapter1Page1Comment1',
      userId: danya.id,
      pageId: onePieceChapter1Page1.id,
    },
  });

  const onePieceChapter1Page1Comment1Childer1 = await prisma.pageComment.create(
    {
      data: {
        parentId: onePieceChapter1Page1Comment1.id,
        message: 'onePieceChapter1Page1Comment1Childer1',
        userId: jorik.id,
        pageId: onePieceChapter1Page1.id,
      },
    },
  );
}

seed();
