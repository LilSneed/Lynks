import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../db";
import { auth, currentUser, clerkClient } from "@clerk/nextjs";

export async function GET(request: NextRequest) {
  const clusterIdString = request.nextUrl.searchParams.get("id");
  const clusteUrl = request.nextUrl.searchParams.get("url");
  let clusterId;

  if (clusterIdString !== null && clusteUrl) {
    clusterId = parseInt(clusterIdString);
  } else {
    return NextResponse.json("The 'id' query parameter is required", {
      status: 400,
    });
  }

  try {
    const cluster = await prisma.cluster.findFirst({
      where: { url: clusteUrl },
      include: { relatedClusters: true },
    });

    return NextResponse.json(cluster);
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while fetching the cluster",
    });
  }
}
