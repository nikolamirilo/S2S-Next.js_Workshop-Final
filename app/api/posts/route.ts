import { deleteAllPosts, getAllPosts } from '@/utils/posts'
import { NextResponse } from 'next/server'

export const revalidate = 0;
export const dynamic = "force-dynamic";
 
export async function GET() {
  const posts  = await getAllPosts()
  return NextResponse.json(posts)
}
export async function DELETE() {
  await deleteAllPosts()
  return NextResponse.json({message: "Deleted All Posts"})
}
