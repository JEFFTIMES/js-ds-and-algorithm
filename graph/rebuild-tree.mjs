class Node {
  
  constructor(value, left, right){
    this.value = value;
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

  rebuild(preOrder, middleOrder){
    // get the first element from preOrder, it is the root node of the tree.
    const rootValue = preOrder[0];
    console.log(`rootValue:${rootValue}`)
    // find the index of the element root in the middleOrder, the elements ahead of the 
    // index of the root are the left sub-tree, which behind it are the right sub-tree.
    const index = middleOrder.indexOf(rootValue);
    const left = middleOrder.slice(0, index);
    const right = middleOrder.slice(index+1);
    
    // the base case: left.length === 0 and right.length === 0, reach the leaf node.
    if (left.length === 0 && right.length === 0){
      this.count++;
      return new Node(rootValue, undefined, undefined);
    }
    // the other cases: at least one of the left or right node is not a leaf node
    let leftNode = undefined;
    let rightNode = undefined;
    if(left.length !== 0){
      leftNode = this.rebuild(preOrder.slice(1, index+1), left);
      this.count++;
    }
    if(right.length !== 0){
      rightNode = this.rebuild(preOrder.slice(index+1), right); 
      this.count++; 
    }  
    const rootNode = new Node(rootValue, leftNode, rightNode);
    this.root = rootNode;
    return rootNode
  }

  * [Symbol.iterator](){
    // yield current node first
    if (this.root){
      yield* this.root;
    }else{
      yield undefined;
    }
    
  }
}


const pre = [1,2,4,7,3,5,6,8]
const middle = [4,7,2,1,5,3,8,6]


const tree = new Tree()
console.log(JSON.stringify(tree))
const root = tree.rebuild(pre, middle)

const t = [...tree]

console.log(t)

