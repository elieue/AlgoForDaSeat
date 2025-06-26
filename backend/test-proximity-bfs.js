
const {
  getCityDistanceBFS,
  parseCityFromAddress,
   ProximityPts,
} = require('./proximity-bfs.js');

const students = [
  { name: 'Miguel Lorenzo Dela Cruz', address: 'Pasig City' },
  { name: 'Angelica Mae Santos', address: 'Malabon City' },
  { name: 'Andrea Faith Mendoza', address: 'Manila' },
  { name: 'John Erickson Tan', address: 'Quezon City' },
  { name: 'Maria Clara Del Valle', address: 'Muntinlupa' },
  { name: 'Kevin Patrick Reyes', address: 'Cavite' }, 
];

const REFERENCE_CITY = 'Manila';

const results = students.map((s) => {
  const city = parseCityFromAddress(s.address);
  const hops = getCityDistanceBFS(REFERENCE_CITY, city);

  const grade = ProximityPts(hops); 

  return {
    name: s.name,
    city: city || 'Unknown',
    hops: hops === Infinity ? 'Unreachable' : `${hops} hops`,
    proximityGrade: grade,
  };
});

results.sort((a, b) => {
  if (a.hops === 'Unreachable') return 1;
  if (b.hops === 'Unreachable') return -1;
  return parseInt(a.hops) - parseInt(b.hops);
});

console.log('📍 Students sorted by proximity to PUP Sta. Mesa (Manila):');
results.forEach((s, i) => {

  console.log(
    `${i + 1}. ${s.name} — City: ${s.city} — ${s.hops} (Proximity Grade: ${
      s.proximityGrade
    })`
  );
});