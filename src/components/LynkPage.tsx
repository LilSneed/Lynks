import React from "react";
import Image from "next/image";
import Lynk from "./Lynk";
import { Separator } from "../components/ui/separator";
import MdTextArea from "./MdTextArea";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/app/db";
import Sidebar from "./Sidebar";

export default async function LynkPage({
  lynks,
  clusterData,
  key,
  relatedClusters,
}: {
  lynks: Array<any>;
  clusterData: Array<any>;
  key: number;
  relatedClusters: Array<any>;
}) {
  const user = await currentUser();

  return (
    <div className=" flex flex-row justify-between gap-2 grow px-20">
      <div className="flex flex-col mt-10 mb-20 xl:pr-20 grow" key={key}>
        <div className="flex justify-center flex-col">
          <Image
            src={clusterData[0].image}
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full self-end"
          />
        </div>
        <h2 className="self-center mt-2 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          {clusterData[0].title}
        </h2>
        <p className="text-xl text-muted-foreground text-center">
          {clusterData[0].description}
        </p>

        <div className="flex gap-2">
          {lynks.map((lynk) => (
            <Lynk
              id={lynk.id}
              img={lynk.image}
              url={lynk.url}
              edit={false}
              title={lynk.title}
              color={lynk.color}
            />
          ))}
        </div>
        <Separator />
        <div className="">
          <MdTextArea content={clusterData[0].content} />
        </div>
      </div>
    </div>
  );
}
