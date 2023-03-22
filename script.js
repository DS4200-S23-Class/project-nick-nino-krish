var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/DS4200-S23-Class/hw-05-hw05-nick-ethan/master/data/scatter-data.csv", function(data) {

  var x = d3.scaleLinear()
    .domain([0, 10])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var y = d3.scaleLinear()
    .domain([0, 10])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  var circles = svg.append('g')
  	.attr("id", "plane")
    .selectAll("point")
    .data(data)
    .enter()
    .append("circle")   	
      .attr("cx", function (d) { return x(d.x); } )
      .attr("cy", function (d) { return y(d.y); } )
      .attr("r", 15)
      .style("fill", "steelblue")

  var button = d3.select("#plotbutton")
		button.on("click", function(d){
		var newx = d3.select("#xdropdown").node().value;
		var newy = d3.select("#ydropdown").node().value;
		d3.select("#plane")
		.append("circle")
	      .attr("cx", function (d) { return x(newx); } )
     	  .attr("cy", function (d) { return y(newy); } )
	      .attr("r", 15)
	      .style("fill", "steelblue")
	      .on("mousemove", function(d) {
      			d3.select(this)
          		.style("cursor", "pointer")
          		.style("fill", "orange");
   			  })
   			
  		  .on("mouseout", function(d) {
    		    d3.select(this)
       			.style("cursor", "default")
        		.style("fill", "steelblue");
    		  })
      
  		  .on("click", function(d) {
      			var selectedCircle = d3.select(this);
      			var isSelected = selectedCircle.classed("selected");
      			selectedCircle.classed("selected", !isSelected);
     			coords.text("(" + newx + ", " + newy + ")");
  
  				// toggle stroke color and width
			      if (isSelected) {
			          selectedCircle
			              .style("stroke", null)
			              .style("stroke-width", null);
			      } else {
			          selectedCircle
			              .style("stroke", "black")
			              .style("stroke-width", "7px");
			      }});

});
