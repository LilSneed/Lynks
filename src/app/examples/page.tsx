import React from "react";
import { prisma } from "../db";
import D3test from "@/components/D3test";

export default async function page() {
  const clusterData = await prisma.cluster.findMany({
    where: {
      url: "examplecluster",
    },
    include: {
      lynks: true,
      relatedClusters: {
        include: {
          relatedClusters: {
            include: {
              relatedClusters: true,
              lynks: true,
            },
          },
          lynks: true,
        },
      },
    },
  });

  console.log(clusterData);
  return (
    <section className="container mb-20 mt-20">
      <div className="">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Here are some ways on how a Cluster Graph View could look like
        </h1>
        <p className="text-xl text-foreground mt-2">
          In this first example we have a collection of information such as
          documentation, videos or blog posts related to the Javascript
          framework Next.js.
        </p>
        <p className="text-md text-muted-foreground">
          ( The following examples are for demonstrative purposes only, the
          information they provide is very basic. )
        </p>
        <div className="border border-white mt-5">
          <D3test clusterData={clusterData[0]} />
        </div>
        <p className="text-xl text-foreground mt-2">
          This is the Graph View from the Node
          <strong> 'Next.js 13 app router'</strong>, displaying all it's related
          Clusters. As you can see in the example, it also shows the connections
          to other related Clusters from the children of the parent Cluster.
        </p>
      </div>
    </section>
  );
}
