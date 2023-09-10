'use strict'

function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
  console.log('pieceCoord:', pieceCoord)
  console.log('isWhite:', isWhite)
  let res = []
  let diff = isWhite ? -1 : 1
  let nextCoords = { i: pieceCoord.i + diff, j: pieceCoord.j }
  console.log('nextCoords:', nextCoords)

  if (isEmptyCell(nextCoords)) res.push(nextCoords)

  if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
    diff *= 2
    nextCoords = { i: pieceCoord.i + diff, j: pieceCoord.j }
    // console.log('nextCoords:', nextCoords)
    if (isEmptyCell(nextCoords)) res.push(nextCoords)
  }

  // Take over move
  let takeOverMoves = [
    { i: pieceCoord.i + diff, j: pieceCoord.j + 1 },
    { i: pieceCoord.i + diff, j: pieceCoord.j - 1 },
  ]
  console.log('takeOverMoves', takeOverMoves)
  takeOverMoves.forEach((move) => {
    if (!isEmptyCell(move) && isWhitePiece(move) !== isWhite) res.push(move)
  })

  console.log('res:', res)
  return res
}

function getAllPossibleCoordsRook(pieceCoord, isWhite) {
  console.log('pieceCoord:', pieceCoord)
  console.log('isWhite:', isWhite)
  let res = []
  let directions = [
    { i: -1, j: 0 },
    { i: 1, j: 0 },
    { i: 0, j: -1 },
    { i: 0, j: 1 },
  ]

  directions.forEach((direction) => {
    let i = pieceCoord.i + direction.i
    let j = pieceCoord.j + direction.j

    while (i >= 0 && i < 8 && j >= 0 && j < 8) {
      if (isEmptyCell({ i, j })) {
        res.push({ i, j })
      } else {
        if (isWhitePiece({ i, j }) !== isWhite) {
          res.push({ i, j })
        }
        break
      }
      i += direction.i
      j += direction.j
    }
  })

  return res
}

function getAllPossibleCoordsBishop(pieceCoord, isWhite) {
  console.log('pieceCoord:', pieceCoord)
  console.log('isWhite:', isWhite)
  let res = []
  let directions = [
    { i: -1, j: -1 },
    { i: -1, j: 1 },
    { i: 1, j: -1 },
    { i: 1, j: 1 },
  ]
  directions.forEach((direction) => {
    let i = pieceCoord.i + direction.i
    let j = pieceCoord.j + direction.j

    while (i >= 0 && i < 8 && j >= 0 && j < 8) {
      if (isEmptyCell({ i, j })) {
        res.push({ i, j })
      } else {
        if (isWhitePiece({ i, j }) !== isWhite) {
          res.push({ i, j })
        }
        break
      }
      i += direction.i
      j += direction.j
    }
  })

  return res
}

function getAllPossibleCoordsKnight(pieceCoord, isWhite) {
  console.log('pieceCoord:', pieceCoord)
  console.log('isWhite:', isWhite)
  let res = []
  let moves = [
    { i: -2, j: -1 },
    { i: -2, j: 1 },
    { i: -1, j: -2 },
    { i: -1, j: 2 },
    { i: 1, j: -2 },
    { i: 1, j: 2 },
    { i: 2, j: -1 },
    { i: 2, j: 1 },
  ]

  moves.forEach((move) => {
    let coord = {
      i: pieceCoord.i + move.i,
      j: pieceCoord.j + move.j,
    }

    if (coord.i >= 0 && coord.i < 8 && coord.j >= 0 && coord.j < 8) {
      if (isEmptyCell(coord) || isWhitePiece(coord) !== isWhite) {
        res.push(coord)
      }
    }
  })

  return res
}

function getAllPossibleCoordsKing(pieceCoord, isWhite) {
  console.log('pieceCoord:', pieceCoord)
  console.log('isWhite:', isWhite)
  let res = []
  let nextCoords = {}
  for (let i = pieceCoord.i - 1; i <= pieceCoord.i + 1; i++) {
    if (i < 0 || i > 7) continue
    for (let j = pieceCoord.j - 1; j <= pieceCoord.j + 1; j++) {
      if (j < 0 || j > 7) continue
      if (i === pieceCoord.i && j === pieceCoord.j) continue
      nextCoords = { i, j }
      console.log('nextCoords', nextCoords)
      if (isEmptyCell(nextCoords)) res.push(nextCoords)
    }
  }

  return res
}

function getAllPossibleCoordsQueen(pieceCoord, isWhite) {
  console.log('pieceCoord:', pieceCoord)
  console.log('isWhite:', isWhite)
  let res = []
  let directions = [
    { i: -1, j: 0 },
    { i: 1, j: 0 },
    { i: 0, j: -1 },
    { i: 0, j: 1 },
    { i: -1, j: -1 },
    { i: -1, j: 1 },
    { i: 1, j: -1 },
    { i: 1, j: 1 },
  ]

  directions.forEach((direction) => {
    let i = pieceCoord.i + direction.i
    let j = pieceCoord.j + direction.j

    while (i >= 0 && i < 8 && j >= 0 && j < 8) {
      if (isEmptyCell({ i, j })) {
        res.push({ i, j })
      } else {
        if (isWhitePiece({ i, j }) !== isWhite) {
          res.push({ i, j })
        }
        break
      }
      i += direction.i
      j += direction.j
    }
  })

  return res
}
