import { singleDirectionNode } from './nodes.mjs'

function findEntryNodeOfRing(head){
  let doubleSpeedPointer = head
  let pointer = head
  // run to the first time when two pointers meet each other.
  do {
    pointer = pointer.next;
    doubleSpeedPointer = doubleSpeedPointer.next.next;
  }while(pointer !== doubleSpeedPointer)
  
  // count the length of the ring
  let counter = 0;
  do {
    pointer = pointer.next;
    doubleSpeedPointer = doubleSpeedPointer.next.next;
    counter++;
  }while(pointer !== doubleSpeedPointer)
  console.log('length of ring: ', counter)

  // set the doubleSpeedPointer number of length of the ring steps ahead of the pointer,
  // then run to the two pointers meet again, the node they stopped at is the entrypoint.
  pointer = head;
  let prePointer = head;
  for(let i=0; i<counter; i++){
    prePointer = prePointer.next;
  }
  do{
    pointer = pointer.next;
    prePointer = prePointer.next;
  }while(pointer !== prePointer);
  console.log('entrypoint: ', prePointer.value)
  return pointer;
}

let head = new singleDirectionNode()
let tail = head
tail.value = 0
for (let i=1; i<10; i++){
  const newNode = new singleDirectionNode()
  newNode.value = i;
  tail.next = newNode;
  tail = newNode;
}

const n3 = head.next.next.next
tail.next = n3

findEntryNodeOfRing(head)

