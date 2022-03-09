/**
 * receives the source array n, the number of elements to permute, an array p to save the results.
 * @param {Array} n 
 * @param {number} r 
 * @param {Array[Array]} p 
 */
function permutation(n, r , p){
  if(n.length < 1 || r > n.length ){
    throw new RangeError('invalid range of n or r.')
  }
  
  // base case: r === 1, returns the current array n;
  if(r === 1){
    p.push([...n])
    return
  }

  // other cases: recursively processes array n with r-1, then swaps the (r-1)th element with 
  // the other elements and processes the changed array with r-1 to traverse all combinations
  // of the r-1 elements 
  permutation(n, r-1, p);

  for( let i = 0; i < r-1; i++ ){ // swap the numbers 
    let swapper
    if (r % 2 === 0){ // when r is an even number, swap ith element with (r-1)th.
      swapper = n[i];
      n[i] = n[r-1];
      n[r-1] = swapper; 
    }else{ // r is an odd, swap 0th with (r-1)th
      swapper = n[0];
      n[0] = n[r-1];
      n[r-1] = swapper;
    }
    permutation(n, r-1, p)
  }
}
const p = []
permutation([1,2,3,4], 4, p)
console.log(p)