import StackWithMin from './stack-with-min-func.mjs'

function checkPushPopSeq(pushSeq, popSeq){
  
  //validate the input
  if(!pushSeq instanceof Array|| !popSeq instanceof Array){
    throw new TypeError('pushSeq and popSeq should be instanceof of Array.')
  }
  if(!pushSeq[0] || !popSeq[0] || pushSeq.length !== popSeq.length){
    throw new RangeError('push and pop sequence should neither be empty nor in different length.')
  }
  // immutable programming
  const pushes = [...pushSeq], pops = [...popSeq]; 
  const pushStack = new StackWithMin(), popStack = new StackWithMin();

  while(pushes[0]){ 
    const pushTop = pushes.shift();
    if(pushTop === pops[0]){ //if the pushing element equals to the top element of the popSeq, pop it up.
      pops.shift();
      continue;
    }
    pushStack.push(pushTop); //push the top element from the push sequence.
  }
  
  while(pops[0]){ // try to pop all the rest elements if they are the same as the corresponding one in the pops.
    const popTop = pops.shift();
    const pushTop = pushStack.pop();
    if(popTop === pushTop){
      continue;
    }
    pushStack.push(pushTop);

  }
  if(pushStack.pop() === undefined) return true;
  return false;

}

console.log(checkPushPopSeq([1,2,3,4,5,6,7],[4,6,7,5,3,2,1]))