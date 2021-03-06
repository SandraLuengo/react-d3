import * as d3 from "d3";

const bubbleGenerator = (dataset) => {
    let diameter = 1000;
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    let bubble = d3.pack(dataset) //englobo el pack
        .size([diameter, diameter])
        .padding(1);

    let svg = d3.select("#wine")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    let nodes = d3.hierarchy(dataset)
        .sum(d => d.Count)

    let node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function (d) {
            return !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function (d) {
            return d.Name + ": " + d.Count;
        });

    node.append("circle")
        .attr("r", function (d) {
            return d.r;
        })
        .style("fill", function (d, i) {
            return color(i);
        });

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.Name.substring(0, d.data.Count / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function (d) {
            return d.data.Count / 5;
        })
        .attr("fill", "white");

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.Count;
        })
        .attr("font-family", "Gill Sans", "Gill Sans MT")
        .attr("font-size", function (d) {
            return d.data.Count / 5;
        })
        .attr("fill", "white");


}

export { bubbleGenerator }