class Node {

  constructor(value, left, right, parent){
    this.value = value;
    this.parent = parent || undefined;
    this.left = left || undefined;
    this.right = right || undefined;
  }

  * [Symbol.iterator]() {
    yield this.value
    if (this.left){
      yield* this.left
    }
    if (this.right){
      yield* this.right
    }
  }
}

class Tree {

  constructor(){
    this.root = undefined;
    this.count = 0;
  }

  rebuild(preOrder, middleOrder, parent=undefined){
    // get the first element from preOrder, it is the root node of the tree.
    const rootValue = preOrder[0];
    // find the index of the element root in the middleOrder, the elements ahead of the 
    // index of the root are the left sub-tree, which behind it are the right sub-tree.
    const index = middleOrder.indexOf(rootValue);
    const left = middleOrder.slice(0, index);
    const right = middleOrder.slice(index+1);

    const rootNode = new Node(rootValue, undefined, undefined, parent);
    this.count += 1;
    
    // the base case: left.length === 0 and right.length === 0, reach the leaf node.
    if (left.length === 0 && right.length === 0){
      return rootNode;
    }

    // the other cases: at least one of the left or right node is not a leaf node
    let leftNode = undefined;
    let rightNode = undefined;
    if(left.length !== 0){
      leftNode = this.rebuild(preOrder.slice(1, index+1), left, rootNode);
    }
    if(right.length !== 0){
      rightNode = this.rebuild(preOrder.slice(index+1), right, rootNode); 
    }  
    
    rootNode.left = leftNode;
    rootNode.right = rightNode;
    this.root = rootNode;
    return rootNode
  }

  * gen(){
    // yield current node first
    if (this.root){
      yield* this.root;
    }else{
      yield undefined;
    }
  }
}


const pre = ['a','b','d','e','h','i','c','f','g']
const middle = ['d','b','h','e','i','a','f','c','g']


const tree = new Tree()

const root = tree.rebuild(pre, middle)

console.log(tree)
console.log(root.left.right.right.parent.value)

