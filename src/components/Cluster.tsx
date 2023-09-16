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
    <div className="flex flex-row items-center justify-center p-5">
      <Link
        className="flex flex-row justify-center border border-white rounded-lg p-5 gap-5 hover:bg-teal-900 transition-colors duration-200"
        key={id}
        href={`/edit/${url}`}
      >
        <p className="self-center font-bold">{title}</p>
      </Link>
    </div>
  );
}
