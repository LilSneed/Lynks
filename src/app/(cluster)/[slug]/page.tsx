import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";
import { prisma } from "../../db";
import Image from "next/image";
import cluster from "cluster";
import Lynk from "@/components/Lynk";
import LynkPage from "@/components/LynkPage";
import { currentUser } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";

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

  const user = await currentUser();

  const userClusters = await prisma.cluster.findMany({
    where: {
      authId: user?.id,
    },
  });

  const currentCluster = await prisma.cluster.findFirst({
    where: {
      url: params.slug,
    },
    include: {
      relatedClusters: true,
    },
  });

  console.log(user?.id);

  return (
    <section className="flex flex-row justify-between gap-5">
      <div className="fixed">
        <Sidebar
          nodeData={userClusters}
          relatedData={currentCluster?.relatedClusters}
          currentUrl={params.slug}
          authId={user?.id}
          currentId={currentCluster?.id}
        />
      </div>
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
