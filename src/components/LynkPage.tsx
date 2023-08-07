import React from "react";
import Image from "next/image";
import Lynk from "./Lynk";
import RelatedMenu from "./RelatedMenu";
import cluster from "cluster";

export default function LynkPage({
  lynks,
  clusterData,
  key,
}: {
  lynks: Array<any>;
  clusterData: Array<any>;
  key: number;
}) {
  const PhRelated = [
    {
      id: 1,
      creatorId: 1,
      image: "clusterImage",
      url: "clusterUrl",
      title: "PH Cluster",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et arcu vel leo dictum laoreet sed vulputate nulla. Nullam vitae congue nisi. Donec ultrices orci in pharetra dictum placerat.",
    },
    {
      id: 2,
      creatorId: 1,
      image: "clusterImage",
      url: "clusterUrl",
      title: "PH Cluster2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et arcu vel leo dictum laoreet sed vulputate nulla. Nullam vitae congue nisi. Donec ultrices orci in pharetra dictum placerat.",
    },
  ];

  return (
    <div className="container flex flex-col mt-10 mb-5" key={key}>
      <div className="flex justify-center flex-col">
        <div className="self-start ">
          <RelatedMenu relatedClusters={PhRelated} />
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
      <p className="self-center leading-7 [&:not(:first-child)]:mt-6">
        {clusterData[0].description}
      </p>
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
    </div>
  );
}
