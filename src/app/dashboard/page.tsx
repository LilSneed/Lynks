import { auth, currentUser } from "@clerk/nextjs";
import React from "react";
import { prisma } from "../db";
import CreateCluster from "@/components/CreateCluster";
import { Separator } from "@/components/ui/separator";
import Cluster from "@/components/Cluster";

export default async function page() {
  const { userId: userAuthId } = await auth();
  const user = await currentUser();

  const userData = {
    authId: userAuthId,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.firstName,
  };

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
  console.log(checkDbId);
  if (checkDbId === null) {
    await fetch("http://localhost:3000/api/createUser", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  const userClusters = checkDbId?.clusters;

  return (
    <section className="mt-20 flex flex-col justify-center text-center container">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Edit Cluster
      </h2>
      <div className="flex flex-col md:flex-row justify-center">
        {userClusters?.map((cluster) => (
          <div
            className="flex md:flex-row flex-col items-center justify-center"
            key={cluster.id}
          >
            <Cluster
              id={cluster.id}
              img={user?.imageUrl || ""}
              url={cluster.url}
              key={cluster.id}
              title={cluster.title}
            />
          </div>
        ))}
      </div>
      <Separator />
      <div className="flex justify-center">
        {checkDbId && userAuthId && user && (
          <CreateCluster
            userId={checkDbId.id}
            authId={userAuthId}
            img={user?.imageUrl}
          />
        )}
      </div>
    </section>
  );
}
