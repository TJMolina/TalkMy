
import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";


// autenticar usuario
export async function GET(request) {
  cookies().delete(process.env.COOKIE_SESSION_NAME)
  return NextResponse.json({}, { status: 200 });
} 