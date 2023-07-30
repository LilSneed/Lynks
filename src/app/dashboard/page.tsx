import { auth } from "@clerk/nextjs";
import React from "react";
import { prisma } from "../db";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Lynk from "@/components/Lynk";

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
        <div className="" key={lynk.id}>
          <Lynk
            id={lynk.id}
            img={"https://placehold.co/600x400/pngplaceholder.com/600x400.png"}
            url={lynk.url}
            key={lynk.id}
            edit={true}
          />
        </div>
      ))}
    </section>
  );
}
