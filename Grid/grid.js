class Grid {
  constructor(width, height, divisionsX, divisionsY) {
    this.divisionsX = divisionsX;
    this.divisionsY = divisionsY;
    this.stepX = width/divisionsX;
    this.stepY = height/divisionsY;
    this.pieces = [];
    this.squares = new Array(divisionsX).fill(null).map(() => new Array(divisionsY).fill(null));
    this.spawnPiece();

    //#region Gravity
    setInterval(() => {
      if (this.controlledPiece == undefined) return;
      this.controlledPiece.moveDown();
    }, 750);
    //#endregion

    //#region Inputs
    setInterval(() => {
      if (p5.keyIsDown(65))
        this.controlledPiece.moveX(-1);

      if (p5.keyIsDown(68))
        this.controlledPiece.moveX(1);

      if (p5.keyIsDown(83))
        this.controlledPiece.moveDown();

      if (p5.keyIsDown(87))
        this.controlledPiece.rotate();
    }, 100);
    //#endregion Inputs
  }

  spawnPiece() {
    this.controlledPiece = new Piece(this, this.divisionsX/2, 0);
    this.pieces.push(this.controlledPiece);
  }

  update() {
    this.pieces.forEach(e => e.draw());
  }

  isRollFilled(y) {
    if (y < 0 || y >= this.divisionsY) return false;
    for (let i = 0; i < divisionsX; i++) {
      if (this.squares[i][y] == undefined)
        return false;
    }
    return true;
  }

  getPos(x, y) {
    return {x: this.stepX * x, y: this.stepY * y};
  }
}