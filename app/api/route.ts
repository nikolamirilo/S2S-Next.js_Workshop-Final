import { NextResponse } from 'next/server'

export async function POST() {
  try {
    return NextResponse.json("This is API route");
  } catch (error) {
    return new NextResponse((error as Error).message);
  }
}