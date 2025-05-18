import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET handler to retrieve reflections
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    // Validation check
    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }
    // Build filter condition based on query parameters
    const where: any = {};
    
    if (userId) {
      where.userId = userId;
    }

    if (startDate || endDate) {
      where.date = {};
      if (startDate) {
        where.date.gte = new Date(startDate);
      }
      if (endDate) {
        where.date.lte = new Date(endDate);
      }
    }

    const reflections = await prisma.reflection.findMany({
      where,
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    });

    // Transform the data to include tag names directly
    const formattedReflections = reflections.map(reflection => ({
      ...reflection,
      tags: reflection.tags.map(tag => tag.tag.name)
    }));

    return NextResponse.json(formattedReflections);
  } catch (error) {
    console.error('Error fetching reflections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reflections' },
      { status: 500 }
    );
  }
}

// POST handler to create a new reflection
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, date, mood, content, tags } = body;

    // Validation
    if (!userId || !date || !mood) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user exists and create if not
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      // Create a user record if it doesn't exist
      // Using a default email based on userId and an empty name
      // You may want to modify this based on your auth system
      try {
        await prisma.user.create({
          data: {
            id: userId,
            email: `${userId.replace(/[^a-zA-Z0-9]/g, '')}-auto@mindjournal.example.com`,
            name: 'Journal User'
          }
        });
        console.log(`Auto-created user with ID: ${userId}`);
      } catch (userError) {
        console.error('Error auto-creating user:', userError);
        return NextResponse.json(
          { error: 'Failed to create user record' },
          { status: 500 }
        );
      }
    }

    // Create or connect tags
    const tagObjects = [];
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        // Find or create the tag
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName }
        });
        tagObjects.push({ tagId: tag.id });
      }
    }

    try {
      // Create the reflection with tags
      const reflection = await prisma.reflection.create({
        data: {
          userId,
          date: new Date(date),
          mood,
          content: content || '',
          tags: {
            create: tagObjects
          }
        },
        include: {
          tags: {
            include: {
              tag: true
            }
          }
        }
      });

      // Format the response
      const formattedReflection = {
        ...reflection,
        tags: reflection.tags.map(tag => tag.tag.name)
      };

      return NextResponse.json(formattedReflection, { status: 201 });
    } catch (reflectionError) {
      console.error('Error creating reflection:', reflectionError);
      return NextResponse.json(
        { error: 'Failed to create reflection: ' + (reflectionError as Error).message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
