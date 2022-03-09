import Node from './nodes.mjs'

function isSymmetric(root){
  const preLeft = [...root];
  const preRight = [...root.genMirror()];
  for(let i = 0; i < preLeft.length; i++){
    if(preLeft[i] !== preRight[i]) return false;
  }
  return true;
}
const tree = []
for(let e of 'aaaaaaaaa'){ // 'abcdedcba'
  tree.push(new Node(e))
}

tree[4].left = tree[3], tree[4].right = tree[5];
tree[3].left = tree[1], tree[3].right = tree[2];
tree[5].left = tree[6], tree[5].right = tree[7];
tree[1].left = tree[0], tree[7].left = tree[8];

const root = tree[4]
console.log(isSymmetric(root))

//              e                              a
//            /    \                        /     \
//           d      d                     a         a
//          / \    / \                  /   \     /   \ 
//         b   c  c   b               a       a a       a
//        /            \            /                 /   
//       a               a        a                  a

