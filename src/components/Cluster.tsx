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
      className="mt-5 rounded-full mx-5 flex-col flex-wrap sm:flex-row justify-center"
      key={id}
    >
      <div className="flex justify-center items-center ">
        <Link href={`/edit/${url}`}>
          <Button variant="ghost" className="bg-secondary">
            Edit
          </Button>
        </Link>
      </div>
      <Image
        width={150}
        height={150}
        src={img}
        alt="Cluster Picture"
        className="rounded-full mx-auto"
      />
      <p className="self-center grow">{title}</p>
    </div>
  );
}
