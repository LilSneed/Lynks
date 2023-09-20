"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { FiTrash2 } from "react-icons/fi";
import TrashButton from "./TrashButton";
export default function Cluster({
  img,
  url,
  id,
  title,
  authId,
}: {
  id: number;
  img: string;
  url: string;
  title: string;
  authId: string;
}) {
  return (
    <div className="flex flex-row items-center justify-center p-5">
      <Link
        className="flex flex-row justify-center border border-white rounded-lg p-5 gap-5 hover:bg-teal-900 transition-colors duration-200 min-w-[10rem] max-w-[10rem]"
        key={id}
        href={`/edit/${url}`}
      >
        <p className="self-center font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
          {title}
        </p>
      </Link>
      <div className="self-start p-1">
        <TrashButton clusterId={id} auth={authId} />
      </div>
    </div>
  );
}
