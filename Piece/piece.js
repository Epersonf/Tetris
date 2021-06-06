const pieces = [
  [[0, 0], [0, 1], [0, 2], [0, 3]],
  [[0, 0], [0, 1], [1, 1], [1, 0]]
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
  }

  draw() {
    this.squares.forEach(e => e.draw());
  }
  
  moveDown() {
    this.squares.forEach(e => e.setGridPos(undefined));
    this.y++;
    this.squares.forEach(e => {
      e.setGridPos(e);
      e.collisionDetectionBottom();
    });
  }

  moveX(dir) {
    this.squares.forEach(e => {
      e.setGridPos(undefined)
      e.collisionDetectionX(dir);
    });
    if (this.grid.controlledPiece == this)
      this.x += dir;
    this.squares.forEach(e => e.setGridPos(e));
  }

  stop() {
    this.grid.spawnPiece();
  }
}