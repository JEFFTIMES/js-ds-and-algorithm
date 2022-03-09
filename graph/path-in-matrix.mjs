
function shape(matrix,dimensions=[]){
  if(! matrix instanceof Array){
    dimensions.push(matrix.length)
    return
  }
  if(matrix instanceof Array){
    dimensions.push(matrix.length)
    shape(matrix[0],dimensions)
  }
  return dimensions
}

function directions2d(matrix, position){
  const coords = []
  const mShape = shape(matrix)
  if(mShape.length !== 2){
    throw new TypeError('Matrix must be a 2D matrix')
  }
  const row = mShape[0], col = mShape[1]
  if(position.length !==2 || position[0] > row-1 || position[1] > col-1){
    throw new RangeError('invalid position param')
  }
  const r = position[0], c = position[1]
  const left = Math.max(0, c-1)
  const right = Math.min(c+1, col-1)
  const up = Math.max(0, r-1)
  const down = Math.min(r+1, row-1)
  
  for(let i=up; i<=down; i++){
    for(let j=left; j<=right; j++){
      if(Math.abs(i-r) !== Math.abs(j-c)) coords.push([i,j])
    }
  }
  return coords
}

function isPathNode(matrix, path, position, visited=[]){
  const directions = directions2d(matrix, position)
  let found = false
  // base case: the path array has no element, all the nodes of the path were found along the route.
  if(path.length === 1){
    return true;
  }

  // other cases: there are elements in the path array, try to walk the available directions to find 
  // if the element match the next node of the path, if yes, recursively call isPathNode() for checking
  // the the path starting with the next node.
  for( let coord of directions){
    if ( path[1] === matrix[coord[0]][coord[1]] // found the next node
      && visited.find(node => node[0] === coord[0] && node[1] === coord[1]) === undefined){ // and it is not visited
      visited.push(coord)
      found = isPathNode(matrix, path.slice(1), coord, visited)
      if(found) return found;
    }
  }
  return false;
}

function validatePath(matrix, path){
  // outer most iteration, traverse the whole matrix and take each of the element as the start node to validate the path
  const rowAndCol = shape(matrix)
  let found = false
  for( let row = 0; row < rowAndCol[0]; row++ ){
    for( let col = 0; col < rowAndCol[1]; col++ ){
      let start = matrix[row][col];
      if( start === path[0] ){ // only when the element equals to the starting node of the path
        found = isPathNode(matrix, path, [row, col]);
        if (found) return found;
      } 
    }
  }
  return found;
}


const m = [
  ['a','b','t','g'],
  ['c','f','c','s'],
  ['j','d','e','h']
]

const existPath = ['b','f','c','e','h','s','g']
const noneExistPath = ['a','b','f','c','j','h']

console.log(shape(m))

for(let row=0; row<m.length; row++){
  for(let col=0; col<m[0].length; col++){
    console.log(`[${row}, ${col}]`,JSON.stringify(directions2d(m, [row,col])))
  }
}

let found = validatePath(m, existPath)
console.log(found)
found = validatePath(m, noneExistPath)
console.log(found)

