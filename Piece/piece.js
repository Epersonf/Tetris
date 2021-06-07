const pieces = [
  [[0, 0], [0, 1], [0, 2], [0, 3]],
  [[0, 0], [0, 1], [1, 1], [1, 0]],
  [[0, 0], [0, 1], [1, 1], [1, 2]]
];

const colors = ["#ff88ff", "#ff8888", "#88ff88", "#8888ff", "#ffff88"];

class Piece {
  constructor(grid, x, y) {
    this.grid = grid;
    this.x = x;
    this.y = y;
    
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.squares = [];
    pieces[Math.floor(Math.random() * pieces.length)].forEach((pos) => {
      this.squares.push(new Square(grid, this, pos[0], pos[1], this.color));
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
    for (let i in this.squares) {
      const e = this.squares[i];
      e.setGridPos(null);
      if (grid.controlledPiece != this) continue;
      if (!e.canMoveDown())
        this.stop();
    }

    if (this.grid.controlledPiece == this)
      this.y++;
    
    this.squares.forEach(e => e.setGridPos(e));
  }

  moveX(dir) {
    for (let i in this.squares) {
      const e = this.squares[i];
      e.setGridPos(null);
      if (grid.controlledPiece != this) continue;
      if (!e.canMoveHor(dir)) {
        this.squares.forEach(e => e.setGridPos(e));
        return;
      }
    }

    if (this.grid.controlledPiece == this)
      this.x += dir;
    this.squares.forEach(e => e.setGridPos(e));
  }

  rotate() {
    for (let i in this.squares) {
      if (!this.squares[i].canRotate())
        return;
      this.squares[i].setGridPos(null);
    }
    this.squares.forEach(e => e.rotate());
    this.squares.forEach(e => e.setGridPos(e));
  }

  stop() {
    this.squares.forEach(e => e.setGridPos(e));
    this.grid.verifyFilled();
    this.grid.spawnPiece();
  }
}