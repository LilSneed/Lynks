import { currentUser } from "@clerk/nextjs";
import React from "react";
import { prisma } from "../db";
import D3test from "@/components/D3test";
import { cluster } from "d3";

export default async function page() {
  const user = await currentUser();

  const userData = await prisma.user.findMany({
    where: {
      authId: user?.id,
    },
    include: {
      clusters: {
        include: {
          relatedClusters: true,
        },
      },
    },
  });
  const userClusters = userData[0].clusters;

  const clusterNodes = userClusters.map((cluster) => ({
    id: cluster.title,
    url: cluster.url,
    clusterId: cluster.id,
    creatorId: cluster.creatorId,
  }));

  const relatedClusters = userClusters
    .map((cluster) => cluster.relatedClusters)
    .flat()
    .map((cluster) => ({
      id: cluster.title,
      url: cluster.url,
      clusterId: cluster.id,
      creatorId: cluster.creatorId,
    }))
    .filter((cluster) => cluster.creatorId !== userData[0].id); // this returns all the related clusters of each cluster but only if  they don't belong to the current user to avoid double renders in the svg

  const clusterLinks = userClusters.flatMap((cluster) =>
    cluster.relatedClusters.map((relatedCluster) => ({
      source: cluster.title,
      target: relatedCluster.title,
    }))
  );

  const allClusters = [...relatedClusters, ...clusterNodes];

  console.log(allClusters);
  const graphData = {
    nodes: allClusters,
    links: clusterLinks,
  };

  return (
    <div className="container min-h-[100vh]">
      <div className="bg-zinc-800 m-10 rounded-xl flex justify-center min-h-[100vh]">
        <D3test clusterData={graphData} />
      </div>
    </div>
  );
}
