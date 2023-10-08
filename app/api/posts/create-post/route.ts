import { createPost } from '@/utils/posts';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const newPost = await request.json();
    await createPost(newPost);
    return NextResponse.json({message:"Post Added Successully"},{status:200});
  } catch (error) {
    return new NextResponse((error as Error).message);
  }
}