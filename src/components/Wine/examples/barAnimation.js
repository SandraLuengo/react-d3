import * as d3 from 'd3';

const barAnimation = (dataset) => {
    let margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select("#wine")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    let x = d3.scaleBand()
        .range([0, width])
        .domain(dataset.children.map(d => d.Name))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    let y = d3.scaleLinear()
        .domain([0, d3.max(dataset.children, d => +d.Count)])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("mybar")
        .data(dataset.children)
        .enter()
        .append("rect")
        .attr("x", d => x(d.Name))
        .attr("y", d => y(0))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(0))
        .attr("fill", "#69b3a2")
    // Animation
    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", d => y(d.Count))
        .attr("height", d => height - y(d.Count))
        .delay((d, i) => (i * 100))

}

export { barAnimation }