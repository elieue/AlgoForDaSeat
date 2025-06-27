class StudentHashTable {
  constructor(size = 101) {
    this.table = new Array(size);
  }

  _hash(key) {
    let hash = 0;
    for (let char of key) {
      hash += char.charCodeAt(0);
    }
    return hash % this.table.length;
  }

  insert(key, value) {
    const index = this._hash(key);
    if (!this.table[index]) this.table[index] = [];
    this.table[index].push([key, value]);
  }

  get(key) {
    const index = this._hash(key);
    const bucket = this.table[index];
    if (bucket) {
      for (let [k, v] of bucket) {
        if (k === key) return v;
      }
    }
    return null;
  }

  getAll() {
    return this.values(); 
  }

  updateStatus(key, status) {
    const index = this._hash(key);
    const bucket = this.table[index];
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket[i][1].status = status;
          return;
        }
      }
    }
  }

  values() {
    const all = [];
    for (let bucket of this.table) {
      if (bucket) {
        for (let [_, value] of bucket) {
          all.push(value);
        }
      }
    }
    return all;
  }

  display() {
    console.log("\nHash Table Buckets:");
    this.table.forEach((bucket, index) => {
      if (bucket && bucket.length > 0) {
        console.log(`\n[Index ${index}]`);
        bucket.forEach(([key, value]) => {
          console.log(` → Key: ${key}, Name: ${value.full_name}, ID: ${value.application_id}`);
        });
      }
    });
  }

  displayStatuses() {
    console.log("\n📊 Current Hash Table Statuses:");
    const allStudents = this.values();
    const statusCounts = {};
    allStudents.forEach(student => {
      const status = student.status || 'unknown';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
      console.log(`  - ${student.full_name} (${student.application_id}): ${status}`);
    });
    console.log("\n📈 Status Summary:", statusCounts);
  }
}

module.exports = { StudentHashTable };
