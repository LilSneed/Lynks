"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import testData from "../../public/data.json";
import { zoom } from "d3-zoom";
export default function D3test({ clusterData }) {
  const data = clusterData;

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

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
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

    const node = svg.append("g").selectAll("circle").data(nodes).join("g");

    node
      .append("circle")
      .attr("r", 5)
      .attr("fill", (d) => color(d.creatorId))
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        node
          .transition()
          .duration(300)
          .style("opacity", (o) => {
            return o === d ? 1 : 0.1;
          });
        link
          .transition()
          .duration(300)
          .style("stroke", function (l) {
            return l.source === d || l.target === d ? "red" : "#999"; // Change color of links connected to the node being hovered
          });
        link
          .transition()
          .duration(300)
          .style("opacity", function (l) {
            return l.source === d || l.target === d ? 1 : 0.1; // Keep links connected to the node being hovered fully visible
          });
        d3.select(this)
          .transition()
          .duration(300)
          .style("fill", "darkcyan")

          .style("opacity", 1);

        d3.select(this.parentNode)
          .transition()
          .duration(300)
          .select("text")
          .style("fill", "white")
          .attr("y", (d) => d.y + 30);
      })
      .on("mouseout", function (event, d) {
        node.transition().duration(300).style("opacity", 1);
        link
          .transition()
          .duration(300)
          .style("stroke", "#999")
          .style("opacity", 1);
        d3.select(this)
          .transition()
          .duration(300)
          .style("fill", (d) => color(d.creatorId));

        d3.select(this.parentNode)
          .transition()
          .duration(300)
          .select("text")
          .style("fill", "#333")
          .attr("y", (d) => d.y + 20);
      });

    node
      .append("text")
      .text((d) => d.id)
      .attr("x", 6)
      .attr("y", 3)
      .style("font-size", "10px") // Adjust the font size
      .style("font-weight", "400") // Adjust the font weight
      .style("fill", "#333") // Change the text color
      .style("text-anchor", "middle") // Center the text
      .style("stroke", "none")
      .style("visibility", "hidden"); // Hide the text initially

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
        .attr("y", (d) => d.y + 20);

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
      node
        .selectAll("text")
        .style("visibility", transform.k > 1 ? "visible" : "hidden");
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
      simulation.stop();
    };
  });

  return <svg ref={svgRef} className=""></svg>;
}
