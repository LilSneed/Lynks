import { NextResponse } from "next/server";
import { prisma } from "../../db";
import { auth, currentUser, clerkClient } from "@clerk/nextjs";

export async function DELETE(request: Request) {
  try {
    const userData = JSON.parse(await request.text());
    const user = await clerkClient.users.getUser(userData.authId);
    console.log(userData, "DATA");
    if (user) {
      try {
        await prisma.cluster.delete({
          where: { id: userData.id },
          include: { lynks: true },
        });

        return NextResponse.json("Cluster description updated successfully");
      } catch (error) {
        return NextResponse.json(
          "An error occurred while updating the cluster description"
        );
      }
    } else {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json("Bad request", { status: 400 });
  }
}
