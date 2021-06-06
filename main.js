const width = 781;
const height = 500;
var grid;

var p5 = new p5(p5 => {

	p5.setup = function(){
		p5.createCanvas(width, height);
		grid = new Grid(width, height, 30, 20);
	}

	p5.draw = function(){
		p5.background(0);
		grid.update();
	}

});