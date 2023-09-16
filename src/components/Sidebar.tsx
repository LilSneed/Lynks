"use client";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React, { useState } from "react";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import { VscTypeHierarchySub } from "react-icons/vsc";
export default function Sidebar({ nodeData }: any) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if (open == true) {
      setOpen(false);
    } else {
      setOpen(true);
      console.log(nodeData);
    }
  };
  return (
    <div
      className={`min-h-[100vh] bg-background text-white  ${
        open ? "min-w-[20rem]" : "min-w-[0rem]"
      } transition-all duration-200 flex flex-row`}
    >
      <div className="border-r border-white px-3 py-10 flex justify-start flex-col gap-5 text-xl font-extrabold">
        <button onClick={handleClick} className="">
          <VscLayoutSidebarLeft />
        </button>
        <button>
          <VscTypeHierarchySub />
        </button>
      </div>
      <div
        className={`transition-opacity duration-200 grow p-3 text-center ${
          open ? "opacity-100" : "opacity-0 h-0 w-0 hidden"
        }`}
      >
        <div className="min-h-full">
          <div className="pt-10 scroll-m-20 text-xl font-semibold tracking-tight">
            <h4>My Clusters</h4>
            <Separator />
          </div>
          {nodeData.map((node: any) => (
            <div className="py-2 " key={node.id}>
              <Link href={`/${node.url}`}>
                <h1>{node.title}</h1>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
