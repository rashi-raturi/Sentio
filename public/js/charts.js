export function createBarChart(data) {
    const margin = { top: 40, right: 20, bottom: 30, left: 30 };
    const width = (document.getElementById('bar-chart').clientWidth / 1.5) - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(data.map(d => d.assessment_name))
        .range([0, width])
        .padding(0.3);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => parseFloat(d.avg_score)) * 1.1])
        .nice()
        .range([height, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemePastel1);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -15) 
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        
        .attr("fill", "white")
        .text("Average Scores")

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .style("font-size", "12px")
        .call(d3.axisBottom(x).tickSize(5))
        .selectAll("text")
        .style("text-anchor", "end");

    svg.append("g")
        .attr("class", "y-axis")
        .style("font-size", "12px")
        .call(d3.axisLeft(y).ticks(5))


    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.assessment_name) + x.bandwidth() / 2 - (x.bandwidth() * 0.8) / 2)

        .attr("y", d => y(parseFloat(d.avg_score)))
        .attr("width", x.bandwidth() * 0.8)
        .attr("height", d => height - y(parseFloat(d.avg_score)))
        .attr("fill", (d, i) => colorScale(i));

    svg.selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => x(d.assessment_name) + (x.bandwidth() * 0.5))
        .attr("y", d => y(parseFloat(d.avg_score)) - 5)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .text(d => parseFloat(d.avg_score).toFixed(2));
}

