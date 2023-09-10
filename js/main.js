'use strict'

// The Chess Board
let gBoard
let gSelectedElCell = null
let gPiece = null
let gPalyer
let isWhiteTurn = true

function onRestartGame() {
  gPalyer = document.querySelector('.player-turn')
  console.log('Game restarted')
  gBoard = buildBoard()
  renderBoard(gBoard)
  getTurn()
}

function getTurn() {
  gPalyer.innerHTML = isWhiteTurn ? 'whith ' : 'black '
}

function buildBoard() {
  let board = []
  // build the board 8 * 8
  for (let i = 0; i < 8; i++) {
    board[i] = []
    for (let j = 0; j < 8; j++) {
      board[i][j] = ''
      if (i === 1) board[i][j] = PAWN_BLACK
      if (i === 6) board[i][j] = PAWN_WHITE
    }
  }

  board[0][0] = board[0][7] = ROOK_BLACK
  board[0][1] = board[0][6] = KNIGHT_BLACK
  board[0][2] = board[0][5] = BISHOP_BLACK
  board[0][3] = QUEEN_BLACK
  board[0][4] = KING_BLACK

  board[7][0] = board[7][7] = ROOK_WHITE
  board[7][1] = board[7][6] = KNIGHT_WHITE
  board[7][2] = board[7][5] = BISHOP_WHITE
  board[7][3] = QUEEN_WHITE
  board[7][4] = KING_WHITE

  console.table(board)
  return board
}

function renderBoard(board) {
  let strHTML = ''
  for (let i = 0; i < board.length; i++) {
    let row = board[i]
    strHTML += '<tr>'
    for (let j = 0; j < row.length; j++) {
      let cell = row[j]
      // figure class name
      let className = (i + j) % 2 === 0 ? 'white' : 'black'
      let tdId = `cell-${i}-${j}`
      strHTML += `<td id="${tdId}" 
                            onclick="cellClicked(this)" 
                            class="${className} draggable"  draggable="true">
                            ${cell}                                                      
                        </td>`
    }
    strHTML += '</tr>'
  }
  let elMat = document.querySelector('.game-board')
  elMat.innerHTML = strHTML
}

function cleanBoard() {
  let elTds = document.querySelectorAll('.mark, .selected')
  for (let i = 0; i < elTds.length; i++) {
    elTds[i].classList.remove('mark', 'selected')
  }
  getTurn()
}

function cellClicked(elCell) {
  //   console.log('elCell', elCell)

  if (elCell.classList.contains('mark')) {
    movePiece(gSelectedElCell, elCell)
    cleanBoard()
    return
  }
  let cellCoord = getCellCoord(elCell.id)
  //   console.log('cellCoord', cellCoord)

  cleanBoard()

  elCell.classList.add('selected')
  gSelectedElCell = elCell

  let piece = gBoard[cellCoord.i][cellCoord.j]
  //   console.log('piece:', piece)

  let possibleCoords = []
  switch (piece) {
    case ROOK_BLACK:
    case ROOK_WHITE:
      possibleCoords = getAllPossibleCoordsRook(cellCoord, piece === ROOK_WHITE)
      break
    case KING_BLACK:
    case KING_WHITE:
      possibleCoords = getAllPossibleCoordsKing(cellCoord, piece === KING_WHITE)
      break
    case QUEEN_BLACK:
    case QUEEN_WHITE:
      possibleCoords = getAllPossibleCoordsQueen(
        cellCoord,
        piece === QUEEN_WHITE
      )
      break
    case BISHOP_BLACK:
    case BISHOP_WHITE:
      possibleCoords = getAllPossibleCoordsBishop(
        cellCoord,
        piece === BISHOP_WHITE
      )
      break
    case KNIGHT_BLACK:
    case KNIGHT_WHITE:
      possibleCoords = getAllPossibleCoordsKnight(
        cellCoord,
        piece === KNIGHT_WHITE
      )
      break
    case PAWN_BLACK:
    case PAWN_WHITE:
      possibleCoords = getAllPossibleCoordsPawn(cellCoord, piece === PAWN_WHITE)
      break
  }
  markCells(possibleCoords)
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
  let coord = {}
  let parts = strCellId.split('-')
  // console.log('parts:', parts)
  coord.i = +parts[1]
  coord.j = +parts[2]
  return coord
}

function getSelector(coord) {
  return `#cell-${coord.i}-${coord.j}`
}

function isEmptyCell(coord) {
  console.log('gBoard[coord.i][coord.j]', gBoard[coord.i][coord.j])
  return gBoard[coord.i][coord.j] === ''
  // return !gBoard[coord.i][coord.j]
}

function markCells(coords) {
  console.log('coords:', coords)
  // query select them one by one and add mark
  if (coords.length) {
    for (let i = 0; i < coords.length; i++) {
      let coord = coords[i]
      //   console.log('coord:', coord)
      let selector = getSelector(coord)
      //   console.log('selector:', selector)
      let elCell = document.querySelector(selector)
      //   console.log('elCell:', elCell)
      elCell.classList.add('mark')
    }
  }
}

function movePiece(elFromCell, elToCell) {
  // console.log('elFromCell:', elFromCell)
  // console.log('elToCell:', elToCell)

  let fromCoord = getCellCoord(elFromCell.id)
  let toCoord = getCellCoord(elToCell.id)

  // update the MODEl,
  let piece = gBoard[fromCoord.i][fromCoord.j]
  //   console.log('piece:', piece)
  gBoard[fromCoord.i][fromCoord.j] = ''
  gBoard[toCoord.i][toCoord.j] = piece

  // update the DOM
  elFromCell.innerText = ''
  elToCell.innerText = piece
  isWhiteTurn = !isWhiteTurn
}

function isWhitePiece(coord) {
  let piece = gBoard[coord.i][coord.j]
  return (
    piece === PAWN_WHITE ||
    piece === ROOK_WHITE ||
    piece === KNIGHT_WHITE ||
    piece === BISHOP_WHITE ||
    piece === QUEEN_WHITE ||
    piece === KING_WHITE
  )
}
