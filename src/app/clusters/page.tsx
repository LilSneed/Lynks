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
  }));

  const clusterLinks = userClusters.flatMap((cluster) =>
    cluster.relatedClusters.map((relatedCluster) => ({
      source: cluster.title,
      target: relatedCluster.title,
    }))
  );

  const graphData = {
    nodes: clusterNodes,
    links: clusterLinks,
  };
  console.log("links", clusterLinks);
  console.log("nodes", clusterNodes);
  console.log(graphData);
  return (
    <div className="">
      <D3test clusterData={graphData} />
    </div>
  );
}
