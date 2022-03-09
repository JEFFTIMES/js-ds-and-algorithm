
/**
 * 
 * @param {Array[Array]} matrix 
 * @param {Array} start
 */
function* genSwirlyIterate(matrix, start, bottomRight){
  // validate shape of the matrix
  if(!matrix instanceof Array || !matrix.length || !matrix[0] instanceof Array || !matrix[0].length){
    throw new TypeError('invalid matrix type or dimensions.')
  }
  // validate range of start and bottomRight
  if(start[0]<0 || start[1]<0 || bottomRight[0]>matrix.length-1 || bottomRight[1]>matrix[0].length-1){
    throw new RangeError('given start or bottomRight is out of the range.')
  }

  const startRow = start[0], startCol = start[1];
  const endRow = bottomRight[0], endCol = bottomRight[1];

  //base case: the inner circle recess to a none 4-ways circle.
  if(endRow-startRow===0 && endCol-startCol>=0){ // rows is an odd number and cols >= rows, only 1-way left.
    for(let col=startCol; col<endCol+1; col++){
      yield matrix[startRow][col]
    }
    return;
  }else if(endCol-startCol===0 && endRow-startRow>0){ // col is an odd number and rows > cols 2-ways left.
    yield matrix[startRow][startCol];
    for(let row=startRow+1; row<endRow+1; row++){
      yield matrix[row][endCol];
    }
    return;
  }else if(endRow-startRow===1 && endCol-startCol>=1){ // row is an even number and col >= rows, 3-ways left.
    for(let col=startCol; col<endCol+1; col++){
      yield matrix[startRow][col];
    }
    yield matrix[endRow][endCol];
    for(let col=endCol-1; col>startCol-1; col--){
      yield matrix[endRow][col]
    }
    return;
  }else if(startCol-endCol>0){ // the previous circle is a 4-ways circle, exactly exhaust all the elements. 
    return
  }


  //other cases: iterating the outer 4-ways circle then recursively process inner circle
  //top-left-to-right: row [startRow][startCol] to [startRow][endCol]
  for(let col=startCol; col<endCol+1; col++){
    yield matrix[startRow][col]
  }
  //right-top-to-down: col [startRow+1][endCol] to [endRow][endCol]
  for(let row=startRow+1; row<endRow+1; row++){
    yield matrix[row][endCol]
  }
  //bottom-right-to-left row [endRow][endCol-1] to [endRow][startCol]
  for(let col=endCol-1; col>startCol-1; col--){
    yield matrix[endRow][col]
  }
  //left-bottom-to-top col [endRow-1][startCol] to [startRow+1][startCol]
  for(let row=endRow-1; row>startRow; row--){
    yield matrix[row][startCol]
  }
  //recursively processes the inner circle.
  yield* genSwirlyIterate(matrix, [startRow+1,startCol+1], [endRow-1, endCol-1])
}

const matrix = []
const rows = [0,1,2,3], cols = [0,1,2,3];

for(let row of rows){
  const rowArray = new Array()
  for(let col of cols){
    rowArray.push((col+1) + row *cols.length);
  }
  matrix.push(rowArray)
}
console.log(matrix)

const swirlyIterator = genSwirlyIterate(matrix, [0,0], [matrix.length-1, matrix[0].length-1]);
for(let e of swirlyIterator){
  console.log(e)
}