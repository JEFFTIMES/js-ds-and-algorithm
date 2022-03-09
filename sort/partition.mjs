
/**
 * receives an array of numbers and the given pivot, returns the index of the pivot.
 * if the pivot is not given, returns the index of a randomly chosen number.
 * this function change the array in place.
 * @param {number[]} array of numbers
 * @param {number} start, the starting index of the range to be partitioned.
 * @param {number} end, the ending index of the range to be partitioned.
 * @param {number} pivot, the index given to take the number from the position as the pivot.
 */
export default function partition(array, start, end, pivot=undefined){

  // validating the input arguments
  if( ! array instanceof Array ){
    throw new TypeError("array must be an instance of Array");
  }

  if( typeof start !== 'number' || typeof end !== 'number' ){
    throw new TypeError("start, end must be a number");
  }

  for ( const element of array ){
    if( typeof element !== "number" ){
      throw new TypeError("elements of array must be numbers");
    }
  }

  // getting the pivot
  if(pivot === undefined){
    pivot = Math.floor( Math.random() * (end-start) + start ) 
  }else if( typeof pivot !== 'number'){
    throw new TypeError("pivot must be a number or undefined")
  }

  
  if(start < 0 || end > array.length-1 || pivot < start || pivot > end){
    throw new RangeError('start, pivot, end must be in an ascending sequence and in between the range of array.')
  }

  // swapping the numbers in between start to end which value are larger than pivot pivot to the right of the pivotal number
  // first, swap the pivotal number with the ending number
  let swapper = array[pivot]
  array[pivot] = array[end]
  array[end] = swapper

  // set the counter to count how many numbers are smaller than the pivotal number.
  // increase the counter while the number being iterated is smaller than the pivotal number.
  let small = start-1
  for (let i = start; i < end; i++){
    if(array[i] < array[end]){ 
      small += 1              // count the numbers are smaller than the pivotal number, it indicates the position this small number should be put in.
      if(small !== i){        // small as a pointer, just stand on the first number is larger than pivotal number, i stand on the first smaller after the larger ones. 
        swapper = array[i]    // swap the small number at the ith index with the number at the index equal to small(the first larger one).  
        array[i] = array[small]
        array[small] =swapper
      }
    }
  }
  small +=1 // get the position for the pivotal number
  swapper = array[small]    // swap the pivotal number back from the ending position
  array[small] = array[end]
  array[end] = swapper

  return small
}

