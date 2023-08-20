import React from "react";

export default function BackgroundCircle({ radius, strokeWidth }: any) {
  return (
    <circle r={radius} fill="yellow" stroke="black" strokeWidth={strokeWidth} />
  );
}
