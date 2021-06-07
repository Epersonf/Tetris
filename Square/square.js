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
    if (neighbour != null && neighbour.piece != this.piece)
      return false;
    
    return true;
  }

  canMoveHor(dir) {
    const gridPos = this.getAbsoluteGridPos();
    if (gridPos.x + dir < 0 || gridPos.x + dir >= this.grid.divisionsX) {
      return false;
    }
    
    let neighbour = this.grid.squares[gridPos.x + dir][gridPos.y];
    if (neighbour != null && neighbour.piece != this.piece)
      return false;

    return true;
  }

  canRotate() {
    const rotatedPos = this.getAbsoluteGridRotatedPos();
    if (rotatedPos.x < 0 || rotatedPos.x > this.grid.divisionsX - 1)
      return false;
    if (rotatedPos.y < 0 || rotatedPos.y > this.grid.divisionsY - 1)
      return false;
    const destSquare = this.grid.squares[rotatedPos.x][rotatedPos.y];
    if (destSquare != null && destSquare.piece != this.piece)
      return false;
    return true;
  }

  rotate() {
    const rotatedPos = this.getRotatedPos();
    this.x  = rotatedPos.x;
    this.y  = rotatedPos.y;
  }

  remove() {
    const gridPos = this.getAbsoluteGridPos();
    this.grid.squares[gridPos.x][gridPos.y] = null;
    this.piece.squares = this.piece.squares.filter((e) => e != this);
    delete this;
  }
  
  getRotatedPos() {
    return { x: this.y, y: -this.x };
  }

  getAbsoluteGridRotatedPos() {
    return { x: this.piece.x + this.y, y: this.piece.y - this.x };
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