
import { SingleDirectionNode } from './nodes.mjs'

function findLastKthNode(head, lastKth){
  // empty link list or invalid lastKth
  if(head === undefined || lastKth < 1){
    throw new Error('invalid link list head or lastKth.')
  }
  let p1 = head
  let p2 = head
  // move p1 ahead of p2 k steps.
  for(let i = 0; i < lastKth ; i++){
    if(p1 === undefined){ // the given k is larger than the length of the link list
      throw new RangeError('given k larger than the length of link list.')
    }else{
      p1 = p1.next;
    }
  }
  // move p1 and p2 together until p1 reach the end of the link list.
  while(p1 !== undefined){
    p1 = p1.next;
    p2 = p2.next;
  }
  return p2.value;
}


let next = new SingleDirectionNode()
let head = next
next.value = 0
for (let i=1; i<10; i++){
  const tail = new SingleDirectionNode()
  tail.value = i;
  next.next = tail;
  next = tail;
}

let h = head
while(h!==undefined){
  console.log(h.value)
  h = h.next
}

let h2 = head;

let res = findLastKthNode(h2, 8)
console.log(res)