import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET a specific reflection by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`[GET] /api/reflections/${params.id} - Fetching reflection`);

    const reflection = await prisma.reflection.findUnique({
      where: { id: params.id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!reflection) {
      console.log(`[GET] /api/reflections/${params.id} - Reflection not found`);
      return NextResponse.json(
        { error: "Reflection not found" },
        { status: 404 }
      );
    }

    console.log(`[GET] /api/reflections/${params.id} - Found reflection`);

    // Format the response
    const formattedReflection = {
      ...reflection,
      tags: reflection.tags.map((tag) => tag.tag.name),
    };

    return NextResponse.json(formattedReflection);
  } catch (error) {
    console.error(`[GET] /api/reflections/${params.id} - Error:`, error);
    return NextResponse.json(
      {
        error: "Failed to fetch reflection",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// PUT to update a reflection
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`[PUT] /api/reflections/${params.id} - Updating reflection`);

    const body = await req.json();
    const { mood, content, tags } = body;

    console.log(`[PUT] /api/reflections/${params.id} - Request body:`, {
      mood,
      contentLength: content?.length || 0,
      tags,
    });

    // Get the existing reflection to check if it exists
    const existingReflection = await prisma.reflection.findUnique({
      where: { id: params.id },
    });

    if (!existingReflection) {
      console.log(`[PUT] /api/reflections/${params.id} - Reflection not found`);
      return NextResponse.json(
        { error: "Reflection not found" },
        { status: 404 }
      );
    }

    console.log(`[PUT] /api/reflections/${params.id} - Deleting existing tags`);

    // Delete existing tags for this reflection
    await prisma.reflectionTag.deleteMany({
      where: { reflectionId: params.id },
    });

    // Create new tag connections
    const tagObjects = [];
    if (tags && tags.length > 0) {
      console.log(
        `[PUT] /api/reflections/${params.id} - Processing ${tags.length} tags`
      );

      for (const tagName of tags) {
        try {
          // Find or create the tag
          const tag = await prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          });
          tagObjects.push({ tagId: tag.id });
          console.log(
            `[PUT] /api/reflections/${params.id} - Processed tag: ${tagName}`
          );
        } catch (tagError) {
          console.error(
            `[PUT] /api/reflections/${params.id} - Error with tag ${tagName}:`,
            tagError
          );
        }
      }
    }

    console.log(
      `[PUT] /api/reflections/${params.id} - Updating reflection with ${tagObjects.length} tags`
    );

    // Update the reflection with new data
    const updatedReflection = await prisma.reflection.update({
      where: { id: params.id },
      data: {
        mood: mood || existingReflection.mood,
        content: content !== undefined ? content : existingReflection.content,
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
      `[PUT] /api/reflections/${params.id} - Successfully updated reflection`
    );

    // Format the response
    const formattedReflection = {
      ...updatedReflection,
      tags: updatedReflection.tags.map((tag) => tag.tag.name),
    };

    return NextResponse.json(formattedReflection);
  } catch (error) {
    console.error(`[PUT] /api/reflections/${params.id} - Error:`, error);
    return NextResponse.json(
      {
        error: "Failed to update reflection",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// DELETE a reflection
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if the reflection exists
    const reflection = await prisma.reflection.findUnique({
      where: { id: params.id },
    });

    if (!reflection) {
      return NextResponse.json(
        { error: "Reflection not found" },
        { status: 404 }
      );
    }

    // Delete the reflection (cascade will delete related ReflectionTags)
    await prisma.reflection.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting reflection:", error);
    return NextResponse.json(
      { error: "Failed to delete reflection" },
      { status: 500 }
    );
  }
}
