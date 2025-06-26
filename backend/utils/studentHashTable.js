class StudentHashTable {
  constructor(size = 53) {
    this.table = new Array(size).fill(null).map(() => []);
  }

  _hash(studentId) {
    return parseInt(studentId) % this.table.length;
  }

  insert(student) {
    const index = this._hash(student.studentId);
    this.table[index].push(student);
    console.log(`Inserted ${student.fullName} (ID: ${student.studentId}) at index ${index}`);
  }

  search(studentId) {
    const index = this._hash(studentId);
    for (let student of this.table[index]) {
      if (student.studentId === studentId) return student;
    }
    return null;
  }

  display() {
    this.table.forEach((bucket, index) => {
      if (bucket.length > 0) {
        console.log(`Index ${index}:`);
        bucket.forEach((student) => {
          console.log(`  - ${student.fullName} (ID: ${student.studentId})`);
        });
      }
    });
  }
}

module.exports = { StudentHashTable };