import { NextResponse } from "next/server";
import { prisma } from "../../db";
import { auth, currentUser, clerkClient } from "@clerk/nextjs";

export async function POST(request: Request) {
  try {
    const requestData = JSON.parse(await request.text());
    const user = await clerkClient.users.getUser(requestData.authId);
    const { clusterId, relatedClusterUrl, thisUrl } = requestData;

    if (user && relatedClusterUrl !== thisUrl) {
      try {
        await prisma.cluster.update({
          where: { id: clusterId },
          data: {
            relatedClusters: {
              connect: { url: relatedClusterUrl },
            },
          },
        });
        console.log(requestData);
        return NextResponse.json("Cluster Connected Sucessfully");
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
