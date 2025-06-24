const { Pool } = require('pg');

class Graph {
  constructor(vertices) {
    this.V = vertices;
    this.adj = Array.from({ length: vertices }, () => Array(vertices).fill(0));
  }

  bfs(s, t, parent) {
    const visited = Array(this.V).fill(false);
    const queue = [s];
    visited[s] = true;
    parent[s] = -1;

    while (queue.length) {
      const u = queue.shift();
      for (let v = 0; v < this.V; v++) {
        if (!visited[v] && this.adj[u][v] > 0) {
          queue.push(v);
          parent[v] = u;
          visited[v] = true;
        }
      }
    }

    return visited[t];
  }

  fordFulkerson(source, sink) {
    const parent = Array(this.V).fill(-1);
    let maxFlow = 0;

    while (this.bfs(source, sink, parent)) {
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

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'algofordaseat',
  password: 'DL-160_diplomat',
  port: 5432,
});

const NEAR_MANILA_CITIES = [
  'Pasay City', 'Makati City', 'San Juan City', 'Mandaluyong City',
  'Caloocan City', 'Navotas City', 'Manila'
];

function computeScore({ gpa, exam, income, isIndigent, isNear }) {
  const gpaPts = (gpa / 100) * 30;
  const examPts = (exam / 100) * 40;
  const incomePts = income >= 300000 ? 0 : ((300000 - income) / 300000) * 20;
  const indigentPts = isIndigent ? 10 : 0;
  const proximityPts = isNear ? 10 : 0;
  const total = gpaPts + examPts + incomePts + indigentPts + proximityPts;
  return +total.toFixed(2);
}

(async () => {
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT application_id, full_name, gpa, entrance_exam_score, parents_income, itr_or_indigent, address
      FROM student_applications
    `);

    let students = res.rows.map((s, i) => {
      const gpa = parseFloat(s.gpa);
      const exam = parseFloat(s.entrance_exam_score);
      const income = parseFloat(s.parents_income);
      const isIndigent = s.itr_or_indigent?.toLowerCase().includes('indigent');
      const isNear = NEAR_MANILA_CITIES.some(city => s.address.includes(city));
      const totalScore = computeScore({ gpa, exam, income, isIndigent, isNear });

      return {
        id: i,
        full_name: s.full_name,
        totalScore
      };
    });

    // Step 1: Sort by score descending
    students.sort((a, b) => b.totalScore - a.totalScore);

    // Step 2: Keep only top 15 for admission + waitlist
    const topStudents = students.slice(0, 15);

    // Step 3: Assign percentiles for display
    const N = topStudents.length;
    topStudents.forEach((s, i) => {
      s.percentile = Math.round(100 * (N - i - 1) / (N - 1));
    });

    // Graph setup
    const n = topStudents.length;
    const totalVertices = 2 + n + 3; // Source + Sink + students + admitPool + waitlistPool
    const S = 0;
    const T = totalVertices - 1;
    const admitPool = totalVertices - 3;
    const waitlistPool = totalVertices - 2;

    const g = new Graph(totalVertices);

    // S -> Students
    topStudents.forEach((_, i) => g.adj[S][i + 1] = 1);

    // Students -> Admit pool or waitlist pool
    topStudents.forEach((_, i) => {
      const sid = i + 1;
      g.adj[sid][admitPool] = 1;
      g.adj[sid][waitlistPool] = 1;
    });

    // Admit pool -> Sink (limit 10 admits)
    g.adj[admitPool][T] = 10;

    // Waitlist pool -> Sink (limit 5 waitlists)
    g.adj[waitlistPool][T] = 5;

    const maxFlow = g.fordFulkerson(S, T);

    // Select top 10 admitted and next 5 waitlisted
    const admitted = topStudents.slice(0, 10);
    const waitlisted = topStudents.slice(10, 15);

    // Output
    console.log(`\n🎯 Max flow (admitted + waitlist): ${maxFlow}`);
    console.log(`🧑‍🎓 Admission offers: ${admitted.length}`);
    console.log(`📝 Waitlisted: ${waitlisted.length}`);

    console.log('\n🎓 ADMITTED OFFERS:');
    admitted.forEach((s, i) =>
      console.log(`${i + 1}. ${s.full_name} — Score: ${s.totalScore} — 🎯 Percentile: ${s.percentile}%`)
    );

    console.log('\n📝 WAITLISTED:');
    waitlisted.forEach((s, i) =>
      console.log(`${i + 1}. ${s.full_name} — Score: ${s.totalScore} — 🎯 Percentile: ${s.percentile}%`)
    );
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    client.release();
    await pool.end();
  }
})();
