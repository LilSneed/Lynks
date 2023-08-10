import React from "react";
import Image from "next/image";
import Lynk from "./Lynk";
import RelatedMenu from "./RelatedMenu";
import cluster from "cluster";
import ClusterLynk from "./ClusterLynk";
import { Separator } from "../components/ui/separator";

export default function LynkPage({
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
  console.log(relatedClusters, "related cluster");
  return (
    <div className="container flex flex-col mt-10 mb-20 px-28" key={key}>
      <div className="flex justify-center flex-col">
        <div className="self-start ">
          <RelatedMenu relatedClusters={relatedClusters} />
        </div>

        <Image
          src={clusterData[0].image}
          alt="User Image"
          width={200}
          height={200}
          className="rounded-full self-center"
        />
      </div>
      <h2 className="self-center mt-2 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
        {clusterData[0].title}
      </h2>
      <p className="text-xl text-muted-foreground text-center">
        {clusterData[0].description}
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
