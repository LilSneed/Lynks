"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
export default function Lynk({
  img,
  url,
  id,
  edit,
}: {
  id: number;
  img: string;
  url: string;
  edit: boolean;
}) {
  return (
    <div className="mt-5">
      {edit && (
        <div className="text-center items-center flex justify-end">
          <Link href={`/edit/${url}`}>
            <Button variant="ghost" className="bg-secondary mr-10">
              Edit
            </Button>
          </Link>
        </div>
      )}
      <Link href={`/${url}`} key={id}>
        <div className="bg-red-50 flex flex-row rounded-full">
          <Image
            src={img}
            height={70}
            width={70}
            alt="user image"
            className="rounded-full"
          />
          <h2 className="text-black text-center grow self-center scroll-m-20 text-2xl font-semibold tracking-tight pr-16">
            {url}
          </h2>
        </div>
      </Link>
    </div>
  );
}
