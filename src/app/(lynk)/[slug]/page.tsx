import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";
import { prisma } from "../../db";
import Image from "next/image";
import cluster from "cluster";
import Lynk from "@/components/Lynk";

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
  return (
    <section className="container flex flex-col mt-10">
      <div className="flex justify-center">
        <Image
          src={"https://placehold.co/600x600/pngplaceholder.com/600x600.png"}
          alt="User Image"
          width={200}
          height={200}
          className="rounded-full"
        />
      </div>
      <h2 className="self-center mt-2 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {clusterData[0].title}
      </h2>
      {lynks.map((lynk) => (
        <Lynk
          id={lynk.id}
          edit={false}
          img={"https://placehold.co/600x600/pngplaceholder.com/600x600.png"}
          url={lynk.url}
        />
      ))}
    </section>
  );
}
