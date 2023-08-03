"use client";

import React from "react";
import Image from "next/image";
import Lynk from "./Lynk";

export default function PreviewLynkPage({
  lynks,
  clusterData,
  key,
}: {
  lynks: Array<any>;
  clusterData: Object;
  key: number;
}) {
  const handleFocus = (event: any) => {
    event.target.blur();
  };
  return (
    <div
      className="container flex flex-col mt-10 mb-5"
      key={key}
      onFocus={handleFocus}
    >
      <div className="flex justify-center flex-col">
        <Image
          src={"https://placehold.co/600x600/pngplaceholder.com/600x600.png"}
          alt="User Image"
          width={200}
          height={200}
          className="rounded-full self-center"
        />
      </div>
      <h2 className="self-center mt-2 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
        {clusterData.title}
      </h2>
      <p className="self-center leading-7 [&:not(:first-child)]:mt-6">
        {clusterData.description}
      </p>
      {lynks.map((lynk) => (
        <Lynk
          key={lynk.id}
          id={lynk.id}
          edit={false}
          img={"https://placehold.co/600x600/pngplaceholder.com/600x600.png"}
          url={lynk.url}
        />
      ))}
    </div>
  );
}
