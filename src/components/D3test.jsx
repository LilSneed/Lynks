"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import testData from "../../public/data.json";
import { zoom } from "d3-zoom";
export default function D3test({ clusterData }) {
  const data = testData;

  const svgRef = useRef();
  const width = 928;
  const height = 600;

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + 1300)
      .attr("height", height + 1300)
      .attr("viewBox", [0, 0, width, height])
      .call(d3.zoom())
      .attr("style", "max-width: 100%; height: auto;");

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const links = data.links.map((d) => ({ ...d }));
    const nodes = data.nodes.map((d) => ({ ...d }));

    console.log(data);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 4, height / 4))
      .on("tick", ticked)
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll()
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const zoomBehavior = d3.zoom().scaleExtent([0.1, 10]).on("zoom", zoomed);
    svg.call(zoomBehavior);

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", (d) => color(d.group));

    node.append("title").text((d) => d.id);

    node.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      node
        .selectAll("text")
        .attr("x", (d) => d.x)
        .attr("font-size", (d) => d.radius * 15 + "px")
        .attr("font-weight", 50)
        .attr("fill", "white")
        .attr("y", (d) => d.y + d.radius * 25);
      node
        .selectAll("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .on("click", function (event, d) {
          console.log(`hello from ${d.url}, ${d.clusterId}`);
        })
        .on("click", function (event, d) {
          window.location.href = `/${d.url}`;
        });

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function zoomed(event) {
      const { transform } = event;
      link.attr("transform", transform);
      node.attr("transform", transform);
    }
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      // Cleanup code (optional) - This will be executed when the component unmounts.
      simulation.stop();
    };
  }); // Empty dependency array ensures the effect runs only once after initial render

  return <svg ref={svgRef} className=""></svg>;
}
