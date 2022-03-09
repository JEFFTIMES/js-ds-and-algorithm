
import Node from './nodes.mjs'

function* genLayeredTraverse(root){
  // validate the input
  if(!root instanceof Node){ 
    throw new TypeError('given tree root must be instanceof Node.')
  }
  
  const queue = new Array(root);
  while(queue.length !== 0){ // run to empty the queue
    const node = queue.shift();
    if(node === undefined){ // skip the push while current node is undefined.
      //yield undefined;
      continue;
    }else{
      yield node.value;
    } 
    // push sub tree nodes;
    queue.push(node?.left);
    queue.push(node?.right);     
  }
}


function printTreeWithLevels(root){
  // validate the input
  if(!root instanceof Node){ 
    throw new TypeError('given tree root must be instanceof Node.')
  }
  
  const queue = new Array(root);
  let toBePrint = 1;
  let nodesInNextLevel = 0;
  let levelString ='';
  while(queue.length !==0){
    
    const node = queue.shift();
    levelString += node.value.toString() + '\t'
    toBePrint--;

    if(node.left){
      nodesInNextLevel++;
      queue.push(node.left);
    }
    if(node.right){
      nodesInNextLevel++;
      queue.push(node.right);
    }
    if(toBePrint===0){
      console.log(levelString);
      levelString = '';
      toBePrint = nodesInNextLevel;
      nodesInNextLevel = 0;
    }
  }
}

function zigPrintTreeWithLevels(root){
  // validate the input
  if(!root instanceof Node){ 
    throw new TypeError('given tree root must be instanceof Node.')
  }
  
  const queue = new Array(root);
  let nextLevelIndex =1;
  let toBePrint = 1;
  let nodesInNextLevel = 0;
  let levelString ='';
  while(queue.length !==0){
    
    const node = queue.shift();
    levelString += node.value.toString()
    toBePrint--;
    
    if(node.left){
      nodesInNextLevel++;
      queue.push(node.left);
    }
    if(node.right){
      nodesInNextLevel++;
      queue.push(node.right);
    }
    if(toBePrint===0){
      if(nextLevelIndex & 1){
        levelString = levelString.split('').reverse().join('');
      }
      console.log(levelString);
      levelString = '';
      toBePrint = nodesInNextLevel;
      nodesInNextLevel = 0;
      nextLevelIndex++;
    }
  }
}


const nodes = []
for (let node of 'abcdefg'){
  nodes.push(new Node(node))
}

nodes[0].left = nodes[1]
nodes[0].right = nodes[2]
nodes[1].left = nodes[3]
nodes[1].right = nodes[4]
nodes[2].left = nodes[5]
nodes[2].right = nodes[6]

const root = nodes[0]
for(let n of [...root]){
  console.log(n)
}

for(let nodeValue of genLayeredTraverse(root)){
  console.log(nodeValue)
}

printTreeWithLevels(root)

zigPrintTreeWithLevels(root)