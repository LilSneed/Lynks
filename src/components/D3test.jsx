"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import testData from "../../public/data.json";
import { PopoverOptions } from "./Popover";

export default function D3test({ clusterData }) {
  const data = clusterData;
  const [showText, setShowText] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [force, setForce] = useState(-2500);

  const switches = [
    { state: showText, setState: setShowText, text: "Toggle Text" },
    { state: animations, setState: setAnimations, text: "Toggle Animations" },
    // this array is for passing to the options menu as props for the state of the switch buttons
  ];

  const forces = { state: force, setState: setForce };

  const svgRef = useRef();
  const svgContainerRef = useRef(); // useRef for  the SVG container div
  const simulationRef = useRef(null);
  const updateForceStrength = (newForceStrength) => {
    if (simulationRef.current) {
      simulationRef.current.force("charge").strength(newForceStrength);
      simulationRef.current.alpha(1).restart(); // Restart the simulation to apply the new force strength
    }
  };
  const width = 928;
  const height = 600;

  const updateSvgSize = () => {
    const svgContainer = svgContainerRef.current;
    const newWidth = svgContainer.offsetWidth;
    const newHeight = svgContainer.offsetHeight;
    // Update the SVG dimensions based on the container's size
    const svg = d3.select(svgRef.current);
    svg.attr("width", "100vw").attr("height", "100vh");

    // You may need to adjust other parts of your code that rely on width and height
  };

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + 1300)
      .attr("height", height + 1300)
      .attr("viewBox", [0, 0, width, height])
      .call(d3.zoom())
      .attr("style", "max-width: 100%; height: 100%;");
    svg.selectAll("*").remove();
    updateSvgSize();
    window.addEventListener("resize", updateSvgSize);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const links = data.links.map((d) => ({ ...d }));
    const nodes = data.nodes.map((d) => ({ ...d }));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(force))
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
      .attr("fill", (d) => d.color)
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        const connectedNodes = getConnectedNodes(d);

        node
          .transition()
          .duration(300)
          .style("opacity", (o) => {
            return connectedNodes.includes(o) ? 1 : 0.1;
          });

        link
          .transition()
          .duration(300)
          .style("stroke", function (l) {
            return l.source === d || l.target === d ? "white" : "#999"; // Change color of links connected to the node being hovered
          })
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
          .style("fill", (d) => d.color);

        d3.select(this.parentNode)
          .transition()
          .duration(300)
          .select("text")
          .style("fill", "#333")
          .attr("y", (d) => d.y + 20);
      });

    if (showText) {
      node
        .append("text")
        .text((d) => d.id)
        .attr("x", 6)
        .attr("y", 3)
        .style("font-size", "5px")
        .style("font-weight", "600")
        .style("fill", "#333")
        .style("text-anchor", "middle")
        .style("stroke", "none");
    } else {
      node.selectAll("text").remove(); // remove text elements when showText is false
    }

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

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;

      // Highlight the hovered node and its connected nodes while dragging
      const connectedNodes = getConnectedNodes(d);

      if (animations) {
        node
          .transition()
          .duration(300)
          .style("opacity", (o) => {
            return connectedNodes.includes(o) ? 1 : 0.1;
          });

        link
          .transition()
          .duration(300)
          .style("stroke", function (l) {
            return l.source === d || l.target === d ? "white" : "#999"; // Change color of links connected to the node being dragged
          })
          .style("opacity", function (l) {
            return l.source === d || l.target === d ? 1 : 0.1; // Keep links connected to the node being dragged fully visible
          });
      }
    }

    const getConnectedNodes = (node) => {
      const connectedNodes = [node];
      links.forEach((link) => {
        if (link.source === node) {
          connectedNodes.push(link.target);
        } else if (link.target === node) {
          connectedNodes.push(link.source);
        }
      });
      return connectedNodes;
    };

    function zoomed(event) {
      const { transform } = event;
      link.attr("transform", transform);
      node.attr("transform", transform);
      node
        .selectAll("text")
        .style("visibility", transform.k > 1 ? "visible" : "hidden");
    }
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;

      const connectedNodes = getConnectedNodes(d);

      if (animations) {
        node
          .transition()
          .duration(300)
          .style("opacity", (o) => {
            return connectedNodes.includes(o) ? 1 : 0.1;
          });

        link
          .transition()
          .duration(300)
          .style("stroke", function (l) {
            return l.source === d || l.target === d ? "#FF6347" : "#999";
          })
          .style("opacity", function (l) {
            return l.source === d || l.target === d ? 1 : 0.1; // Keep links connected to the node being dragged fully visible
          });
      }
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;

      // Restore all nodes and links to their original state
      node.transition().duration(300).style("opacity", 1);
      link
        .transition()
        .duration(300)
        .style("stroke", "#999")
        .style("opacity", 1);
    }

    return () => {
      simulation.stop();
      window.removeEventListener("resize", updateSvgSize);
    };
  }, [showText, animations, force]);

  return (
    <div className="flex flex-row">
      <div ref={svgContainerRef} className="">
        <svg ref={svgRef} className="" />
      </div>
      <div className="fixed top-10 right-10 mt-10" style={{ right: "10vw" }}>
        <PopoverOptions switches={switches} forces={forces} />
      </div>
    </div>
  );
}
