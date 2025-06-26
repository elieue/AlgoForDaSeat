const bfs = require('./bfs');

class Graph {
  constructor(vertices) {
    this.V = vertices;
    this.adj = Array.from({ length: vertices }, () => Array(vertices).fill(0));
  }

  fordFulkerson(source, sink) {
    const parent = Array(this.V).fill(-1);
    let maxFlow = 0;

    while (bfs(this.adj, this.V, source, sink, parent)) {
      let pathFlow = Infinity;
      for (let v = sink; v !== source; v = parent[v]) {
        const u = parent[v];
        pathFlow = Math.min(pathFlow, this.adj[u][v]);
      }

      for (let v = sink; v !== source; v = parent[v]) {
        const u = parent[v];
        this.adj[u][v] -= pathFlow;
        this.adj[v][u] += pathFlow;
      }

      maxFlow += pathFlow;
    }

    return maxFlow;
  }
}

function runFordFulkerson(rawStudents, seatLimit = 10, waitlistLimit = 5) {
  let students = rawStudents.map((s, i) => ({
    ...s,
    id: i,
    totalScore: s.total ?? s.totalScore
  }));

  students.sort((a, b) => b.totalScore - a.totalScore);

  const topStudents = students.slice(0, seatLimit + waitlistLimit);
  const N = topStudents.length;

  if (N > 1) {
    topStudents.forEach((s, i) => {
        s.percentile = Math.round(100 * (N - i - 1) / (N - 1));
    });
  } else {
    topStudents.forEach(s => s.percentile = 100);
  }

  const totalVertices = 2 + N + 2;
  const S = 0;
  const T = totalVertices - 1;
  const admitPool = totalVertices - 3;
  const waitlistPool = totalVertices - 2;

  const g = new Graph(totalVertices);

  topStudents.forEach((_, i) => g.adj[S][i + 1] = 1);
  topStudents.forEach((_, i) => {
    const sid = i + 1;
    g.adj[sid][admitPool] = 1;
    g.adj[sid][waitlistPool] = 1;
  });

  g.adj[admitPool][T] = seatLimit;
  g.adj[waitlistPool][T] = waitlistLimit;

  const maxFlow = g.fordFulkerson(S, T);

  const admitted = topStudents.slice(0, seatLimit);
  const waitlisted = topStudents.slice(seatLimit, seatLimit + waitlistLimit);

  return { admitted, waitlisted, maxFlow };
}

module.exports = runFordFulkerson;
