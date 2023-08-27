import { NextResponse } from 'next/server'
 
export async function GET() {
  return NextResponse.json("This is GET Single Post" )
}
 
export async function PUT() {
  return NextResponse.json("This is UPDATE Single Post" )
}
 
export async function DELETE() {
  return NextResponse.json("This is DELETE Single Post" )
}