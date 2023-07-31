import { prisma } from "@/app/db";
import ChangeName from "@/components/ChangeName";
import CreateLynk from "@/components/CreateLynk";
import { ImageInput } from "@/components/ImageInput";
import PreviewLynkPage from "@/components/PreviewLynkPage";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default async function page({
  params,
}: {
  params: { lynkEdit: string };
}) {
  const clusterData = await prisma.cluster.findMany({
    where: {
      url: params.lynkEdit,
    },
    include: {
      lynks: true,
    },
  });

  const lynks = clusterData[0].lynks;
  console.log(lynks);
  return (
    <section className="flex lg:flex-row flex-col mt-10 mb-20 sm:container gap-5 min-h-screen">
      <div
        className="grow border border-white flex-1 -order-1 pointer-events-none rounded-xl text-center select-none"
        tabIndex={-1}
      >
        <p className="self-center">Cluster Preview</p>
        <Separator />
        <PreviewLynkPage lynks={lynks} clusterData={clusterData} key={1} />
      </div>
      <div className="grow flex-1 order-first lg:order-none flex flex-col">
        <div className="flex justify-center">
          <CreateLynk />
        </div>
        <Separator />
        <div className="grow flex justify-center items-start mt-5">
          <ChangeName namePh={clusterData[0].title} />
        </div>
        <div className="grow flex justify-center">
          <ImageInput />
        </div>
        <Separator className="hidden lg:inline-block" />
      </div>
    </section>
  );
}
