const readline = require("readline");
const { StudentHashTable } = require("../utils/studentHashTable");
const { runHashSeeder } = require("./hashSeeder"); // 🔁 Run seeder first (optional)

// Create hash table
const hashTable = new StudentHashTable();

// Run Seeder and Load Data into Hash Table First
(async () => {
  try {
    console.log("⏳ Running Hash Seeder...");
    await runHashSeeder(hashTable); // 🪄 Pass the same hash table instance
    console.log("✅ Seeder Done!");
    menu(); // Start UI after seeding
  } catch (err) {
    console.error("❌ Seeder Error:", err.message);
    menu(); // Continue even if seeding fails
  }
})();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log('\n--- Student Hash Table Simulation ---');
  console.log('1. Insert student');
  console.log('2. Search student');
  console.log('3. Display hash table');
  console.log('4. Exit');
  rl.question('Choose an option: ', handleMenu);
}

function handleMenu(option) {
  switch (option.trim()) {
    case '1':
      rl.question('Enter student full name: ', (fullName) => {
        rl.question('Enter student ID: ', (studentId) => {
          hashTable.insert(studentId, { full_name: fullName, application_id: studentId });
          console.log(`✅ Inserted: ${fullName} (ID: ${studentId})`);
          menu();
        });
      });
      break;
    case '2':
      rl.question('Enter student ID to search: ', (studentId) => {
        const student = hashTable.get(studentId);
        if (student) {
          console.log(`🎯 Found: ${student.full_name} (ID: ${student.application_id})`);
        } else {
          console.log('❌ Student not found.');
        }
        menu();
      });
      break;
    case '3':
      hashTable.display();
      menu();
      break;
    case '4':
      rl.close();
      break;
    default:
      console.log('❗ Invalid option.');
      menu();
  }
}
