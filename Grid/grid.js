class Grid {
  constructor(width, height, divisionsX, divisionsY) {
    this.divisionsX = divisionsX;
    this.divisionsY = divisionsY;
    this.stepX = width/divisionsX;
    this.stepY = height/divisionsY;
    this.pieces = [];
    this.squares = new Array(divisionsX).fill(undefined).map(() => new Array(divisionsY).fill(undefined));
    this.spawnPiece();
    setInterval(() => {
      if (this.controlledPiece == undefined) return;
      this.controlledPiece.moveDown();
    }, 750);

    setInterval(() => {
      if (p5.keyIsDown(65))
        this.controlledPiece.moveX(-1);

      if (p5.keyIsDown(68))
        this.controlledPiece.moveX(1);
        
      if (p5.keyIsDown(83))
        this.controlledPiece.moveDown();
    }, 100);
  }

  spawnPiece() {
    this.controlledPiece = new Piece(this, this.divisionsX/2, 0);
    this.pieces.push(this.controlledPiece);
  }

  update() {
    this.pieces.forEach(e => e.draw());
  }

  getPos(x, y) {
    return {x: this.stepX * x, y: this.stepY * y};
  }
}