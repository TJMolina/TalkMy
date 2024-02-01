
import { auth } from "firebase-admin";
import { customInitApp } from "@/libs/firebase-admin-config";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

// iniciar firebase
customInitApp();

export async function POST(request, response) {
  const authorization = cookies().get("auth-token");
  console.log(authorization)
  if (authorization) {
    const decodedToken = await auth().verifyIdToken(authorization.value);
    console.log(decodedToken)

    if (decodedToken) {
      //Generar cookie
        const localID = decodedToken.uid;
        console.log(localID)
    }
  }

  return NextResponse.json({}, { status: 200 });
}