// Draw circles in an svg element

// SVG element
var width = 960,
height = 700;

var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height);

// draw circles
var dataset = [ 5, 10, 15, 20, 25, 5, 10, 15, 20, 25, ];

var circles = svg.selectAll("circle")
.data(dataset)
.enter()
.append("circle");

circles.attr("cx", function(d, i) {
  return (i * 70) + 25;
}) 
.attr("cy", height/4) 
.attr("r", function(d) {
  return Math.abs(d); 
}) 
.attr('fill', 'white')
.attr('stroke', 'black')
.attr('stroke-width', function(d){
  return d*(1/3);
});


// Make circles move to a new random location every second using transitions.

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
      return Math.abs(100*num);
    })
    .style("opacity", function(){
      var num = Math.random();
      return num;
    })
    .ease("back"); // also try back, linear, sin, elastic, cubic, exp, quad, circle
  };

  var intervalID = window.setInterval(changeLocation, 2000);


// Make a differently-colored dot to represent the player. Make it draggable.

var playerData = [
{name:'chris', shirt: 'stripes/awsome', isTall: true}
  // {name:'claire', shirt: 'sweater', isTall: false}
  ];

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

// add drag behavior
player.call(d3.behavior
 .drag()
 .on('dragstart', function() {player.style('fill', 'grey');})
 .on ('drag', function (d, i) {
   d3.select(this)
   .attr ({
     x : d3.event.x,
     y : d3.event.y
   });
 }) 
 .on('dragend', function() {player.style('fill', 'blue');})
 );


// Detect when a circle touches the player. (this only works at the end of eah path)

var detectCollision = function () {
  circles
  .each (function (d, i) {

    var x = Math.abs(circles[0][i].getAttribute('cx') - player.attr('x'));
    var y = Math.abs(circles[0][i].getAttribute('cy') - player.attr('y'));
    var distance = Math.sqrt((x * x) + (y * y));
    var circleRadius = circles[0][i].getAttribute('r');
    var playerRadius = Math.sqrt((player.attr('x')*player.attr('x')*(player.attr('y')*player.attr('y')) ));
    if (distance <= circleRadius + playerRadius ) 
    {
      collision();
    }
  });
};

d3.timer(detectCollision, 5000);
d3.timer(scoreBoard, 5000);


// Track of the user's score and display it.

var curCount = document.querySelector('.current span').innerText;

function scoreBoard (){
  
  // handle current score
  var tempCur = Number(curCount);
  tempCur++;
  curCount = tempCur;
  document.querySelector('.current span').innerText = tempCur;

}


// handle collision score 
var cCount = document.querySelector('.collisions span').innerText;

function collision(){
  
  var temp = Number(cCount);
  temp++;
  cCount = temp;

  document.querySelector('.collisions span').innerText = temp;
  resetCurScore (); //reset current score to 0 on a collision
}

// handle high score and reset current score to 0 on a collision
var highCount = document.querySelector('.high span').innerText;

function resetCurScore (){
  if (curCount > highCount){
    highCount = document.querySelector('.high span').innerText = curCount;
  }
  curCount = document.querySelector('.current span').innerText = 0;
}
