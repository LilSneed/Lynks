"use client";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FiUser, FiShare2 } from "react-icons/fi";

export default function Sidebar({ nodeData, relatedData }: any) {
  const [openPersonal, setOpenPersonal] = useState(false);
  const [openRelated, setOpenRelated] = useState(false);

  const handleClick =
    (
      x: boolean,
      setX: React.Dispatch<React.SetStateAction<boolean>>,
      setY: React.Dispatch<React.SetStateAction<boolean>>
    ) =>
    () => {
      setX(!x);
      if (x === false) {
        setY(false);
      }
    };

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpenPersonal(false);
        setOpenRelated(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`min-h-[100vh] bg-background text-white  ${
        openPersonal || openRelated ? "min-w-[20rem]" : "min-w-[0rem]"
      } transition-all duration-200 flex flex-row`}
    >
      <div className="border-r border-white px-3 py-10 flex justify-start flex-col gap-5 text-xl font-extrabold">
        <button
          onClick={handleClick(openPersonal, setOpenPersonal, setOpenRelated)}
        >
          <FiUser />
        </button>
        <button
          onClick={handleClick(openRelated, setOpenRelated, setOpenPersonal)}
        >
          <FiShare2 />
        </button>
      </div>
      <div
        className={`transition-opacity duration-200 grow p-3 text-center ${
          openPersonal ? "opacity-100" : "opacity-0 h-0 w-0 hidden"
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
      <div
        className={`transition-opacity duration-200 grow p-3 text-center ${
          openRelated ? "opacity-100" : "opacity-0 h-0 w-0 hidden"
        }`}
      >
        <div className="min-h-full">
          <div className="pt-10 scroll-m-20 text-xl font-semibold tracking-tight">
            <h4>Related Clusters</h4>
            <Separator />
          </div>
          {relatedData.map((node: any) => (
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
