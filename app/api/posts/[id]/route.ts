import { NextResponse } from 'next/server'
import { getSinglePost, updatePost } from "@/utils/posts";
 
export async function GET() {
  return NextResponse.json("This is GET Single Post" )
}

export async function PUT(request: Request) {
  try {
    const { _id, likes} = await request.json();
    const update = await updatePost(_id, likes);
    if(update){
      return NextResponse.json({message: "Successfully Updated Action"}, {status:200})
    }else{
      return NextResponse.json({message: "There is error inside function"}, {status:500})
    }
  } catch (error) {
    return new Response((error as Error).message);
  }
}
 
export async function DELETE() {
  return NextResponse.json("This is DELETE Single Post" )
}