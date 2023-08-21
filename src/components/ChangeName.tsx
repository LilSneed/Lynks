"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function ChangeName({
  authId,
  id,
  namePh,
}: {
  authId: string;
  id: number;
  namePh: string;
}) {
  const [title, setTitle] = React.useState("");
  const [error, setError] = React.useState(""); // State for holding the error message

  const router = useRouter();
  const titleData = {
    title: title,
    authId: authId,
    id: id,
  };

  const handleSubmit = async () => {
    if (!title) {
      setError("Title cannot be empty!");
      return;
    }
    setError("");
    await fetch("http://localhost:3000/api/editClusterTitle", {
      method: "POST",
      body: JSON.stringify(titleData),
    });
    router.refresh();
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <h4 className="text-center scroll-m-20 text-base font-semibold tracking-tight">
        Change Cluster Title
      </h4>
      <Input
        placeholder={namePh}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button onClick={handleSubmit} className="lg:self-end">
        Update
      </Button>
    </div>
  );
}
