import { prisma } from "@/app/db";
import React from "react";
import * as d3 from "d3";
import D3Example from "@/components/D3test";

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
      relatedClusters: true,
    },
  });
  const relatedClusters = clusterData[0].relatedClusters;
  return (
    <div className="m- flex justify-center">
      <D3test clusterData={clusterData[0]} />
    </div>
  );
}
