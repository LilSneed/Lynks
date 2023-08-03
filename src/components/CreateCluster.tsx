"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

export default function CreateCluster({
  userId,
  authId,
}: {
  userId: number;
  authId: string;
}) {
  const [clusterUrl, setClusterUrl] = React.useState("");

  const clusterData = {
    creatorId: userId,
    authId: authId,
    image: "clusterImage",
    url: clusterUrl,
    title: "My Cluster",
    description: "Cluster Description...",
  };
  const handleClusterUrlChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setClusterUrl(event.target.value);
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:3000/api/createCluster", {
      method: "POST",
      body: JSON.stringify(clusterData),
    });
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email" className="self-center">
        Create Cluster
      </Label>
      <Input
        type="url"
        placeholder="Cluster Url"
        value={clusterUrl}
        onChange={handleClusterUrlChange}
      />
      <Button variant="secondary" onClick={handleSubmit}>
        Create
      </Button>
      <p className="text-sm text-muted-foreground">
        This will be your Cluster URL, you will be able to edit it afterwards.
      </p>
    </div>
  );
}