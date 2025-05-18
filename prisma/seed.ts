import { PrismaClient, Tag } from '../lib/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // --- Create Users ---
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      name: 'Alice Wonderland',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      name: 'Bob The Builder',
    },
  });

  console.log(`Created users: ${user1.name}, ${user2.name}`);

  // --- Define Tags ---
  const tagNames = [
    'mindfulness', 'work', 'self-care', 'grateful', 'challenge', 
    'project', 'learning', 'family', 'stress', 'exercise', 'hobby'
  ];
  
  const tags: Tag[] = [];
  for (const name of tagNames) {
    const tag = await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    tags.push(tag);
    console.log(`Created tag: ${tag.name}`);
  }

  // --- Helper to get random subset of tags ---
  const getRandomTags = (count: number) => {
    const shuffled = [...tags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  };

  // --- Create Reflections for User 1 (Alice) ---
  const aliceReflectionsData = [
    {
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
      mood: '😄', // Happy
      content: 'Had a fantastic day! Finished a major project at work and celebrated with friends. Feeling accomplished and grateful.',
      tagCount: 3,
    },
    {
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      mood: '😐', // Neutral
      content: 'A bit of a challenging day. Faced some unexpected hurdles with the new software update. Tried some mindfulness exercises to stay calm.',
      tagCount: 2,
    },
    {
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      mood: '😊', // Content
      content: 'Spent the evening reading a new book and learning about web development. It feels good to invest in personal growth.',
      tagCount: 2,
    },
    {
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      mood: '🙂', // Slightly Happy
      content: 'Went for a long run this morning. Exercise always boosts my mood. Feeling energetic and positive.',
      tagCount: 1,
    },
     {
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      mood: '😔', // Sad
      content: 'Feeling a bit overwhelmed with family commitments and work deadlines. Need to prioritize self-care.',
      tagCount: 2,
    }
  ];

  for (const data of aliceReflectionsData) {
    const reflectionTags = getRandomTags(data.tagCount);
    await prisma.reflection.create({
      data: {
        userId: user1.id,
        date: data.date,
        mood: data.mood,
        content: data.content,
        tags: {
          create: reflectionTags.map(tag => ({
            tagId: tag.id,
          })),
        },
      },
    });
  }
  console.log(`Created reflections for ${user1.name}`);

  // --- Create Reflections for User 2 (Bob) ---
  const bobReflectionsData = [
    {
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      mood: '😊',
      content: 'Productive day building a new feature for a side project. Love the feeling of creating something new.',
      tagCount: 3,
    },
    {
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      mood: '😄',
      content: 'Family picnic today! It was wonderful to spend quality time outdoors with loved ones. Feeling very happy and refreshed.',
      tagCount: 2,
    },
    {
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
      mood: '😐',
      content: 'Attended a workshop on stress management. Picked up some useful techniques. Still processing everything.',
      tagCount: 2,
    }
  ];

  for (const data of bobReflectionsData) {
    const reflectionTags = getRandomTags(data.tagCount);
    await prisma.reflection.create({
      data: {
        userId: user2.id,
        date: data.date,
        mood: data.mood,
        content: data.content,
        tags: {
          create: reflectionTags.map(tag => ({
            tagId: tag.id,
          })),
        },
      },
    });
  }
  console.log(`Created reflections for ${user2.name}`);

  console.log(`Seeding finished.`);
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
