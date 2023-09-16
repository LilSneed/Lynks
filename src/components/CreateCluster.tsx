"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function CreateCluster({
  userId,
  authId,
  img,
}: {
  userId: number;
  authId: string;
  img: string;
}) {
  const [clusterTitle, setClusterTitle] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();

  const generateString = (length: number) => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789-_";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    result += Date.now() % 100;

    return result;
  };

  const clusterData = {
    creatorId: userId,
    authId: authId,
    image: img,
    url: generateString(10),
    title: clusterTitle,
    description: "Cluster Description...",
    content: "# Hello there",
  };
  const handleClusterUrlChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setClusterTitle(event.target.value);
  };

  const handleSubmit = async () => {
    if (!clusterTitle) {
      setError("⚠️ Cluster Title Cannot be empty ⚠️");
      return;
    }
    await fetch("http://localhost:3000/api/createCluster", {
      method: "POST",
      body: JSON.stringify(clusterData),
    });
    setError("Cluster created successfully");
    router.refresh();
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email" className="self-center">
        Create Cluster
      </Label>
      <Input
        type="title"
        placeholder="Cluster Title"
        value={clusterTitle}
        onChange={handleClusterUrlChange}
      />
      <Button variant="secondary" onClick={handleSubmit}>
        Create
      </Button>
      {error && <p className="text-white">{error}</p>}
      <p className="text-sm text-muted-foreground">
        This will be your Cluster Name, you will be able to edit it afterwards.
      </p>
    </div>
  );
}
