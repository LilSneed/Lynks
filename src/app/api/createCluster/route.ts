import { NextResponse } from "next/server";
import { prisma } from "../../db";
import { auth, currentUser, clerkClient } from "@clerk/nextjs";

export async function POST(request: Request) {
  try {
    const userData = JSON.parse(await request.text());
    const user = await clerkClient.users.getUser(userData.authId);

    if (user) {
      try {
        await prisma.cluster.create({
          data: userData,
        });
        console.log(Date.now());
        return NextResponse.json("User created successfully");
      } catch (error) {
        console.error(error);
        return NextResponse.json("An error occurred while creating the user");
      }
    } else {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json("Bad request", { status: 400 });
  }
}
