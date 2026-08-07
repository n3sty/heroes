import * as d3 from "d3";
import geojson from "./geo.json";

// -- setup -- //
const svg = d3.select("#content");
const projection = d3.geoOrthographic().scale(500).translate([window.innerWidth/2, window.innerHeight/2]);
const geoGenerator = d3.geoPath().projection(projection).pointRadius(4);

// -- boxes -- //
function handleMouseOver(_, d) {
  let bounds = geoGenerator.bounds(d)
  let centroid = geoGenerator.centroid(d)

  d3.select('#content .bounding-box rect')
    .attr('x', bounds[0][0])
    .attr('y', bounds[0][1])
    .attr('width', bounds[1][0] - bounds[0][0])
    .attr('height', bounds[1][1] - bounds[0][1]);

  d3.select('#content .centroid circle')
    .style('display', 'inline')
    .attr('transform', 'translate(' + centroid + ')');
}

// -- graticule -- //
const graticules = d3.geoGraticule();
svg.select("g.graticule")
  .append('path')
  .datum(graticules)
  .attr('d', geoGenerator);

function update() {
  // -- earth -- //
  d3.select("#content g.map")
    .selectAll("path")
    .data(geojson.features)
    .join("path")
    .attr("d", geoGenerator)
    .on('mouseover', handleMouseOver);
}

update()
