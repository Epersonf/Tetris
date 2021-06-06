const pieces = [
  [[0, 0], [0, 1], [0, 2], [0, 3]],
  [[0, 0], [0, 1], [1, 1], [1, 0]],
  [[0, 0], [0, 1], [1, 1], [1, 2]]
];

class Piece {
  constructor(grid, x, y) {
    this.grid = grid;
    this.x = x;
    this.y = y;

    this.squares = [];
    pieces[Math.floor(Math.random() * pieces.length)].forEach((pos) => {
      this.squares.push(new Square(grid, this, pos[0], pos[1]));
    });

    this.squares.forEach(e => {
      if (!e.canMoveDown())
        gameOver();
    });
  }

  draw() {
    this.squares.forEach(e => e.draw());
  }
  
  moveDown() {
    this.squares.forEach(e => {
      e.setGridPos(undefined);
      if (grid.controlledPiece != this) return;
      if (!e.canMoveDown())
        this.stop();
    });

    if (this.grid.controlledPiece == this)
      this.y++;
    
    this.squares.forEach(e => e.setGridPos(e));
  }

  moveX(dir) {
    this.squares.forEach(e => {
      e.setGridPos(undefined);
      if (grid.controlledPiece != this) return;
      if (!e.canMoveHor(dir))
        this.stop();
    });
    if (this.grid.controlledPiece == this)
      this.x += dir;
    this.squares.forEach(e => e.setGridPos(e));
  }

  stop() {
    this.grid.spawnPiece();
  }
}