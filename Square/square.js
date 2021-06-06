class Square {
  constructor(grid, piece, x, y) {
    this.grid = grid;
    this.piece = piece;
    this.x = x;
    this.y = y;
  }

  draw() {
    p5.fill(256);
    const absolutePos = this.getAbsolutePos();
    p5.rect(absolutePos.x, absolutePos.y, grid.stepX, grid.stepY);
  }

  setGridPos(value) {
    const gridPos = this.getAbsoluteGridPos();
    this.grid.squares[gridPos.x][gridPos.y] = value;
  }

  collisionDetectionBottom() {
    if (this.grid.controlledPiece != this.piece) return;

    if (this.piece.y + this.y >= this.grid.divisionsY - 1) {
      this.piece.stop();
      return;
    }

    const gridPos = this.getAbsoluteGridPos();
    let neighbour = this.grid.squares[gridPos.x][gridPos.y + 1];
    if (neighbour != undefined && neighbour.piece != this.piece) {
      this.piece.stop();
    }
  }

  collisionDetectionX(dir) {
    if (this.grid.controlledPiece != this.piece) return;

    const gridPos = this.getAbsoluteGridPos();
    if (gridPos.x + dir < 0 || gridPos.x + dir >= this.grid.divisionsX) {
      this.piece.stop();
      return;
    }
    
    let neighbour = this.grid.squares[gridPos.x + dir][gridPos.y];
    if (neighbour != undefined && neighbour.piece != this.piece)
      this.piece.stop();
  }

  getAbsoluteGridPos() {
    return {x: this.piece.x + this.x, y: this.piece.y + this.y};
  }

  getAbsolutePos() {
    let pos = this.grid.getPos(this.x, this.y);
    let piecePos = this.grid.getPos(this.piece.x, this.piece.y);
    return {x: piecePos.x + pos.x, y: piecePos.y + pos.y};
  }
}