module.exports = {
  sortByScore: function(students) {
    const maxScore = Math.max(...students.map(s => Math.floor(s.total)));

    const buckets = Array.from({ length: maxScore + 1 }, () => []);

    for (const student of students) {
      const score = Math.floor(student.total);
      buckets[score].push(student);
    }

    const sorted = [];
    for (let score = maxScore; score >= 0; score--) {
      sorted.push(...buckets[score]);
    }

    return sorted;
  }
};
