"use client";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FiPlus, FiUser, FiShare2, FiEye, FiMinus } from "react-icons/fi";

export default function Sidebar({
  nodeData,
  relatedData,
  currentUrl,
  authId,
  currentClusterId,
  ClusterAuthId,
}: any) {
  const [openPersonal, setOpenPersonal] = useState(false);
  const [openRelated, setOpenRelated] = useState(false);

  const linkClick = async (nodeUrl: string) => {
    const data = {
      authId: authId,
      clusterId: currentClusterId,
      relatedClusterUrl: nodeUrl,
      thisUrl: currentUrl,
    };
    await fetch("http://localhost:3000/api/connectCluster", {
      method: "POST",
      body: JSON.stringify(data),
    });
    router.refresh();
  };
  console.log(authId, currentClusterId, ClusterAuthId);
  const disconnectCluster = async (nodeUrl: string) => {
    const data = {
      authId: authId,
      clusterId: currentClusterId,
      relatedClusterUrl: nodeUrl,
      thisUrl: currentUrl,
    };
    await fetch("http://localhost:3000/api/disconnectCluster", {
      method: "POST",
      body: JSON.stringify(data),
    });
    router.refresh();
  };
  const relatedIds = relatedData.map((node: any) => node.id);

  const router = useRouter();
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
  console.log();
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
            <div className="" key={node.id}>
              <div className="py-2 flex flex-row justify-between">
                <Link
                  href={`/${node.url}`}
                  className="px-2 hover:border-b hover:border-white transition-all duration-200 border-background border-b"
                >
                  <h1>{node.title}</h1>
                </Link>
                {node.url !== currentUrl &&
                  !relatedIds.includes(node.id) &&
                  ClusterAuthId == authId && (
                    <button
                      className="hover:bg-emerald-300 hover:text-black transition-colors duration-200 rounded-full"
                      onClick={() => linkClick(node.url)}
                      key={node.id}
                    >
                      <FiPlus />
                    </button>
                  )}
                {node.url == currentUrl && <FiEye />}
                {relatedIds.includes(node.id) &&
                  node.url !== currentUrl &&
                  ClusterAuthId == authId && (
                    <button
                      className="hover:bg-red-400 hover:text-black transition-colors duration-200 rounded-full"
                      onClick={() => disconnectCluster(node.url)}
                      key={node.id}
                    >
                      <FiMinus />
                    </button>
                  )}
              </div>
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
