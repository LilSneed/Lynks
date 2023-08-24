import { prisma } from "@/app/db";
import React from "react";
import testData from "../../../../public/data.json";

import dynamic from "next/dynamic";

const D3test = dynamic(() => import("../../../components/D3test"), {
  ssr: false,
});

export default async function page({ params }: { params: { slug: string } }) {
  const clusterData = await prisma.cluster.findMany({
    where: {
      url: params.slug,
    },
    include: {
      lynks: true,
      relatedClusters: {
        include: {
          relatedClusters: {
            include: {
              relatedClusters: true,
              lynks: true,
              belongsToClusters: true,
            },
          },
          lynks: true,
        },
      },
    },
  });

  const parentClusters = (await prisma.cluster.findUnique({
    where: { id: clusterData[0].id },
    include: {
      belongsToClusters: true,
    },
  })) as ParentClusters;

  function removeCurrentCluster(cluster: any, currentClusterId: number) {
    // Check if the cluster has a relatedClusters property
    if (cluster.relatedClusters) {
      // Filter out the current cluster from the relatedClusters array
      cluster.relatedClusters = cluster.relatedClusters.filter(
        (relatedCluster: any) => relatedCluster.id !== currentClusterId
      );

      // Recursively call the function for each related cluster
      cluster.relatedClusters.forEach((relatedCluster: any) =>
        removeCurrentCluster(relatedCluster, currentClusterId)
      );
    }
  }

  if (parentClusters) {
    // Rename the 'belongsToClusters' property to 'relatedClusters'
    parentClusters.relatedClusters = parentClusters.belongsToClusters;
    delete parentClusters.belongsToClusters;

    // Call the recursive function to remove the current cluster from all levels of the relatedClusters array
    removeCurrentCluster(parentClusters, clusterData[0].id);
  }

  console.log(parentClusters);

  return (
    <div className="m- flex justify-center">
      <D3test clusterData={clusterData[0]} parentData={parentClusters} />
    </div>
  );
}
