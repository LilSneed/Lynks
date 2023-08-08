import React from "react";

export default function page() {
  return (
    <section className="flex justify-center mt-20 container">
      <div className="flex flex-col justify-center mx-auto">
        <p className="text-yellow-500">
          ⚠️ UI not re-rendering on new data/API calls, needs force refresh
        </p>
        <p className="text-yellow-500">⚠️ SIGNUP/SIGNIN redirects missing</p>
        <p className="text-yellow-500">
          ⚠️ Dashboard UI not rendering if first time user, needs one refresh
        </p>
        <h1>TODO</h1>
        <div className="text-lg text-red-500">
          <p>3. Render error on description edit failure</p>
          <p>4. Link Clusters</p>
          <p>5. Cluster data graph view</p>
          <p>6. Example page</p>
          <p>7. About Page</p>
          <p>8. desktop view of dashboard</p>
          <p>9. delete link on cluster functionality</p>
          <p>10. return error on create cluster if unique check doesn't pass</p>
        </div>
      </div>
    </section>
  );
}
