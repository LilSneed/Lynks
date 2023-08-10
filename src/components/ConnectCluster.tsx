"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function ConnectCluster({
  authId,
  id,
  namePh,
  thisUrl,
}: {
  authId: string;
  id: number;
  namePh: string;
  thisUrl: string;
}) {
  const [url, setUrl] = React.useState("");
  const router = useRouter();
  const titleData = {
    relatedClusterUrl: url,
    authId: authId,
    clusterId: id,
    thisUrl: thisUrl,
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:3000/api/connectCluster", {
      method: "POST",
      body: JSON.stringify(titleData),
    });
    router.refresh();
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <h4 className="text-center scroll-m-20 text-base font-semibold tracking-tight">
        Link to another Cluster
      </h4>
      <Input
        placeholder={namePh}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <p className="text-sm text-muted-foreground">
        This will create a ONE WAY connection between this cluster and another
        one. <br />
        Make sure the input is just the part after the " / " of the URL. <br />
      </p>
      <Button onClick={handleSubmit} className="lg:self-end">
        Update
      </Button>
    </div>
  );
}
