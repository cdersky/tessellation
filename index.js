// SVG element
var width = 960,
height = 700;

var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height);

// draw circles
var dataset = [ 5, 10, 15, 20, 25 ];

var circles = svg.selectAll("circle")
.data(dataset)
.enter()
.append("circle");


circles.attr("cx", function(d, i) {
  return (i * 50) + 25;
        }) // Takes the reference to all circles and sets the cx attribute for each one. Our data has already been bound to the circle elements, so for each circle, the value d matches the corresponding value in our original data set (5, 10, 15, 20, or 25). Another value, i, is also automatically populated for us. i is a numeric index value of the current element. Counting starts at zero, so for our “first” circle i == 0, the second circle’s i == 1 and so on. We’re using i to push each subsequent circle over to the right, because each subsequent loop through, the value of i increases. ***To make sure i is available to your custom function, you must include it as an argument in the function definition (function(d, i)). You must also include d, even if you don’t use d within your function (as in the case above).***
       .attr("cy", height/4) // height is the height of the entire SVG, so height/2 is one-half of its height. This has the effect of aligning all circles in the vertical center.
       .attr("r", function(d) {
        return d; 
       }) //Finally, the radius r of each circle is simply set to d, the corresponding data value.
       .attr('fill', 'white')
       .attr('stroke', 'black')
       .attr('stroke-width', function(d, i){
        return d*(1/3);
      });


// make circles move to a new random location
var changeLocation = function() {
  circles
  .transition()
        // .delay(2000)
        .duration(1000)
        .attr("cx", function(d,i) {                    
          var num = Math.random();
          return width*num;        
        }) 
        .attr("cy", function(d,i) {
          var num = Math.random();
          return height*num;
        })
        .attr("r", function(d,i) {
          var num = Math.random();
          return 100*num;
        })
        .style("opacity", function(){
          var num = Math.random();
          return num;
        })
        .ease("elastic")

      };

// make circles move to a new random location every few seconds
var intervalID = window.setInterval(changeLocation, 2000);


// a differently-colored shape
var playerData = [10];

var player = svg.selectAll("rect")
.data(playerData)
.enter()
.append("rect")
.attr('x', 100)
.attr('y', 100)
.attr('width', 20)
.attr('height', 20)
.style({
  'fill': 'blue',
  'stroke': 'white',
  'stroke-width': 1,
});
