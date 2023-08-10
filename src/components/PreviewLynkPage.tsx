"use client";

import React from "react";
import Image from "next/image";
import Lynk from "./Lynk";
import { Separator } from "../components/ui/separator";
import ClusterLynk from "./ClusterLynk";

export default function PreviewLynkPage({
  lynks,
  clusterData,
  key,
  relatedClusters,
}: {
  lynks: Array<any>;
  clusterData: ClusterData;
  key: number;
  relatedClusters: Array<any>;
}) {
  const handleFocus = (event: any) => {
    event.target.blur();
  };

  return (
    <div
      className="container flex flex-col mt-10 mb-5 xl:px-28"
      key={key}
      onFocus={handleFocus}
    >
      <div className="flex justify-center flex-col">
        <Image
          src={clusterData.image}
          alt="User Image"
          width={200}
          height={200}
          className="rounded-full self-center"
        />
      </div>
      <h2 className="self-center mt-2 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
        {clusterData.title}
      </h2>
      <p className="self-center text-xl text-muted-foreground text">
        {clusterData.description}
      </p>
      <Separator />
      {lynks.map((lynk) => (
        <Lynk
          key={lynk.id}
          id={lynk.id}
          edit={false}
          img={lynk.image}
          url={lynk.url}
          title={lynk.title}
          color={lynk.color}
        />
      ))}
      <Separator />
      {relatedClusters.map((cluster) => (
        <ClusterLynk
          image={cluster.image}
          url={cluster.url}
          title={cluster.title}
          description={cluster.description}
        />
      ))}
    </div>
  );
}
