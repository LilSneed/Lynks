import { auth } from "@clerk/nextjs";
import React from "react";
import { prisma } from "../db";
import Image from "next/image";

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
        lynks: true,
      },
    });

  const userLynks = checkDbId?.lynks;
  console.log(userLynks);
  return (
    <section className="mt-20 flex flex-col justify-center text-center container">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        My Lynks
      </h2>
      {userLynks?.map((lynk) => (
        <div
          className="bg-red-50 flex flex-row rounded-full mt-5 p-5"
          key={lynk.id}
        >
          <Image
            src="https://placehold.co/600x400.png"
            height={120}
            width={90}
            alt="user image"
            className="rounded-full"
          />
          <h2 className="text-black text-center grow self-center scroll-m-20 text-2xl font-semibold tracking-tight pr-16">
            {lynk.url}
          </h2>
        </div>
      ))}
    </section>
  );
}
