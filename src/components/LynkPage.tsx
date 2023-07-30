import React from "react";
import Image from "next/image";
import Lynk from "./Lynk";

export default function LynkPage({
  lynks,
  clusterData,
  key,
}: {
  lynks: Array<any>;
  clusterData: Array<any>;
  key: number;
}) {
  return (
    <div className="container flex flex-col mt-10 mb-5" key={key}>
      <div className="flex justify-center">
        <Image
          src={"https://placehold.co/600x600/pngplaceholder.com/600x600.png"}
          alt="User Image"
          width={200}
          height={200}
          className="rounded-full"
        />
      </div>
      <h2 className="self-center mt-2 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
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
    </div>
  );
}
