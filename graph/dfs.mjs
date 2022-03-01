export default function dfs(graph, start, target) {
  
  const stack = [start];
  const parents = { [start]: start };
  const path = [];

  while(stack[0]){ 
    const vertex = stack.pop();
    for ( const candidate of graph[vertex] ) {
      if( Object.keys(parents).indexOf(candidate) === -1 ) {
        stack.push(candidate);
        parents[candidate] = vertex;
      }
    }
    // after all the adjacent vertices of current visiting vertex have been searched, add a path segment to the path array.
    // the path segment is represented as the parent of the currently visited vertex -> the current visited vertex.
    path.push(parents[vertex] + '->' + vertex)
    if(vertex === target) {
      path.shift();
      return { found: true, path: path }
    }
  };
  path.shift()
  return { found: false, path: path };
}