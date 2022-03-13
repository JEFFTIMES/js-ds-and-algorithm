import {
  buildHeap,
  popMin,
  popMax,
  max,
  min,
  insert 
} from './heap.mjs'

class StreamMedian{
  constructor(windowSize){
    this.maxHeap = new Array();
    this.minHeap = new Array();
    this.insertFlag = 0;
  }
  insert(value){
    if( this.insertFlag === 0 ){ // odd index
      if(value > min(this.minHeap)){
        insert(this.maxHeap, popMin(this.minHeap), 'max');
        insert(this.minHeap, value, 'min');
      }else{
        insert(this.maxHeap, value, 'max');
      }
      this.insertFlag = 1;
    }else{ // even index
      if(value < max(this.maxHeap)){
        insert(this.minHeap, popMax(this.maxHeap), 'min');
        insert( this.maxHeap, value, 'max');
      }else{
        insert(this.minHeap, value, 'min');
      }
      this.insertFlag = 0;
    }
  }
  median(){
    if(this.insertFlag === 1){
      return max(this.maxHeap);
    }else{
      return (parseFloat(max(this.maxHeap) + min(this.minHeap))/2.0)
    }
  }
}


const a = [1,4,6,3,2,7,9,10,0,87,23,14,9,44,77,64,32,91,32,1,8,7,111,0]
const ms = new StreamMedian(10);
for (let e of a){
  ms.insert(e)
}
console.log('max heap:', ms.maxHeap)
console.log('min heap:', ms.minHeap)
console.log(ms.median())
