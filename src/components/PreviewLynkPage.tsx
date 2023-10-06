"use client";

import React from "react";
import Image from "next/image";
import Lynk from "./Lynk";
import { Separator } from "../components/ui/separator";
import MdTextArea from "./MdTextArea";

export default function PreviewLynkPage({
  lynks,
  clusterData,
  key,
  content,
}: {
  lynks: Array<any>;
  clusterData: ClusterData;
  key: number;
  content: string;
}) {
  const handleFocus = (event: any) => {
    event.target.blur();
  };

  return (
    <div className=" flex flex-row justify-between gap-2 grow px-10">
      <div className="flex flex-col mt-10 mb-20 pr-15 grow" key={key}>
        <div className="flex justify-center flex-col">
          <Image
            src={clusterData.image}
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full self-end"
          />
        </div>
        <h2 className="self-center mt-2 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          {clusterData.title}
        </h2>
        <p className="text-xl text-muted-foreground text-center">
          {clusterData.description}
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
          <MdTextArea content={clusterData.content} />
        </div>
      </div>
    </div>
  );
}
