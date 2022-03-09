import Node from './nodes.mjs'

// given a tree root and the weight, find out the traces on which all the values of the nodes sum up to the given weight.
// a trace is the route started from root and end with a leaf node.
function findTracesWeightEqualTo(root, weight, traces, trace){
  // validate inputs
  if(!root instanceof Node){
    throw new TypeError('given root must be instance of Node.')
  }
  if(weight <=0){
    throw new RangeError('weight must be larger than 0.')
  }

  const ts = traces ? traces : new Array();
  const t = trace ? trace: new Array();
  const leftWeight = weight - root.value;
  
  
  t.push(root.value); // add node to trace
  
  if(root.left){ // go down to the left sub tree.
    findTracesWeightEqualTo(root.left, leftWeight, ts, t)
  }
  if(root.right){ // go down to the right sub tree.
    findTracesWeightEqualTo(root.right, leftWeight, ts, t)
  }
  // reach a leaf node and the trace match the weight request, push it to traces.
  if(leftWeight === 0 && !root.left && !root.right){
    ts.push([...t]); // here must push a copy of the t to avoid the t being changed.
  }
  // pop() the node from the trace stack before leave the node.
  t.pop();
  return ts;
}

function preOrderTraverse(root, path=[]){
  if(!root instanceof Node){
    throw new TypeError('invalid root type.')
  }
  path.push(root.value);
  if(root.left){
    preOrderTraverse(root.left, path);
  }
  if(root.right){
    preOrderTraverse(root.right, path);
  }
  return path;
}


const tree = []
for(let v of [10,5,12,4,7]){
  console.log(v)
  tree.push(new Node(v))
}
tree[0].left = tree[1];
tree[0].right = tree[2];
tree[1].left = tree[3];
tree[1].right = tree[4];

console.log([...tree[0]])
const path = preOrderTraverse(tree[0]);
console.log(path)
const ts = findTracesWeightEqualTo(tree[0], 22)
console.log(ts)