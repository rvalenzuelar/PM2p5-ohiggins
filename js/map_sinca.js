
const width = 575;
const height = 300;

const margin = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
}

const sinca_coords = {
    'rancagua1': {
        lat: -34.1623,
        lon: -70.7140
    },
    'rancagua2': {
        lat: -34.1439,
        lon: -70.7371
    },
    'Rengo': {
        lat: -34.3945,
        lon: -70.8530
    },
    'SanFdo': {
        lat: -34.5799,
        lon: -70.9897
    }
};

function pulse_point(coords, projection){

    // const color = 'rgb(163,17,42)'
    const color = '#f33'

    var circle = svg.selectAll("circle")
		.data(coords).enter()
		.append("circle")
		.attr("cx", d => projection(d)[0])
		.attr("cy", d => projection(d)[1])

    repeat();

    function repeat(){
        circle
        .attr("r", 3)
        .style('fill', color)
        .style('opacity',1)
        .transition()
        .duration(2500)
        .attr('r', 9)
        .style('opacity',0)
        .on("end", repeat);
    };

}

let svg = d3.select("#map-sinca")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

let tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("display", "none")
    .style("position", "absolute")
    .style("z-index", 1)
    .style("left", 0)
    .style("top", 0)
    .style("opacity",1);



Promise.all([
    d3.json("data/COMUNA_C17.geojson")
]).then(function(datos) {
    let data = datos[0];

    let projection = d3.geoMercator()
        .fitSize([width, height], data);

    let path = d3.geoPath()
        .projection(projection);

    const y = 'PROVINCIA';

    let yExtent = d3.extent(data.features, d => d.properties[y]);

    let color = d3.scaleOrdinal(["#a6cee3","#1f78b4","#b2df8a"])
            .domain(yExtent)

    svg.selectAll(".comuna")
        .data(data.features)
        .join("path")
        .attr("class", "comuna")
        .attr("stroke", "#424242")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 0.5)
        .attr("fill", d => color(d.properties[y]))
        .attr("d", path)
        .on("mouseover", (event, d) => {
            console.log(event.pageX)
            tooltip.html(
                `<p><strong>Comuna</strong> ${d.properties.NOM_COMUNA}</p>
                <p><strong>Provincia</strong> ${d.properties.NOM_PROVIN}</p>`
            )
            .style("left", (event.pageX + 10) + 'px')
            .style("top", event.pageY + 'px')
            .style("display", "block");
        })
        .on("mouseout", () => {
            tooltip.style("display", "none");
        });

    var coords = []
    for (const [key, value] of Object.entries(sinca_coords)) {
        coords.push([value.lon, value.lat])
      }


    pulse_point(coords, projection)
})