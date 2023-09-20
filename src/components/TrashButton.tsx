"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FiTrash2 } from "react-icons/fi";

export default function TrashButton({
  clusterId,
  auth,
}: {
  clusterId: number;
  auth: string;
}) {
  const router = useRouter();

  const userData = {
    id: clusterId,
    authId: auth,
  };
  const handleClick = async () => {
    await fetch("http://localhost:3000/api/deleteCluster", {
      method: "DELETE",
      body: JSON.stringify(userData),
    });
    router.refresh();
  };

  return (
    <button onClick={handleClick}>
      <FiTrash2 color="indianred" />
    </button>
  );
}
