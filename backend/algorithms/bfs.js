function bfs(adjMatrix, V, source, sink, parent) {
  const visited = Array(V).fill(false);
  const queue = [source];
  visited[source] = true;
  parent[source] = -1;

  while (queue.length) {
    const u = queue.shift();
    for (let v = 0; v < V; v++) {
      if (!visited[v] && adjMatrix[u][v] > 0) {
        queue.push(v);
        parent[v] = u;
        visited[v] = true;
      }
    }
  }

  return visited[sink];
}

module.exports = bfs;
