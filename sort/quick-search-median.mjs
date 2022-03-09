import partition from './partition.mjs'

function quickMedian(array){
  const middle = a.length >> 1
  if(array.length % 2 === 1){
    return findBySortedIndex(array, middle)
  }else{
    return (findBySortedIndex(array, middle) + findBySortedIndex(array, middle-1))/2.0
  }
}

function findBySortedIndex(array, index){
  const a = [...array]
  let start = 0, end = a.length-1;
  let p = partition(a, start, end);

  while(p != index){
    if(p > index){
      end = p -1
      p = partition(a, start, end)
    }
    if(p < index){
      start = p +1
      p = partition(a, start, end)
    }
  }
  return a[p]
}  

const a=[1,6,9,5,4,3,8,11,7,2] // median = 6

const median = quickMedian(a)

console.log(median, a)