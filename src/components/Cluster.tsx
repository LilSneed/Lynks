"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
export default function Cluster({
  img,
  url,
  id,
  title,
}: {
  id: number;
  img: string;
  url: string;
  title: string;
}) {
  return (
    <div
      className="mt-5 rounded-full mx-5 flex-col flex-wrap sm:flex-row"
      key={id}
    >
      <Image
        width={300}
        height={300}
        src={`https://placehold.co/600x400/png`}
        alt="Cluster Picture"
        className="rounded-full"
      />
      <p>{title}</p>
    </div>
  );
}
