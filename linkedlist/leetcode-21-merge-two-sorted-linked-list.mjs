import { SingleDirectionNode } from './nodes.mjs'


function mergeTwoSorted(h1, h2){
  if(h1 === undefined || h2 === undefined){
    throw new TypeError('heads must not be undefined')
  }
  const hSmaller =  h1.value < h2.value ? h1 : h2;
  const hLarger = h1.value < h2.value ? h2 : h1;
  
  return recursivelyMerge(hSmaller, hLarger)
  
}

function recursivelyMerge(hs, hl, hm=undefined){
  let rhm = undefined;                // to keep the head of the merged linked list.
  
  if(hm === undefined){    // the first time entering the merge function, hs moves forward one node to start the recursion.
    hm = hs;
    hs = hs.next;
    rhm = hm;
    if (hs != undefined && hs.value > hl.value){ // reset smaller and larger if the values of the head nodes are not conformed.
      const ht = hs;
      hs = hl;
      hl = ht; 
    }  
  }
  
  while(hs !== undefined || hl !== undefined){    // any of the linked lists has nodes.
    if(hs !== undefined){                        // the linked list with smaller head node still has nodes.
      hm.next = hs;                             // add the head node of hs to hm
      hm = hm.next;                             // hm moves to its next node
      hs = hs.next;                             // hs moves to its next node
      
      if(hs !== undefined && hs.value > hl.value){ // hs is not empty and its head node larger than hl, swap hs and hl
        const ht = hs;                              
        hs = hl;
        hl = ht;
      }
      recursivelyMerge(hs, hl, hm);
    }else{ // the linked list with smaller head is empty, the list with larger head may still has nodes.
      while(hl !== undefined){
        hm.next = hl;
        hm = hm.next;
        hl = hl.next;
      }
    }
  return rhm
  }
}

function mergeTwoSortedRecursively(h1, h2){

  // h1 is exhausted
  if(h1 === undefined){ 
    return h2;
  }
  // h2 is exhausted
  if(h2 === undefined){
    return h1;
  }

  // move the head 1 step forward of the linked list with a smaller value at current node and call recursively merge 
  // with the changed head and the other head.
  // receive the returns of the recursively merge as the next node of the linked list with smaller value at current node.
  // return the head of the list with smaller value at current node.
  if(h1.value < h2.value){
    h1.next = mergeTwoSortedRecursively(h1.next, h2);
    return h1;
  }else{
    h2.next = mergeTwoSortedRecursively(h1, h2.next);
    return h2;
  }
}


let hEven = new SingleDirectionNode()
let hOdd = new SingleDirectionNode()
let tEven = hEven
let tOdd = hOdd
tEven.value = 0
tOdd.value = 1

for (let i=2; i<10; i++){
  const newNode = new SingleDirectionNode()
  newNode.value = i;
  if((i&1) === 0){ //even number
    tEven.next = newNode;
    tEven = newNode;
  }else{
    tOdd.next = newNode;
    tOdd = newNode
  }
}

let he = hEven, ho = hOdd
while(he !== undefined || ho !== undefined){
  console.log('even: ', he.value, '\todd: ', ho.value)
  he = he.next;
  ho = ho.next;
}
he = hEven;
while(he.next){
  he = he.next;
}
for ( let e of [9,10,16,24]){
  const n = new SingleDirectionNode(e);
  he.next = n;
  he = he.next;
}
he = hEven
while(he!== undefined){
  console.log(he.value)
  he = he.next
}

//let hm = mergeTwoSorted(hEven, hOdd, hEven)
let hm = mergeTwoSortedRecursively(hEven, hOdd)
while(hm !== undefined){
  console.log(hm.value)
  hm = hm.next
}