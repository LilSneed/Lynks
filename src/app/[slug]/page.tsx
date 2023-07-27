import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

export default function page({ params }: { params: { slug: string } }) {
  return <div>hello from {params.slug}</div>;
}
