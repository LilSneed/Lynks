import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function ClusterLynk({
  image,
  title,
  url,
  description,
}: {
  image: string;
  title: string;
  url: string;
  description: string;
}) {
  return (
    <div className="relative">
      <div className="absolute inset-0 filter -z-50 mt-5 blur-sm bg-gradient-to-r from-red-500 via-purple-500 to-orange-600"></div>
      <div className="rounded-lg bg-zinc-900 mt-5 p-3 relative">
        <Link href={`/${url}`}>
          <div className="flex flex-row justify-start rounded-full">
            <Image
              height={50}
              width={50}
              src={image}
              alt={title}
              className="rounded-full ml-5"
            />
            <h2 className="text-white text-center grow self-center scroll-m-20 text-lg md:text-md font-semibold tracking-tight">
              {title}
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
