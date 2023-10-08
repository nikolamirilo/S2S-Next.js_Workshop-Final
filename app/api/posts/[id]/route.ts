import { NextRequest, NextResponse } from 'next/server'
import {updatePost, getSinglePost, deleteSinglePost} from "@/utils/posts";
import { Post } from '@/typescript/interfaces';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const slug = params.id
  const singlePost: Post | undefined = await getSinglePost(slug)
  if(singlePost){
    return NextResponse.json({singlePost, message: `Successfully Found Post with id: ${slug}`}, {status:200})
  }else{
    return NextResponse.json({singlePost, message: `Post with id: ${slug} not found`}, {status:200})
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const slug = params.id
  try{
  await deleteSinglePost(slug)
  return NextResponse.json({message: `Successfully Deleted Post with id: ${slug}`}, {status:200})
  }
  catch (error) {
    return new Response((error as Error).message);
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const slug = params.id
    const {likes} = await request.json();
    const update = await updatePost(slug, likes);
    if(update){
      return NextResponse.json({message: "Successfully Updated Post"}, {status:200})
    }else{
      return NextResponse.json({message: "There is error inside function"}, {status:500})
    }
  } catch (error) {
    return new Response((error as Error).message);
  }
}
