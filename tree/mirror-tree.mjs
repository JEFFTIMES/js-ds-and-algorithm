import Node from './nodes.mjs'

function mirrorTree(root, mirrored){
  if(!root){
    throw new TypeError('invalid tree node.')
  }
  if(!mirrored){
    mirrored = new Node(root.value)
  }
  mirrored.left = root.right ? new Node(root.right.value) : undefined;
  mirrored.right = root.left ? new Node(root.left.value) : undefined;

  if(root.left) mirrorTree(root.left, mirrored.right);
  if(root.right) mirrorTree(root.right, mirrored.left)
  return mirrored
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

for(let n of [...nodes[0].genMirror()]){
  console.log(n)
}

const mirrored = mirrorTree(nodes[0])

for( let m of [...mirrored]){
  console.log(m)
}

/* 
                a
              /   \
            b       c
          /  \     /  \
        d     e   f    g
*/