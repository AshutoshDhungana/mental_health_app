import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET handler to retrieve reflections
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    console.log("[GET] /api/reflections - Request params:", {
      userId,
      startDate,
      endDate,
    });

    // Validation check
    if (!userId) {
      console.log("[GET] /api/reflections - Missing userId");
      return NextResponse.json(
        { error: "userId is required" },
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

    console.log(
      "[GET] /api/reflections - Executing query with filters:",
      where
    );

    const reflections = await prisma.reflection.findMany({
      where,
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    console.log(
      `[GET] /api/reflections - Found ${reflections.length} reflections`
    );

    // Transform the data to include tag names directly
    const formattedReflections = reflections.map((reflection) => ({
      ...reflection,
      tags: reflection.tags.map((tag) => tag.tag.name),
    }));

    return NextResponse.json(formattedReflections);
  } catch (error) {
    console.error("[GET] /api/reflections - Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch reflections",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// POST handler to create a new reflection
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, date, mood, content, tags } = body;

    console.log("[POST] /api/reflections - Request body:", {
      userId,
      date,
      mood,
      contentLength: content ? content.length : 0,
      tags,
    });

    // Validation
    if (!userId || !date || !mood) {
      console.log("[POST] /api/reflections - Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields", received: { userId, date, mood } },
        { status: 400 }
      );
    }

    // Check if user exists and create if not
    console.log("[POST] /api/reflections - Checking if user exists:", userId);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      // Create a user record if it doesn't exist
      console.log(
        "[POST] /api/reflections - User not found, creating user:",
        userId
      );
      try {
        await prisma.user.create({
          data: {
            id: userId,
            email: `${userId.replace(
              /[^a-zA-Z0-9]/g,
              ""
            )}-auto@mindjournal.example.com`,
            name: "Journal User",
          },
        });
        console.log(
          `[POST] /api/reflections - Auto-created user with ID: ${userId}`
        );
      } catch (userError) {
        console.error(
          "[POST] /api/reflections - Error auto-creating user:",
          userError
        );
        return NextResponse.json(
          {
            error: "Failed to create user record",
            details: (userError as Error).message,
          },
          { status: 500 }
        );
      }
    }

    // Create or connect tags
    const tagObjects = [];
    if (tags && tags.length > 0) {
      console.log("[POST] /api/reflections - Processing tags:", tags);
      for (const tagName of tags) {
        // Find or create the tag
        try {
          const tag = await prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          });
          tagObjects.push({ tagId: tag.id });
          console.log(
            `[POST] /api/reflections - Processed tag: ${tagName} (${tag.id})`
          );
        } catch (tagError) {
          console.error(
            `[POST] /api/reflections - Error creating tag ${tagName}:`,
            tagError
          );
        }
      }
    }

    try {
      console.log(
        "[POST] /api/reflections - Creating reflection with tags:",
        tagObjects.length
      );
      // Create the reflection with tags
      const reflection = await prisma.reflection.create({
        data: {
          userId,
          date: new Date(date),
          mood,
          content: content || "",
          tags: {
            create: tagObjects,
          },
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      console.log(
        `[POST] /api/reflections - Created reflection: ${reflection.id}`
      );

      // Format the response
      const formattedReflection = {
        ...reflection,
        tags: reflection.tags.map((tag) => tag.tag.name),
      };

      return NextResponse.json(formattedReflection, { status: 201 });
    } catch (reflectionError) {
      console.error(
        "[POST] /api/reflections - Error creating reflection:",
        reflectionError
      );
      return NextResponse.json(
        {
          error:
            "Failed to create reflection: " +
            (reflectionError as Error).message,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[POST] /api/reflections - Error in POST handler:", error);
    return NextResponse.json(
      { error: "Failed to process request", details: (error as Error).message },
      { status: 500 }
    );
  }
}
