'use strict'

const readline = require('readline-sync');

const Player = {
  ONE: 0,
  TWO: 1,
};

function TicTacToeBoard(gridSize) {
  this._gridSize = gridSize;
  this._grid = new Array(gridSize)
    .fill(null)
    .map(() => new Array(gridSize).fill(null));

  this.getGridSize = function() {
    return this._gridSize;
  };

  this.getOccupant = function(row, col) {
    return this._grid[row][col];
  };

  this.setOccupant = function(row, col, player) {
    this._grid[row][col] = player;
  };

  this.isCellEmpty = function(row, col) {
    return this.getOccupant(row, col) === null;
  };

  this.isValidCoordinate = function(row, col) {
    return row >= 0 && row < this._gridSize &&
      col >= 0 && col < this._gridSize;
  };
}

function TicTacToeBoardView() {
  this._symbolMap = {
    null: ' ',
    [Player.ONE]: 'X',
    [Player.TWO]: 'O',
  };

  this.render = function(board) {
    let output = '';

    const hSeparator = '-'.repeat((4 * board.getGridSize()) + 1);

    for (let r = 0; r < board.getGridSize(); r++) {
      output += hSeparator + '\n';

      let rowStr = '|';
      for (let c = 0; c < board.getGridSize(); c++) {
        const occupant = board.getOccupant(r, c);
        const symbol = this._symbolMap[occupant];
        rowStr += ` ${symbol} |`;
      }

      output += rowStr + '\n';
    }

    output += hSeparator;
    return output;
  };

  this.getSymbol = function(player) {
    return this._symbolMap[player];
  };
}

function PromptView(gridSize) {
  this._gridSize = gridSize;
  this._boardView = new TicTacToeBoardView();

  this.readRow = function(player) {
    const symbol = this._boardView.getSymbol(player);
    return Number(
      readline.question(`Enter a row (0 - ${this._gridSize - 1}) for player ${symbol}: `)
    );
  };

  this.readColumn = function(player) {
    const symbol = this._boardView.getSymbol(player);
    return Number(
      readline.question(`Enter a column (0 - ${this._gridSize - 1}) for player ${symbol}: `)
    );
  };

  this.displayBoard = function(board) {
    console.log('\n' + this._boardView.render(board));
  };

  this.displayPlayerWon = function(player) {
    const symbol = this._boardView.getSymbol(player);
    console.log(`Player ${symbol} won`);
  };

  this.displayDraw = function() {
    console.log('It\'s a draw');
  };

  this.displayInvalidCoordinateError = function() {
    console.log('Error: Invalid coordinate. Try again.')
  };

  this.displayCellAlreadyOccupiedError = function() {
    console.log('Error: Cell already occupied. Try again.')
  };
}

function TicTacToeController(config) {
  this._board = new TicTacToeBoard(config.gridSize);
  this._promptView = new PromptView(config.gridSize);

  this._currentPlayer = Player.ONE;
  this._moveCount = 0;

  this.initializeGame = function() {
    while (true) {
      this._promptView.displayBoard(this._board);

      const input = this._retrieveRowAndColumn();
      const row = input[0];
      const col = input[1];

      this._board.setOccupant(row, col, this._currentPlayer);

      if (this._isWon(row, col)) {
        this._promptView.displayBoard(this._board);
        this._promptView.displayPlayerWon(this._currentPlayer);
        break;
      }

      this._moveCount++;

      if (this._isDraw()) {
        this._promptView.displayBoard(this._board);
        this._promptView.displayDraw();
        break;
      }

      this._switchPlayer();
    }
  };

  this._retrieveRowAndColumn = function() {
    let row;
    let col;

    while (true) {
      row = this._promptView.readRow(this._currentPlayer);
      col = this._promptView.readColumn(this._currentPlayer);

      if (!this._board.isValidCoordinate(row, col)) {
        this._promptView.displayInvalidCoordinateError();
        continue;
      }

      if (!this._board.isCellEmpty(row, col)) {
        this._promptView.displayCellAlreadyOccupiedError();
        continue;
      }

      break;
    }

    return [row, col];
  };

  this._switchPlayer = function() {
    this._currentPlayer = this._currentPlayer === Player.ONE
      ? Player.TWO
      : Player.ONE;
  };

  this._isWon = function(lastRow, lastCol) {
    const gridSize = this._board.getGridSize();

    let rowWin = true;
    for (let c = 0; c < gridSize; c++) {
      if (this._board.getOccupant(lastRow, c) !== this._currentPlayer) {
        rowWin = false;
        break;
      };
    }

    if (rowWin) return true;

    // check column
    let colWin = true;
    for (let r = 0; r < gridSize; r++) {
      if (this._board.getOccupant(r, lastCol) !== this._currentPlayer) {
        colWin = false;
        break;
      }
    }

    if (colWin) return true;

    // check major diagonal (optional)
    if (lastRow === lastCol) {
      let majorDiagWin = true;
      for (let i = 0; i < gridSize; i++) {
        if (this._board.getOccupant(i, i) !== this._currentPlayer) {
          majorDiagWin = false;
          break;
        }
      }

      if (majorDiagWin) return true;
    }

    // check minor diagonal (optional)
    if (lastRow + lastCol === gridSize - 1) {
      let antiDiagWin = true;
      for (let i = 0; i < gridSize; i++) {
        if (this._board.getOccupant(i, gridSize - i - 1) !== this._currentPlayer) {
          antiDiagWin = false;
          break;
        }
      }

      if (antiDiagWin) return true;
    }

    return false;
  };

  this._isDraw = function() {
    return this._moveCount === this._board.getGridSize() ** 2;
  };
}

const controller = new TicTacToeController({ gridSize: 3 })

controller.initializeGame();