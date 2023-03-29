window.onload = function() {
const FRAME_HEIGHT = 600;
const FRAME_WIDTH = 900; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

const VIS1 = d3.select("#vis1")
    .append("svg")
    .attr("width", FRAME_WIDTH)
    .attr("height", FRAME_HEIGHT)
    .append("g")


function draw_bubble() {

    

        // Define the scales
const xScale = d3.scaleLinear()
.domain([0, 1]) // Set the domain for danceability
.range([50, FRAME_WIDTH - 50]); // Set the range for the X-axis

const yScale = d3.scaleLinear()
.domain([0, 1]) // Set the domain for energy
.range([FRAME_HEIGHT - 50, 50]); // Set the range for the Y-axis

const sizeScale = d3.scaleLinear()
.domain([0, 100]) // Set the domain for popularity
.range([1, 7]); // Set the range for the bubble size

// Define the axes
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

// Add the axes to the visualization
VIS1.append("g")
.attr("transform", `translate(0, ${FRAME_HEIGHT - 50})`)
.call(xAxis);

VIS1.append("g")
.attr("transform", `translate(50, 0)`)
.call(yAxis);

// Add the title
VIS1.append("text")
.attr("x", FRAME_WIDTH / 2)
.attr("y", 30)
.attr("text-anchor", "middle")
.attr("font-size", "20px")
.text("Spotify Playlist Metrics");


d3.csv("data/playlist_metrics.csv").then((data) => {

    var tooltip = d3.select("#vis1")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "purple")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

    var showTooltip = function(d) {
        tooltip
          .transition()
          .duration(200)
        tooltip
          .style("opacity", 1)
          .html("Country: " + d.country)
          .style("left", (d3.mouse(this)) + "px")
      }
      var moveTooltip = function(d) {
        tooltip
          .style("left", (d3.mouse(this)) + "px")
      }
      var hideTooltip = function(d) {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0)
      }


// Add the bubbles
VIS1.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", (d) => xScale(d.danceability))
.attr("cy", (d) => yScale(d.energy))
.attr("r", (d) => sizeScale(d.popularity))
.attr("fill", "blue")
.attr("opacity", 0.5)
.attr("stroke", "black")
.attr("stroke-width", 1)
.on("mouseover", showTooltip )
.on("mouseover", showTooltip )
.on("mousemove", moveTooltip )
.on("mouseleave", hideTooltip )


VIS1.append("text")
.attr("x", FRAME_WIDTH / 2)
.attr("y", FRAME_HEIGHT - 10)
.attr("text-anchor", "middle")
.attr("font-size", "12px")
.text("Danceability");

VIS1.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0)
.attr("x", 0 - (FRAME_HEIGHT / 2))
.attr("dy", "1em")
.attr("text-anchor", "middle")
.attr("font-size", "12px")
.text("Energy");


//indicate that the bigger the circle, the more popular the song
VIS1.append("circle")
.attr("cx", 70)
.attr("cy", 48)
.attr("r", 5)
.attr("fill", "blue")
.attr("opacity", 0.5)
.attr("stroke", "black")
.attr("stroke-width", 1)

VIS1.append("text")
.attr("x", 80)
.attr("y", 50)
.attr("text-anchor", "left")
.attr("font-size", "12px")
.text("More popular");

VIS1.append("circle")
.attr("cx", 70)
.attr("cy", 67)
.attr("r", 2)
.attr("fill", "blue")
.attr("opacity", 0.5)
.attr("stroke", "black")
.attr("stroke-width", 1)

VIS1.append("text")
.attr("x", 80)
.attr("y", 70)
.attr("text-anchor", "left")
.attr("font-size", "12px")
.text("Less popular");

VIS1.append("rect")
.attr("x", 60)
.attr("y", 35)
.attr("width", 100)
.attr("height", 40)
.attr("fill", "none")
.attr("stroke", "black")
.attr("stroke-width", 1)


// create a zoom function that only works with the scrool wheel

var zoom = d3.zoom()
.scaleExtent([1, 10])
.on("zoom", zoomed);

// add the zoom function to the bubble chart
VIS1.call(zoom);

function zoomed() {
    var new_xScale = d3.event.transform.rescaleX(xScale);
    var new_yScale = d3.event.transform.rescaleY(yScale);

    xAxis.scale(new_xScale);
    yAxis.scale(new_yScale);

    VIS1.select(".x.axis").call(xAxis);
    VIS1.select(".y.axis").call(yAxis);

    VIS1.selectAll("circle")
    .attr("cx", (d) => new_xScale(d.danceability))
    .attr("cy", (d) => new_yScale(d.energy))
    .attr("r", (d) => sizeScale(d.popularity))
    .attr("fill", "blue")
    .attr("opacity", 0.5)
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .on("mouseover", showTooltip )
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )

}
});


};

function drawplot() {
    Plotly.d3.csv("https://raw.githubusercontent.com/DS4200-S23-Class/project-nick-nino-krish/master/data/playlist.csv", function(err, rows){
        function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
        }
  
        const trace1 = {
          x: unpack(rows, 'country'),
          y: unpack(rows, 'popularity'),
          mode: 'markers',
          type: 'scatter'
        };
  
        const data = [trace1];
  
        const layout = {
          title: 'Scatterplot of Popularity of All Songs from Every Country',
          xaxis: {
            title: 'country'
          },
          yaxis: {
            title: 'Popularity'
          }
        };
  
        Plotly.newPlot('vis2', data, layout);
      });
  
  
  fetch('https://raw.githubusercontent.com/DS4200-S23-Class/project-nick-nino-krish/master/data/playlist.csv')
    .then(response => response.text())
    .then(data => {
      const lines = data.split('\n');
      for (let i = 0; i < 15; i++) {
        console.log(lines[i]);
      }
    });
}

draw_bubble();
drawplot();

};
