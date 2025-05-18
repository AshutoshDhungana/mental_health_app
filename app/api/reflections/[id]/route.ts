import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET a specific reflection by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const reflection = await prisma.reflection.findUnique({
      where: { id: params.id },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });

    if (!reflection) {
      return NextResponse.json(
        { error: 'Reflection not found' },
        { status: 404 }
      );
    }

    // Format the response
    const formattedReflection = {
      ...reflection,
      tags: reflection.tags.map(tag => tag.tag.name)
    };

    return NextResponse.json(formattedReflection);
  } catch (error) {
    console.error('Error fetching reflection:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reflection' },
      { status: 500 }
    );
  }
}

// PUT to update a reflection
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { mood, content, tags } = body;

    // Get the existing reflection to check if it exists
    const existingReflection = await prisma.reflection.findUnique({
      where: { id: params.id }
    });

    if (!existingReflection) {
      return NextResponse.json(
        { error: 'Reflection not found' },
        { status: 404 }
      );
    }

    // Delete existing tags for this reflection
    await prisma.reflectionTag.deleteMany({
      where: { reflectionId: params.id }
    });

    // Create new tag connections
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

    // Update the reflection with new data
    const updatedReflection = await prisma.reflection.update({
      where: { id: params.id },
      data: {
        mood: mood || existingReflection.mood,
        content: content !== undefined ? content : existingReflection.content,
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
      ...updatedReflection,
      tags: updatedReflection.tags.map(tag => tag.tag.name)
    };

    return NextResponse.json(formattedReflection);
  } catch (error) {
    console.error('Error updating reflection:', error);
    return NextResponse.json(
      { error: 'Failed to update reflection' },
      { status: 500 }
    );
  }
}

// DELETE a reflection
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if the reflection exists
    const reflection = await prisma.reflection.findUnique({
      where: { id: params.id }
    });

    if (!reflection) {
      return NextResponse.json(
        { error: 'Reflection not found' },
        { status: 404 }
      );
    }

    // Delete the reflection (cascade will delete related ReflectionTags)
    await prisma.reflection.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting reflection:', error);
    return NextResponse.json(
      { error: 'Failed to delete reflection' },
      { status: 500 }
    );
  }
}
