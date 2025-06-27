const { Pool } = require('pg');
const { faker } = require('@faker-js/faker');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'algofordaseat',
  password: 'Fantastic_Best0113',
  port: 5432,
});

const NEAR_MANILA_CITIES = [
  'Pasay City', 'Makati City', 'San Juan City', 'Mandaluyong City',
  'Caloocan City', 'Navotas City', 'Manila',
];

const schools = [
  'Manila Science High School', 'Quezon City Science High School', 'Pasig City Science High School',
  'Taguig Science High School', 'Makati Science High School', 'Marikina Science High School',
  'San Juan City National Science High School', 'Las Piñas City National Senior High School',
  'Navotas National High School', 'Caloocan National Science and Technology High School',
  'Mandaluyong High School', 'Malabon National High School',
  'Valenzuela City School of Mathematics and Science', 'Parañaque National High School',
  'Jose Abad Santos High School', 'Ramon Magsaysay High School', 'Manuel A. Roxas High School',
  'Victorino Mapa High School', 'Timoteo Paez Integrated High School', 'Lagro High School'
];

const ADMIT_SLOTS = 10;
const WAITLIST_SLOTS = 5;

function computeScore({ gpa, exam, income, isIndigent, isNear }) {
  const gpaPts = (gpa / 100) * 30;
  const examPts = (exam / 100) * 40;
  const incomePts = income >= 300000 ? 0 : ((300000 - income) / 300000) * 20;
  const indigentPts = isIndigent ? 10 : 0;
  const proximityPts = isNear ? 10 : 0;
  const total = gpaPts + examPts + incomePts + indigentPts + proximityPts;
  return {
    gpaPts: +gpaPts.toFixed(2),
    examPts: +examPts.toFixed(2),
    incomePts: +incomePts.toFixed(2),
    indigentPts,
    proximityPts,
    total: +total.toFixed(2),
  };
}

function buildFlowNetwork(students, capacities) {
  const nodeIndex = {};
  let idx = 0;
  const source = idx++;
  students.forEach(s => nodeIndex[s.id] = idx++);
  schools.forEach(s => nodeIndex[s] = idx++);
  const sink = idx++;
  const edges = [];

  function addEdge(from, to, capacity) {
    edges.push({ from, to, capacity, flow: 0 });
  }

  students.forEach(s => {
    addEdge(source, nodeIndex[s.id], 1);
    s.preferences.forEach(pref => {
      addEdge(nodeIndex[s.id], nodeIndex[pref], 1);
    });
  });

  schools.forEach(s => addEdge(nodeIndex[s], sink, capacities[s]));

  const graph = Array.from({ length: idx }, () => []);
  edges.forEach(({ from, to, capacity }) => {
    const forward = { to, capacity, flow: 0 };
    const backward = { to: from, capacity: 0, flow: 0 };
    forward.rev = backward;
    backward.rev = forward;
    graph[from].push(forward);
    graph[to].push(backward);
  });

  return { graph, source, sink, nodeIndex };
}

function bfs(graph, source, sink, parent) {
  const visited = new Array(graph.length).fill(false);
  const queue = [source];
  visited[source] = true;
  while (queue.length > 0) {
    const u = queue.shift();
    for (const edge of graph[u]) {
      if (!visited[edge.to] && edge.capacity - edge.flow > 0) {
        parent[edge.to] = { u, edge };
        if (edge.to === sink) return true;
        visited[edge.to] = true;
        queue.push(edge.to);
      }
    }
  }
  return false;
}

function fordFulkerson(graph, source, sink) {
  let flow = 0;
  const parent = new Array(graph.length);
  while (bfs(graph, source, sink, parent)) {
    let pathFlow = Infinity;
    for (let v = sink; v !== source; v = parent[v].u) {
      const edge = parent[v].edge;
      pathFlow = Math.min(pathFlow, edge.capacity - edge.flow);
    }
    for (let v = sink; v !== source; v = parent[v].u) {
      parent[v].edge.flow += pathFlow;
      parent[v].edge.rev.flow -= pathFlow;
    }
    flow += pathFlow;
  }
  return flow;
}

function allocateSlotsFordFulkerson(students, schoolCapacities) {
  // students: [{id, full_name, preferences: [school1, school2, ...], score: {total, ...}}]
  // schoolCapacities: { [schoolName]: number }
  const { graph, source, sink, nodeIndex } = buildFlowNetwork(students, schoolCapacities);
  fordFulkerson(graph, source, sink);

  const allocations = [];
  for (const s of students) {
    const edges = graph[nodeIndex[s.id]];
    const matched = edges.find(e => e.flow === 1);
    if (matched) {
      const school = Object.keys(nodeIndex).find(key => nodeIndex[key] === matched.to);
      allocations.push({ ...s, assigned: school });
    }
  }
  return allocations;
}

module.exports = {
  computeScore,
  allocateSlotsFordFulkerson,
  schools,
  NEAR_MANILA_CITIES
};