import React, { useEffect } from "react";
import * as d3 from "d3";
import data  from "./data";

const drawChart = () => {
  let svgWidth = 500;
  let svgHeight = 300;
  let radius = Math.min(svgWidth, svgHeight) / 2;
  let svg = d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  //Create group element to hold pie chart
  let g = svg
    .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

  let color = d3.scaleOrdinal(d3.schemeCategory10);

  let pie = d3.pie().value(function(d) {
    return d.percentage;
  });

  let path = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(0);

  let arc = g
    .selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g");

  arc
    .append("path")
    .attr("d", path)
    .attr("fill", function(d) {
      return color(d.data.percentage);
    });

  let label = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(0);

  arc
    .append("text")
    .attr("transform", function(d) {
      return "translate(" + label.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
      return d.data.platform + ":" + d.data.percentage + "%";
    });
};

const D3 = () => {
  useEffect(() => {
    drawChart();
  });
  return <div id="content"></div>;
};

export default D3;
