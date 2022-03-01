// import { default as BreadthFirstSearch } from './bfs.mjs'
import BreadthFirstSearch from './bfs.mjs' 

import dfs from './dfs.mjs'

const graph = {
  A: ['B', 'C'],
  B: ['A', 'C', 'D'],
  C: ['A', 'B', 'D', 'E'],
  D: ['B', 'C', 'E', 'F'],
  E: ['C', 'D', 'F'],
  F: ['D', 'E']
}

const r = BreadthFirstSearch( graph, 'A', 'F')
console.log(`bfs route: ${JSON.stringify(r)}`)

const r2 = dfs( graph, 'A', 'G')
console.log(`dfs route: ${JSON.stringify(r2)}`)

function* genBranches(path){
  
  for(const step of path) {
    const branch = step.split('->')
    yield branch
  }
}

// const branches = genBranch(r2.path)
// for(const b of branches){
//   console.log(b)
// }

function constructTree(path){
  const tree = {};
  const branches = genBranches(path)
  for(const branch of branches){
    if(Object.keys(tree).indexOf(branch[0]) === -1){ // node does not exist in the tree
      tree[branch[0]] = [branch[1]];
    } else {
      tree[branch[0]].push(branch[1]);
    }  
  }
  return tree;
}

const tree = constructTree(r.path)
console.log('tree: ' + JSON.stringify(tree))