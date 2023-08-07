import React from "react";

export default function page() {
  return (
    <section className="flex justify-center mt-20 ">
      <div className="flex flex-col justify-center mx-auto">
        <p className="text-yellow-500">
          ⚠️ UI not re-rendering on new data/API calls, needs force refresh
        </p>
        <p className="text-yellow-500">⚠️ SIGNUP/SIGNIN redirects missing</p>
        <p className="text-yellow-500">
          ⚠️ Dashboard UI not rendering if first time user, needs one refresh
        </p>
      </div>
    </section>
  );
}
