import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";
import { prisma } from "../../db";
import Image from "next/image";
import cluster from "cluster";
import Lynk from "@/components/Lynk";
import LynkPage from "@/components/LynkPage";

export default async function page({ params }: { params: { slug: string } }) {
  const clusterData = await prisma.cluster.findMany({
    where: {
      url: params.slug,
    },
    include: {
      lynks: true,
      relatedClusters: true,
    },
  });

  console.log(clusterData[0], "clusterdata");
  return (
    <section>
      {clusterData.length > 0 && (
        <LynkPage
          lynks={clusterData[0].lynks}
          clusterData={clusterData}
          key={1}
          relatedClusters={clusterData[0].relatedClusters}
        />
      )}
      {clusterData.length === 0 && (
        <h1>{`No Cluster Resides at this URL :(`}</h1>
      )}
    </section>
  );
}
