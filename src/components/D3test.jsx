"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function D3test({ clusterData, parentData }) {
  // State to hold data
  const [data, setData] = useState([clusterData]);
  console.log(clusterData);

  // Fetches data from an API endpoint

  // Ref to the SVG element
  const svgRef = useRef();
  const width = 928;
  const height = 600;

  useEffect(() => {
    // Selects and configures the SVG DOM element
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Creates a color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Set to store unique link IDs, this ensures taht even if there is a
    // more than one relation between 2 clusters only one link is generated, this set
    // makes sure that no links are added of the same id to avoid duplicate rendering
    const uniqueLinkIds = new Set();

    const visitedClusters = new Set();

    // Recursively prepares links between clusters
    const prepareLinks = (cluster) => {
      if (cluster.relatedClusters && cluster.relatedClusters.length > 0) {
        cluster.relatedClusters.forEach((relatedCluster) => {
          const linkId = [cluster.title, relatedCluster.title].sort().join("-");
          uniqueLinkIds.add(linkId);
          prepareLinks(relatedCluster);
        });
      }
    };

    // Initialize link preparation with the root clusterData
    prepareLinks(data[0]);

    // Generates link data from unique link IDs
    const links = Array.from(uniqueLinkIds).map((linkId) => {
      const [source, target] = linkId.split("-");
      return { source, target, value: 1 };
    });

    // Recursively prepares nodes for visualization
    const prepareNodes = (cluster, groupId) => {
      if (visitedClusters.has(cluster.id)) {
        return [];
      }
      visitedClusters.add(cluster.id);

      const nodes = [
        {
          id: cluster.title,
          group: groupId,
          radius: cluster.relatedClusters ? cluster.relatedClusters.length : 0,
          clusterId: cluster.id,
          url: cluster.url,
          lynks: cluster.lynks,
        },
      ];

      if (cluster.relatedClusters && cluster.relatedClusters.length > 0) {
        cluster.relatedClusters.forEach((relatedCluster, index) => {
          nodes.push(...prepareNodes(relatedCluster, groupId + index + 2));
        });
      }

      return nodes;
    };

    // Generate node data by recursively preparing nodes for each cluster
    const nodes = data.reduce((acc, cluster, index) => {
      return acc.concat(prepareNodes(cluster, index + 1));
    }, []);

    // Creates a D3 force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .velocityDecay(0.9)
      .on("tick", ticked);

    // Appends link elements to the SVG
    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll()
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    // Appends node groups to the SVG
    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(nodes)
      .join("g");

    // Appends circles to node groups
    node
      .append("circle")
      .attr("r", (d) => d.radius * 5 + 5)
      .attr("fill", (d) => color(d.group));

    // Appends text labels to node groups
    node
      .append("text")
      .attr("dx", (d) => -30)
      .text((d) => d.id);

    // Appends title elements to node groups for tooltips
    node.append("title").text((d) => d.id);

    // Enables drag behavior for nodes
    node.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    // Appends circles for the cluster's links
    const lynk = node
      .selectAll("g")
      .data((d) => d.lynks || [])
      .join("g");

    lynk.append("circle").attr("r", 0.1).attr("fill", "white");

    // Function to update visual elements on each simulation tick
    function ticked() {
      // Update link positions
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      // Update text label positions and styles
      node
        .selectAll("text")
        .attr("x", (d) => d.x)
        .attr("font-size", (d) => d.radius * 2 + 10 + "px")
        .attr("font-weight", 25)
        .attr("fill", "white")
        .attr("y", (d) => d.y + d.radius + 10 * 2);

      // Update node circle positions
      node
        .selectAll("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .on(
          "click", //(event, d) => {
          // Handle node click event by navigating to the specified URL
          // window.location.href = `http://localhost:3000/${d.url}`;
          console.log([parentData, clusterData])
        );
      //});

      // Update 'lynk' visual element positions
      lynk.attr("transform", (d, i, nodes) => {
        const parent = d3.select(nodes[i].parentNode).datum();
        const angle = (i / parent.lynks.length) * Math.PI * 2;
        const x = parent.x + Math.cos(angle) * (parent.radius * 5 + 20);
        const y = parent.y + Math.sin(angle) * (parent.radius * 5 + 20);
        return `translate(${x},${y})`;
      });

      // Update main node positions
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    // Function to handle node drag start
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    // Function to handle node dragging
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    // Function to handle node drag end
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Cleanup function for when the component unmounts
    return () => {
      simulation.stop();
    };
  }, [data]); // Effect runs when 'data' changes

  // Return the SVG container element
  return <svg ref={svgRef}></svg>;
}
