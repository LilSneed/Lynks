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
    },
  });

  const lynks = clusterData[0].lynks;
  console.log(clusterData);
  return <LynkPage lynks={lynks} clusterData={clusterData} key={1} />;
}
