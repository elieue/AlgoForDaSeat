const pool = require('./db');

async function seed() {
  try {
    const res = await pool.query('SELECT COUNT(*) FROM student_applications');
    const count = parseInt(res.rows[0].count, 10);

    if (count === 0) {
    await pool.query(`
      INSERT INTO student_applications (
  user_id, full_name, email, student_id, gpa, entrance_exam_score, address, proximity_to_school_km,
  parents_income, economic_status, itr_or_indigent, gender, ethnicity,
  age, last_school_attended
  ) VALUES
      ('A1B2C3D4', 'Miguel Lorenzo Dela Cruz', 'migslorenzo@gmail.com', 135687411216, 92.4, 88, 'Pasig City', 9.0, 180000, 'Middle', 'ITR', 'Male', 'Tagalog', 18, 'Pasig City Science High School'),
      ('E9F8G7H6', 'Angelica Mae Santos', 'angelica23santos@gmail.com', 153546541325, 89.7, 84, 'Malabon City', 14.0, 95000, 'Low', 'Indigent', 'Female', 'Tagalog', 19, 'Tinajeros National High School'),
      ('X1Y2Z3W4', 'John Erickson Tan', 'johnetan09@yahoo.com', 124589633421, 93.2, 91, 'Quezon City', 6.0, 275000, 'High', 'ITR', 'Male', 'Chinese-Filipino', 17, 'Claret School of Quezon City'),
      ('M5N6O7P8', 'Samantha Anne Lopez', 'samlopez98@gmail.com', 199875412356, 90.1, 85, 'Mandaluyong City', 7.5, 150000, 'Middle', 'ITR', 'Female', 'Tagalog', 18, 'Mandaluyong High School'),
      ('K4L5M6N7', 'Carlos Benedict Gomez', 'cbgomez17@yahoo.com', 177564823111, 85.3, 78, 'Caloocan City', 15.0, 87000, 'Low', 'Indigent', 'Male', 'Kapampangan', 19, 'Caloocan National Science and Technology High School'),
      ('Q9R8S7T6', 'Andrea Faith Mendoza', 'afmendoza12@gmail.com', 144785214326, 88.9, 82, 'Manila', 5.0, 134000, 'Middle', 'ITR', 'Female', 'Tagalog', 18, 'Manila Science High School'),
      ('B1C2D3E4', 'Harold Jun Villanueva', 'hjv2005@gmail.com', 133667421533, 87.2, 80, 'Las Piñas City', 12.0, 99000, 'Low', 'Indigent', 'Male', 'Bisaya', 20, 'Las Piñas East National High School'),
      ('U1V2W3X4', 'Katherine Uy', 'katherineuy99@gmail.com', 198745631220, 94.7, 93, 'San Juan City', 3.2, 315000, 'High', 'ITR', 'Female', 'Chinese-Filipino', 17, 'Xavier School (San Juan)'),
      ('Z5A6B7C8', 'Rafael Dominic Reyes', 'rafareyes123@gmail.com', 167895231125, 91.8, 89, 'Taguig City', 6.3, 202000, 'Middle', 'ITR', 'Male', 'Tagalog', 18, 'Taguig Science High School'),
      ('L3M4N5O6', 'Beatrice Julianne Cruz', 'beajcruz@gmail.com', 176542788911, 89.5, 86, 'Parañaque City', 10.0, 123000, 'Middle', 'ITR', 'Female', 'Tagalog', 19, 'Parañaque National High School'),
      ('H2I3J4K5', 'Jerome Villarin', 'jeromev_09@yahoo.com', 145976431188, 86.3, 79, 'Valenzuela City', 16.5, 97000, 'Low', 'Indigent', 'Male', 'Ilocano', 20, 'Valenzuela City School of Mathematics and Science'),
      ('F4G5H6I7', 'Catriona Mae David', 'catdavid2023@gmail.com', 134578921245, 93.0, 90, 'Quezon City', 4.0, 280000, 'High', 'ITR', 'Female', 'Tagalog', 18, 'Quezon City Science High School'),
      ('J7K8L9M0', 'Luis Martin Ramos', 'luismramos08@gmail.com', 167887411200, 90.6, 88, 'Marikina City', 8.2, 160000, 'Middle', 'ITR', 'Male', 'Tagalog', 17, 'Marikina Science High School'),
      ('Y8Z9A1B2', 'Marianne Joy Agustin', 'mjagustin21@yahoo.com', 159876432145, 84.8, 76, 'Navotas City', 14.8, 91000, 'Low', 'Indigent', 'Female', 'Tagalog', 19, 'Navotas National High School'),
      ('P2Q3R4S5', 'Kevin Daniel Chua', 'kevchua98@gmail.com', 120987453111, 95.1, 95, 'Manila', 2.0, 340000, 'High', 'ITR', 'Male', 'Chinese-Filipino', 18, 'Chiang Kai Shek College'),
      ('T1U2V3W4', 'Isabella Marie Salazar', 'isabellasalazar@gmail.com', 178654321900, 92.9, 90, 'Makati City', 4.5, 210000, 'Middle', 'ITR', 'Female', 'Tagalog', 18, 'Fort Bonifacio High School'),
      ('N6O7P8Q9', 'Joshua Emmanuel Navarro', 'joshnavs@gmail.com', 156732198877, 85.6, 83, 'Muntinlupa City', 13.5, 120000, 'Middle', 'ITR', 'Male', 'Tagalog', 19, 'Muntinlupa National High School'),
      ('G9H8I7J6', 'Faye Kristel Dizon', 'fayedizon@yahoo.com', 145786342111, 88.4, 82, 'Pasay City', 9.8, 98000, 'Low', 'Indigent', 'Female', 'Kapampangan', 20, 'Pasay City North High School'),
      ('A3B4C5D6', 'Lance Harvey Sy', 'lancesy03@gmail.com', 189574321678, 94.3, 94, 'Quezon City', 5.0, 330000, 'High', 'ITR', 'Male', 'Chinese-Filipino', 17, 'Reedley International School'),
      ('W7X8Y9Z0', 'Monica Therese Fabros', 'monicafabros@gmail.com', 147865432134, 91.4, 87, 'Manila', 3.1, 195000, 'Middle', 'ITR', 'Female', 'Tagalog', 18, 'Arellano University - Juan Sumulong Campus'),
      ('C1D2E3F4', 'Jose Miguel Abad', 'jmabad2006@gmail.com', 167754332147, 87.9, 80, 'Makati City', 6.5, 145000, 'Middle', 'ITR', 'Male', 'Tagalog', 19, 'Pitogo High School'),
      ('R3S4T5U6', 'Trisha Mae Manalo', 'trishamanalo@gmail.com', 178645321998, 85.5, 78, 'Taguig City', 12.2, 99000, 'Low', 'Indigent', 'Female', 'Tagalog', 20, 'Signal Village National High School'),
      ('V8W9X0Y1', 'Daniel Reyes Bartolome', 'danrbartolome@yahoo.com', 198654321167, 90.0, 85, 'Quezon City', 7.4, 170000, 'Middle', 'ITR', 'Male', 'Ilocano', 18, 'Commonwealth High School'),
      ('S6T7U8V9', 'Elaine Kristine Co', 'elainekco@gmail.com', 199877632145, 94.6, 92, 'San Juan City', 3.0, 360000, 'High', 'ITR', 'Female', 'Chinese-Filipino', 17, 'Immaculate Conception Academy'),
      ('D7E8F9G0', 'Nathaniel Cruz Santiago', 'nathsantiago01@gmail.com', 123456789001, 88.2, 81, 'Pasig City', 10.1, 110000, 'Middle', 'ITR', 'Male', 'Tagalog', 19, 'Rizal High School');
    `);
      console.log('✅ Seed data inserted!');
    } else {
      console.log('ℹ️ Seed skipped: data already exists.');
    }
  } catch (err) {
    console.error('❌ Error inserting seed data:', err);
  } finally {
    pool.end();
  }
}

seed();