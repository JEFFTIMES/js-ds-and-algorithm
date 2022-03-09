import Node from './nodes.mjs'

// a generator to iterate all the nodes of the given tree.
function* genTreeNode(root){
  yield root;
  if(root.left !== undefined){
    yield* genTreeNode(root.left);
  }
  if(root.right !== undefined){
    yield* genTreeNode(root.right);
  }
} 

// traverse the tree, take each of the node as the root node to compare with the sub.
function isSubTree(tree, sub){
  // validating input
  if(tree === undefined || sub === undefined){
    throw new TypeError('tree and sub tree must not be undefined.')
  }
  // traverse the tree.
  for(let node of genTreeNode(tree)){
    if(recursivelyCheckSubTree(node, sub)){
      return true
    }
  }
  return false
}

// recursively compare the root and the left/right nodes of the given tree with the sub.
function recursivelyCheckSubTree(tree, sub){
  // base case: reach the leaf node of the sub.
  if(sub === undefined) return true

  // other cases: if the given tree root and left/right nodes equal to corresponding ones of the sub. 
  if(tree.value === sub.value ){
    if(!recursivelyCheckSubTree(tree.left, sub.left)){
      return false;
    }
    if(!recursivelyCheckSubTree(tree.right, sub.right)){
      return false;
    }
    return true;
  } 
  return false;
}

const l0 = new Node(9), r0 = new Node(8)
const l1 = new Node(2), r1 = new Node(5)
const l2 = new Node(5), r2 = new Node(4)
const l3 = new Node(3), r3 = new Node(2)
const l4 = new Node(0), r4 = new Node(8)
const l5 = new Node(3), r5 = new Node(7)
const root = new Node(0)
l1.left = l0;
l1.right = r0;
l3.left = l1;
l3.right = r1;
r3.left = l4;
r3.right = r4;
l4.left = l5;
l4.right = r5;
l0.left = l2;
r0.right = r2;
root.left = l3;
root.right = r3;
// tree: preOrder = 0, 3, 2, 9, 5, 8, 4, 5, 2, 0, 3, 7, 8
//                      root(0)
//                    /         \
//                l3(3)           r3(2)
//               /  \            /   \
//            l1(2)  r1(5)     l4(0)  r4(8)
//           /  \             /    \
//        l0(9)  r0(8)      l5(3)   r5(7)
//        /         \
//      l2(5)       r2(4)

const preO = [...genTreeNode(root)] 
console.log(preO)

const s0 = new Node(0), s1 = new Node(8), s2 = new Node(7), s = new Node(2)
s.left = s0;
s.right = s1;
s0.right = s2;
console.log([...genTreeNode(s)])

console.log(isSubTree(root, s))