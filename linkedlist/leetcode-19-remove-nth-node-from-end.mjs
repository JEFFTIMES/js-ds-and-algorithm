import { SingleDirectionNode } from './nodes.mjs'

/* 
Given a linked list, remove the n-th node from the end of list and return its head.
Given linked list: 1->2->3->4->5, and n = 2.
After removing the second node from the end, the linked list becomes 1->2->3->5.

*/

function removeNodeFromEnd(head, n) {
  
  if(head === undefined){
    throw new TypeError('head of given list is undefined.');
  }

  // move p1 n step ahead of the p2
  let p1 = head, p2 = head;
  for(let i=0; i<n; i++){
    // given number n is larger than the length of the list.
    if(p1 === undefined){
      throw new ValueError('given n is larger than the length of the linked list.');
    }
    p1 = p1.next;
  }

  // p1 === undefined, the removal node is the head of the linked list
  if(p1 === undefined){
    head = p2.next;
    return head;
  }

  // move the p1 and p2 all together till p1 reach the end(undefined).
  while(p1.next !== undefined){
    p1 = p1.next;
    p2 = p2.next;
  }

  // override p2 with its next node if the next node is not the end.
  p2.next = p2.next.next;
  return head;
}

let n = 10;
let head = new SingleDirectionNode();
head.value = 1;
const fixedHead = head

for(let i=2; i<n+1; i++){
  const node = new SingleDirectionNode();
  node.value = i;
  head.next = node;
  head = node;
}

let h = removeNodeFromEnd(fixedHead,10);
while(h !== undefined){
  console.log(h.value);
  h = h.next;
}