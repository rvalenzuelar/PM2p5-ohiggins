function filertByDate(data, beg, end){
    var startDate = new Date(beg);
    var endDate = new Date(end);
    var resultFilter = data.filter(a => {
      var date = new Date(a.date);
      return (date >= startDate && date <= endDate);
    });
    return resultFilter
}

// From observablehq
function rampLinear() {

  const margin = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 30
  }
  const width = 200;
  const height = 70;
  const colors = d3.interpolateYlOrBr;
  const colorScale = d3.scaleSequential([0,120], colors).unknown("none");
  const barHeight = 10;

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    .attr("font-family", "sans-serif")
    .attr("font-size", 13);

  const defs = svg.append("defs");
  
  const linearGradient = defs.append("linearGradient")
      .attr("id", "linear-gradient");
  
  console.log(colorScale.ticks())
  console.log(colorScale.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: colorScale(t) })))

  linearGradient.selectAll("stop")
    .data(colorScale.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: colorScale(t) })))
    .enter().append("stop")
    .attr("offset", d => d.offset)
    .attr("stop-color", d => d.color);
  
  svg.append('g')
    .attr("transform", `translate(0,${height - margin.bottom - barHeight})`)
    .append("rect")
    .attr('transform', `translate(${margin.left}, 0)`)
    .attr("width", width - margin.right - margin.left)
    .attr("height", barHeight)
    .style("fill", "url(#linear-gradient)")
    .style("stroke","white");

  let axisScale = d3.scaleLinear()
    .domain(colorScale.domain())
    .range([margin.left, width - margin.right])

  let axisBottom = svg.append("g")
      .attr("class", "x-axis")
      .attr("class", "axisRed")
      .attr("transform", `translate(0,${height - margin.bottom})`)

  axisBottom.call(
        d3.axisBottom(axisScale)
          .ticks(6)
          .tickSize(-barHeight)
    );
  
  axisBottom.append("text")
    .attr("text-anchor", "start")
    .attr("x", width*0.05)
    .attr("y", -height*0.2)
    .text("PM2.5 \u03BCg/m\u00B3");

  return svg.node();
}