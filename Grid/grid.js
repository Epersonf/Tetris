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
      if (p5.keyIsDown(65) || p5.keyIsDown(37))
        this.controlledPiece.moveX(-1);

      if (p5.keyIsDown(68) || p5.keyIsDown(39))
        this.controlledPiece.moveX(1);

      if (p5.keyIsDown(83) || p5.keyIsDown(40))
        this.controlledPiece.moveDown();

      if (p5.keyIsDown(87) || p5.keyIsDown(38))
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

  verifyFilled() {
    for (let i = this.divisionsY - 1; i >= 0; i--) {
      if (!this.isRowFilled(i)) continue;
      this.removeRow(i);
      for (let j = i - 1; j >= 0; j--) {
        this.moveRowDown(j);
        i++;
      }
    }
  }

  moveRowDown(y) {
    for (let i = 0; i < this.divisionsX; i++) {
      const square = this.squares[i][y];
      if (square == null) continue;
      square.setGridPos(null);
      square.y++;
      square.setGridPos(square);
    }
  }

  isRowFilled(y) {
    if (y < 0 || y >= this.divisionsY) return false;
    for (let i = 0; i < this.divisionsX; i++) {
      if (this.squares[i][y] == undefined)
        return false;
    }
    return true;
  }

  removeRow(y) {
    for (let i = 0; i < this.divisionsX; i++) {
      this.squares[i][y].remove();
    }
  }

  getPos(x, y) {
    return {x: this.stepX * x, y: this.stepY * y};
  }
}