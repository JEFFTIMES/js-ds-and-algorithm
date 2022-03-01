
function BreadthFirstSearch(graph, start, target){
  const queue = [start];
  const visited = [start];
  const path = [];

  while (queue[0]) {
    const vertex = queue.shift();
    for (const candidate of graph[vertex]) {   // graph[vertex] is an array of vertices
      if(visited.indexOf(candidate) === -1) {  // candidate is not visited yet
        queue.push(candidate);
        visited.push(candidate);
        path.push(vertex + '->' + candidate);
        if(candidate === target) { 
          return { found: true, path: path }
        }  
      }
    }
  }
  return { found: false, path: path }
}

export default BreadthFirstSearch