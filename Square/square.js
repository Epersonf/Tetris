class Square {
  constructor(grid, piece, x, y, color) {
    this.grid = grid;
    this.piece = piece;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw() {
    p5.fill(this.color);
    const absolutePos = this.getAbsolutePos();
    p5.rect(absolutePos.x, absolutePos.y, grid.stepX, grid.stepY);
  }

  setGridPos(value) {
    const gridPos = this.getAbsoluteGridPos();
    this.grid.squares[gridPos.x][gridPos.y] = value;
  }

  canMoveDown() {
    if (this.piece.y + this.y >= this.grid.divisionsY - 1)
      return false;

    const gridPos = this.getAbsoluteGridPos();
    let neighbour = this.grid.squares[gridPos.x][gridPos.y + 1];
    if (neighbour != undefined && neighbour.piece != this.piece)
      return false;
    
    return true;
  }

  canMoveHor(dir) {
    const gridPos = this.getAbsoluteGridPos();
    if (gridPos.x + dir < 0 || gridPos.x + dir >= this.grid.divisionsX) {
      return false;
    }
    
    let neighbour = this.grid.squares[gridPos.x + dir][gridPos.y];
    if (neighbour != undefined && neighbour.piece != this.piece)
      return false;

    return true;
  }

  rotate() {
    this.x  = -this.x;
    let store = this.y;
    this.y = this.x;
    this.x = store;
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