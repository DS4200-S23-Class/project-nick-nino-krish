window.onload = function() {
const FRAME_HEIGHT = 600;
const FRAME_WIDTH = 800; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

const VIS1 = d3.select("#vis1")
    .append("svg")
    .attr("width", FRAME_WIDTH)
    .attr("height", FRAME_HEIGHT)
    .append("g")


  const VIS2 = d3.select("#vis2")
  .append("svg")
  .attr("width", FRAME_WIDTH)
  .attr("height", FRAME_HEIGHT)
  .append("g")


function draw_bubble() {

    

        // Define the scales
const xScale = d3.scaleLinear()
.domain([0, 1]) // Set the domain for danceability
.range([MARGINS.left, FRAME_WIDTH]); // Set the range for the X-axis

const yScale = d3.scaleLinear()
.domain([0, 1]) // Set the domain for energy
.range([VIS_HEIGHT - 50, 50]); // Set the range for the Y-axis

const sizeScale = d3.scaleLinear()
.domain([0, 100]) // Set the domain for popularity
.range([1, 7]); // Set the range for the bubble size

// Define the axes
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

const opacityScale = d3.scaleLinear()
.domain([50, 250]) // Set the domain for tempo
.range([0.1, 1]); // Set the range for the bubble opacity


// Add the axes to the visualization
VIS1.append("g")
.attr("transform", `translate(0, ${VIS_HEIGHT - 50})`)
.call(xAxis);

VIS1.append("g")
.attr("transform", `translate(50, 0)`)
.call(yAxis);

// Add the title
VIS1.append("text")
.attr("x", VIS_WIDTH / 2)
.attr("y", MARGINS.top / 2)
.attr("text-anchor", "middle")
.attr("font-size", "25px")
.text("Spotify Playlist Metrics");


d3.csv("data/playlist_metrics.csv").then((data) => {

    const tooltip = d3.select("#vis1")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "purple")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

    const showTooltip = function(d) {
        tooltip
          .transition()
          .duration(200)
        tooltip
          .style("opacity", 1)
          .html("Country: " + d.country)
          .style("left", (d3.mouse(this)) + "px")
          .style("top", (d3.mouse(this)) + "px")
      }
      const moveTooltip = function(d) {
        tooltip
          .style("left", (d3.mouse(this)) + "px")
      }
      const hideTooltip = function(d) {
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
.attr("opacity", (d) => opacityScale(d.tempo))
.attr("stroke", "black")
.attr("stroke-width", 1)
.attr("id", (d) => "scatterplot-" + d.country.replace(/\s+/g, ''))
.on("mouseover", showTooltip )
.on("mouseover", showTooltip )
.on("mousemove", moveTooltip )
.on("mouseleave", hideTooltip )
.on("click", function(d) { handleElementClick(d3.select(this), "scatterplot"); });



VIS1.append("text")
.attr("x", VIS_WIDTH / 2)
.attr("y", VIS_HEIGHT - 10)
.attr("text-anchor", "middle")
.attr("font-size", "15px")
.text("Danceability");

VIS1.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0)
.attr("x", 0 - (VIS_HEIGHT / 2))
.attr("dy", "1em")
.attr("text-anchor", "middle")
.attr("font-size", "15px")
.text("Energy");


//indicate that the bigger the circle, the more popular the song
VIS1.append("circle")
.attr("cx", 70)
.attr("cy", 48)
.attr("r", 5)
.attr("fill", "none")
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
.attr("fill", "none")
.attr("opacity", 0.5)
.attr("stroke", "black")
.attr("stroke-width", 1)

//add opacity legend

VIS1.append("text")
.attr("x", 80)
.attr("y", 70)
.attr("text-anchor", "left")
.attr("font-size", "12px")
.text("Less popular");

VIS1.append("circle")
.attr("cx", 70)
.attr("cy", 90)
.attr("r", 4)
.attr("fill", "blue")
.attr("opacity", 0.9)
.attr("stroke", "black")
.attr("stroke-width", 1)

VIS1.append("text")
.attr("x", 80)
.attr("y", 92)
.attr("text-anchor", "left")
.attr("font-size", "12px")
.text("More tempo");

VIS1.append("circle")
.attr("cx", 70)
.attr("cy", 110)
.attr("r", 4)
.attr("fill", "blue")
.attr("opacity", 0.2)
.attr("stroke", "black")
.attr("stroke-width", 1)


VIS1.append("text")
.attr("x", 80)
.attr("y", 113)
.attr("text-anchor", "left")
.attr("font-size", "12px")
.text("Less tempo");




VIS1.append("rect")
.attr("x", 60)
.attr("y", 35)
.attr("width", 100)
.attr("height", 90)
.attr("fill", "none")
.attr("stroke", "black")
.attr("stroke-width", 1)


// create a zoom function that only works with the scrool wheel

const zoom = d3.zoom()
.scaleExtent([1, 10])
.on("zoom", zoomed);

// add the zoom function to the bubble chart
VIS1.call(zoom);

function zoomed() {
    const new_xScale = d3.event.transform.rescaleX(xScale);
    const new_yScale = d3.event.transform.rescaleY(yScale);

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

VIS1.selectAll("text")
.attr("font-family", "segoue ui")

});


};

function drawbar() {

  // line this vis up with the other vis

d3.csv("data/playlist_median.csv").then((data) => {

  const subgroups = data.columns.slice(2, -1)
  console.log(subgroups)

  // add 5 colors, muted and dark
  const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f'])


  const x = d3.scaleBand()
    .domain(data.map(function(d) { return d.country; }))
    .range([MARGINS.left, FRAME_WIDTH])
    .padding([0.2])

  const y = d3.scaleLinear()
    .domain([0, 3])
    .range([ VIS_HEIGHT, 0 ]);

    VIS2.append("g")
    .attr("transform", "translate(0," + VIS_HEIGHT + ")")
    .select(".domain").remove()

  const stackedData = d3.stack()
    .keys(subgroups)
    (data)

  VIS2.append("g")
    .selectAll("g")
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.data.country); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width",x.bandwidth())
      .attr("id", (d) => "bar-" + d.data.country.replace(/\s+/g, ''))


  const legend = VIS2.append("g")
    .attr("font-family", "segoue ui")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(subgroups.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", VIS_WIDTH)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", color);

  legend.append("text")
      .attr("x", VIS_WIDTH - 10)
      .attr("y", 9.5)
      .attr("dy", "0.34em")
      
      .text(function(d) { return d; });

      //make text larger, and a nice font
      VIS2.selectAll("text")
      .attr("font-size", "18px")
      .attr("font-family", "segoue ui")


      //add a title
      VIS2.append("text")
      .attr("x", (VIS_WIDTH / 2))
      .attr("y", MARGINS.top / 2 )
      .attr("text-anchor", "middle")
      .attr("font-size", "24px")
      .attr("font-family", "segoue ui")
      .text("Median Values of Audio Features by Country");

      //add x axis label
      VIS2.append("text")
      .attr("x", (VIS_WIDTH / 2))
      .attr("y", VIS_HEIGHT + (MARGINS.top / 2))
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .attr("font-family", "segoue ui")
      .text("Country");

      //add y axis label
      VIS2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x", 0 - (VIS_HEIGHT / 2)) 
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .attr("font-family", "segoue ui")
      .text("Median Value of Audio Feature");

      //add a subtitle
      VIS2.append("text")
      .attr("x", (VIS_WIDTH / 2))
      .attr("y", 0 - (VIS_HEIGHT / 4))
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .attr("font-family", "segoue ui")
      .text("Hover over a bar to see the median value of each audio feature");

      //add tooltip that shows the median value of each audio feature and the country

      const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .text("a simple tooltip");

      function showTooltip(d) {
        tooltip.style("visibility", "visible");
      }

      function moveTooltip(d) {
        tooltip
          .style("top", (d3.event.pageY-10)+"px")
          .style("left",(d3.event.pageX+10)+"px")

      }

      function hideTooltip(d) {
        tooltip.style("visibility", "hidden");
      }

      //add tooltip to each bar and shows the median value of the feature that is being hovered over, by group


      VIS2.selectAll("rect")
      .on("mouseover", function(d) {
        tooltip.text("Country: " + d.data.country)
        // new line 
        tooltip.append("div").text("Danceability: " + d.data.danceability)
        tooltip.append("div").text("Energy: " + d.data.energy)
        tooltip.append("div").text("Acousticness: " + d.data.acousticness)
        tooltip.append("div").text("Instrumentalness: " + d.data.valence)
      
        showTooltip(d);
        moveTooltip(d);
      })
      .on("mouseout", function(d) {
        hideTooltip(d);
      })
      .on("click", function(d) { handleElementClick(d3.select(this), "bar"); });
;


});
}

function handleElementClick(element, visType) {
  d3.selectAll(".highlight").classed("highlight", false);
  element.classed("highlight", true);

  let id = element.attr("id");
  let otherVisType = visType === "scatterplot" ? "bar" : "scatterplot";
  let otherId = id.replace(visType, otherVisType);

  d3.select("#" + otherId).classed("highlight", true);
}


draw_bubble();
drawbar();

};
