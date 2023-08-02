import { auth } from "@clerk/nextjs";
import React from "react";
import { prisma } from "../db";

import dynamic from "next/dynamic";
import Lynk from "@/components/Lynk";

import CreateCluster from "@/components/CreateCluster";
import { Separator } from "@/components/ui/separator";
import Cluster from "@/components/Cluster";

const InputForm = dynamic(() => import("../../components/CreateLynk"), {
  ssr: false,
});

export default async function page() {
  const { userId: userAuthId } = await auth();

  console.log(userAuthId);

  let checkDbId;
  if (userAuthId)
    checkDbId = await prisma.user.findFirst({
      where: {
        authId: userAuthId,
      },
      include: {
        clusters: true,
      },
    });

  const userLynks = checkDbId?.clusters;
  console.log(userLynks);
  return (
    <section className="mt-20 flex flex-col justify-center text-center container">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        My Clusters
      </h2>
      {userLynks?.map((lynk) => (
        <div
          className="flex md:flex-row flex-col items-center justify-center"
          key={lynk.id}
        >
          <Cluster
            id={lynk.id}
            img={"https://placehold.co/600x400/pngplaceholder.com/600x400.png"}
            url={lynk.url}
            key={lynk.id}
            title={lynk.title}
          />
          <Cluster
            id={lynk.id}
            img={"https://placehold.co/600x400/pngplaceholder.com/600x400.png"}
            url={lynk.url}
            key={lynk.id}
            title={lynk.title}
          />
          <Cluster
            id={lynk.id}
            img={"https://placehold.co/600x400/pngplaceholder.com/600x400.png"}
            url={lynk.url}
            key={lynk.id}
            title={lynk.title}
          />
        </div>
      ))}
      <Separator />
      <div className="">
        <CreateCluster />
      </div>
    </section>
  );
}
