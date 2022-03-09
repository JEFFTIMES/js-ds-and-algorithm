class Node {

  constructor(value, left, right){
    this.value = value;
    this.left = left || undefined;
    this.right = right || undefined;
  }

  *[Symbol.iterator]() {
    yield this.value
    if(this.left){
      yield* this.left
    }
    if(this.right){
      yield* this.right
    }
  }

  * preOrder() {
    yield this.value
    if (this.left){
      yield* this.left.preOrder()
    }
    if (this.right){
      yield* this.right.preOrder()
    }
  }

  * middleOrder() {
    if(this.left){
      yield* this.left.middleOrder();
    }
    yield this.value
    if (this.right){
      yield* this.right.middleOrder();
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
    
    let leftNode = undefined;
    let rightNode = undefined;
    const rootNode = new Node(rootValue, leftNode, rightNode);
    this.count += 1;

    // the base case: left.length === 0 and right.length === 0, reach the leaf node.
    if (left.length === 0 && right.length === 0){
      return rootNode;
    }
    
    // the other cases: at least one of the left or right node is not a leaf node
    if(left.length !== 0){
      leftNode = this.rebuild(preOrder.slice(1, index+1), left);
    }
    if(right.length !== 0){
      rightNode = this.rebuild(preOrder.slice(index+1), right); 
    }  
    rootNode.left = leftNode;
    rootNode.right = rightNode;
    this.root = rootNode;
    return this.root
  }

  * [Symbol.iterator]() { 
    if(this.root){
      yield* this.root;
    }else{
      yield undefined;
    }
    
  }

  * preOrder(){
    // yield current node first
    if (this.root){
      yield* this.root.preOrder();
    }else{
      yield undefined;
    }
  }

  * middleOrder(){
  if (this.root){
    yield* this.root.middleOrder();
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
console.log(tree.count)
const preO = [...tree.preOrder()]
console.log(preO)
console.log([...tree.middleOrder()])

console.log([...tree])

function fibonacci(n) {
  const init = [0,1,]
  if (n < 2){
    return init[n]
  }
  let fn1 = 1
  let fn2 = 1
  for (let i=2; i <=n; i++){
    let fn = fn1 + fn2
    fn2 = fn1
    fn1 = fn
  }
  console.log(fn1)
  return fn1
}

fibonacci(8)