import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/libs/auth";

export async function POST(request) {
    console.log("istek geldi")
    const body = await request.json();
    // Make that below if condition as your own backend api call to validate user
        const token = await new SignJWT({
            email: body.email,
            jwtToken: body.jwtToken,
            userId: body.userId,            
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .sign(getJwtSecretKey());

        const response = NextResponse.json(
            { success: true },
            { status: 200, headers: { "content-type": "application/json" } }
        );
        response.cookies.set({
            name: "token",
            value: token,
            path: "/",
        });
        return response;
}