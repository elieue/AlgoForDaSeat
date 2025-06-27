class StudentHashTable {
  constructor(size = 101) { // ✅ Use a default prime number
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

  updateStatus(key, status) {
    const index = this._hash(key);
    const bucket = this.table[index];
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket[i][1].final_status = status;
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
  console.log("\n🔍 Hash Table Buckets:");
  this.table.forEach((bucket, index) => {
    if (bucket && bucket.length > 0) {
      console.log(`\n[Index ${index}]`);
      bucket.forEach(([key, value]) => {
        console.log(` → Key: ${key}, Name: ${value.full_name}, ID: ${value.application_id}`);
      });
    }
  });
}
}

module.exports = { StudentHashTable };
