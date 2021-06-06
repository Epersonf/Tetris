const width = 500;
const height = 700;
const divisionsX = 20;
const divisionsY = 30;
var grid;

var p5 = new p5(p5 => {

	p5.setup = function(){
		p5.createCanvas(width, height);
		grid = new Grid(width, height, divisionsX, divisionsY);
	}

	p5.draw = function(){
		p5.background(0);
		grid.update();
	}

});

function gameOver() {
	delete grid;
	grid = new Grid(width, height, divisionsX, divisionsY);
}