import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export async function GET(request, res) {
  const cookieName = process.env.COOKIE_SESSION_NAME;
  cookies().delete(cookieName)
  return NextResponse.json({}, { status: 200 });
};
