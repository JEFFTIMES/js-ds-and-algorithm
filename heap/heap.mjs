
function maxHeapify(array, index, heapSize=undefined){ //index is the zero base index.
  // validate inputs
  if(!array instanceof Array || typeof index !== 'number'){
    throw new TypeError("invalid type of array or index.")
  }
  if(index<0 || index>array.length){
    throw new RangeError('invalid length or range')
  }
  
  if(heapSize > array.length){
    throw new RangeError('invalid heap size.')
  }

  if(array.length === 0){
    return undefined
  }

  if(heapSize === undefined){
    heapSize = array.length;
  }

  // get the ith leftChild index, rightChild index.
  let maxValueIndex = index;
  const leftChildIndex = (index<<1) + 1;
  const rightChildIndex = (index<<1) + 2;

  //find the largest value then swap it with the ith value;
  if(leftChildIndex < heapSize && array[maxValueIndex] < array[leftChildIndex]){
    maxValueIndex = leftChildIndex;
  }
  if(rightChildIndex < heapSize && array[maxValueIndex] < array[rightChildIndex]){
    maxValueIndex = rightChildIndex;
  }
  if(maxValueIndex !== index){
    const swapper = array[index];
    array[index] = array[maxValueIndex];
    array[maxValueIndex] = swapper;
    maxHeapify(array, maxValueIndex, heapSize); // call it recursively to sink the value to the proper position.
  }
}

function minHeapify(array, index, heapSize=undefined){
  // validate inputs
  if(!array instanceof Array || typeof index !== 'number'){
    throw new TypeError("invalid type of array or index.")
  }
  if(index<0 || index>array.length){
    throw new RangeError('invalid length or range')
  }
  
  if(array.length === 0)  return undefined;

  if(heapSize=== undefined) heapSize= array.length;
  
  // get the leftChildIndex and rightChildIndex
  let minValueIndex = index;
  const leftChildIndex = (index<<1) + 1;
  const rightChildIndex = (index<<1) + 2;

  // find the child with minimum value then swap the value with ith.
  if(leftChildIndex < heapSize && array[minValueIndex] > array[leftChildIndex]){
    minValueIndex = leftChildIndex;
  }
  if(rightChildIndex < heapSize && array[minValueIndex] > array[rightChildIndex]){
    minValueIndex = rightChildIndex;
  }
  if(minValueIndex !== index){
    const swapper = array[index];
    array[index] = array[minValueIndex];
    array[minValueIndex] = swapper;
    minHeapify(array, minValueIndex, heapSize); 
  }
}

function buildHeap(array, heapify='max', heapSize=undefined){
    // validate inputs
    if(!array instanceof Array || heapify !== 'max' && heapify !== 'min'){
      throw new TypeError("invalid type of array or heapify function.")
    }
    if(array.length === 0){
      return undefined
    }

    if(heapSize === undefined) heapSize = array.length;

    let heapifyFunc = maxHeapify;
    if(heapify === 'min') heapifyFunc = minHeapify;  

    // calculate the index of the starting leaf node, the index priory to it is the index of the last sub root.
    const lastRootIndex = (heapSize>>1) - 1;
    
    // traverse the rest of array backward from rootIndex to the first element, call heapify function each iteration 
    // to make the sub heap confines the heap property.
    for(let index=lastRootIndex; index>=0; index--){
      heapifyFunc(array, index, heapSize);
    }
}


function heapSort(array, method='asc'){
  if(!array instanceof Array || array.length === 0 || typeof array[0] !=='number' ){
    throw new TypeError('array is not an instance of Array with number elements.')
  }
  const copyArray = [...array];
  const sorted = [];
  while(copyArray.length !==0 ){
    buildHeap(copyArray, method ==='asc' ? 'min':'max'); // get the largest element at the [0] index.
    const tail = copyArray.length-1 // swap copyArray[0] with copyArray[lastIndex]
    const swapper = copyArray[tail];
    copyArray[tail] = copyArray[0];
    copyArray[0] = swapper;
    sorted.push(copyArray.pop()); // push the max value to sorted, and shrink out the max from copyArray.
  }
  return sorted;
}

function heapSort2(array, method='asc'){
  if(!array instanceof Array || array.length === 0 || typeof array?.[0] !=='number' ){
    throw new TypeError('array is not an instance of Array with number elements.')
  }
  for(let tailIndex=array.length-1; tailIndex>=0; tailIndex--){
    buildHeap(array, method ==='asc' ? 'max':'min', tailIndex+1); // get the largest element at the [0] index.
    // swap copyArray[0] with copyArray[tailIndex]
    const swapper = array[tailIndex];
    array[tailIndex] = array[0];
    array[0] = swapper;
  }
  return array;
}

function max(array){
  if(!array instanceof Array){
    throw new TypeError('heap must be an instance of Array.')
  }  
  
  if(array.length === 0){
    return undefined
  }
  buildHeap(array)
  return array[0]
}
function min(array){
  if(!array instanceof Array){
    throw new TypeError('heap must be an instance of Array.')
  }  
  
  if(array.length === 0){
    return undefined
  }
  buildHeap(array, 'min')
  return array[0]
}

function popMax(array){
  if(!array instanceof Array){
    throw new TypeError('heap must be an instance of Array.')
  }  
  if(array.length === 0){
    return undefined
  }
  buildHeap(array)
  const maxValue = array[0]
  array[0] = array[array.length-1]
  array[array.length-1] = maxValue
  array.pop()
  buildHeap(array)
  return maxValue;
}

function popMin(array){
  if(!array instanceof Array){
    throw new TypeError('heap must be an instance of Array.')
  }  
  if(array.length === 0){
    return undefined
  }
  buildHeap(array, 'min')
  const minValue = array[0]
  array[0] = array[array.length-1]
  array[array.length-1] = minValue
  array.pop()
  buildHeap(array,'min')
  return minValue;
}

function insert(array, value, type='max'){
  if(!array instanceof Array){
    throw new TypeError('heap must be an instance of Array.')
  }  
  if(typeof value !== 'number'){
    throw new TypeError('given value must be a number.')
  }
  array.push(value);
  buildHeap(array, type==='max' ? 'max':'min')
}

export {
  buildHeap,
  heapSort,
  max,
  min,
  popMax,
  popMin,
  insert,
}

// const a = [1,2,5,3,33,21,8,0,9];

// console.log(heapSort(a))
// console.log(a)
// heapSort2(a, 'dsc')
// console.log(a)

// a.push(34)
// buildHeap(a)
// console.log(a)
// console.log(popMin(a),a)
// insert(a, 6)
// console.log(a)
// const b=[]
// buildHeap(b)
// console.log(max(b))