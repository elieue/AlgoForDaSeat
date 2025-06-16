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
      ('X1Y2Z3W4', 'John Erickson Tan', 'johnetan09@yahoo.com', 124589633421, 93.2, 91, 'Quezon City', 6.0, 275000, 'Upper', 'ITR', 'Male', 'Chinese-Filipino', 17, 'Claret School of Quezon City'),
      ('M5N6O7P8', 'Samantha Anne Lopez', 'samlopez98@gmail.com', 199875412356, 90.1, 85, 'Mandaluyong City', 7.5, 150000, 'Middle', 'ITR', 'Female', 'Tagalog', 18, 'Mandaluyong High School'),
      ('K4L5M6N7', 'Carlos Benedict Gomez', 'cbgomez17@yahoo.com', 177564823111, 85.3, 78, 'Caloocan City', 15.0, 87000, 'Low', 'Indigent', 'Male', 'Kapampangan', 19, 'Caloocan National Science and Technology High School'),
      ('Q9R8S7T6', 'Andrea Faith Mendoza', 'afmendoza12@gmail.com', 144785214326, 88.9, 82, 'Manila', 5.0, 134000, 'Middle', 'ITR', 'Female', 'Tagalog', 18, 'Manila Science High School'),
      ('B1C2D3E4', 'Harold Jun Villanueva', 'hjv2005@gmail.com', 133667421533, 87.2, 80, 'Las Piñas City', 12.0, 99000, 'Low', 'Indigent', 'Male', 'Bisaya', 20, 'Las Piñas East National High School'),
      ('U1V2W3X4', 'Katherine Uy', 'katherineuy99@gmail.com', 198745631220, 94.7, 93, 'San Juan City', 3.2, 315000, 'Upper', 'ITR', 'Female', 'Chinese-Filipino', 17, 'Xavier School (San Juan)'),
      ('Z5A6B7C8', 'Rafael Dominic Reyes', 'rafareyes123@gmail.com', 167895231125, 91.8, 89, 'Taguig City', 6.3, 202000, 'Middle', 'ITR', 'Male', 'Tagalog', 18, 'Taguig Science High School'),
      ('L3M4N5O6', 'Beatrice Julianne Cruz', 'beajcruz@gmail.com', 176542788911, 89.5, 86, 'Parañaque City', 10.0, 123000, 'Middle', 'ITR', 'Female', 'Tagalog', 19, 'Parañaque National High School'),
      ('H2I3J4K5', 'Jerome Villarin', 'jeromev_09@yahoo.com', 145976431188, 86.3, 79, 'Valenzuela City', 16.5, 97000, 'Low', 'Indigent', 'Male', 'Ilocano', 20, 'Valenzuela City School of Mathematics and Science'),
      ('F4G5H6I7', 'Catriona Mae David', 'catdavid2023@gmail.com', 134578921245, 93.0, 90, 'Quezon City', 4.0, 280000, 'Upper', 'ITR', 'Female', 'Tagalog', 18, 'Quezon City Science High School'),
      ('J7K8L9M0', 'Luis Martin Ramos', 'luismramos08@gmail.com', 167887411200, 90.6, 88, 'Marikina City', 8.2, 160000, 'Middle', 'ITR', 'Male', 'Tagalog', 17, 'Marikina Science High School'),
      ('Y8Z9A1B2', 'Marianne Joy Agustin', 'mjagustin21@yahoo.com', 159876432145, 84.8, 76, 'Navotas City', 14.8, 91000, 'Low', 'Indigent', 'Female', 'Tagalog', 19, 'Navotas National High School'),
      ('P2Q3R4S5', 'Kevin Daniel Chua', 'kevchua98@gmail.com', 120987453111, 95.1, 95, 'Manila', 2.0, 340000, 'Upper', 'ITR', 'Male', 'Chinese-Filipino', 18, 'Chiang Kai Shek College'),
      ('T1U2V3W4', 'Isabella Marie Salazar', 'isabellasalazar@gmail.com', 178654321900, 92.9, 90, 'Makati City', 4.5, 210000, 'Middle', 'ITR', 'Female', 'Tagalog', 18, 'Fort Bonifacio High School'),
      ('N6O7P8Q9', 'Joshua Emmanuel Navarro', 'joshnavs@gmail.com', 156732198877, 85.6, 83, 'Muntinlupa City', 13.5, 120000, 'Middle', 'ITR', 'Male', 'Tagalog', 19, 'Muntinlupa National High School'),
      ('G9H8I7J6', 'Faye Kristel Dizon', 'fayedizon@yahoo.com', 145786342111, 88.4, 82, 'Pasay City', 9.8, 98000, 'Low', 'Indigent', 'Female', 'Kapampangan', 20, 'Pasay City North High School'),
      ('A3B4C5D6', 'Lance Harvey Sy', 'lancesy03@gmail.com', 189574321678, 94.3, 94, 'Quezon City', 5.0, 330000, 'Upper', 'ITR', 'Male', 'Chinese-Filipino', 17, 'Reedley International School'),
      ('W7X8Y9Z0', 'Monica Therese Fabros', 'monicafabros@gmail.com', 147865432134, 91.4, 87, 'Manila', 3.1, 195000, 'Middle', 'ITR', 'Female', 'Tagalog', 18, 'Arellano University - Juan Sumulong Campus'),
      ('C1D2E3F4', 'Jose Miguel Abad', 'jmabad2006@gmail.com', 167754332147, 87.9, 80, 'Makati City', 6.5, 145000, 'Middle', 'ITR', 'Male', 'Tagalog', 19, 'Pitogo High School'),
      ('R3S4T5U6', 'Trisha Mae Manalo', 'trishamanalo@gmail.com', 178645321998, 85.5, 78, 'Taguig City', 12.2, 99000, 'Low', 'Indigent', 'Female', 'Tagalog', 20, 'Signal Village National High School'),
      ('V8W9X0Y1', 'Daniel Reyes Bartolome', 'danrbartolome@yahoo.com', 198654321167, 90.0, 85, 'Quezon City', 7.4, 170000, 'Middle', 'ITR', 'Male', 'Ilocano', 18, 'Commonwealth High School'),
      ('S6T7U8V9', 'Elaine Kristine Co', 'elainekco@gmail.com', 199877632145, 94.6, 92, 'San Juan City', 3.0, 360000, 'Upper', 'ITR', 'Female', 'Chinese-Filipino', 17, 'Immaculate Conception Academy'),
      ('D7E8F9G0', 'Nathaniel Cruz Santiago', 'nathsantiago01@gmail.com', 123456789001, 88.2, 81, 'Pasig City', 10.1, 110000, 'Middle', 'ITR', 'Male', 'Tagalog', 19, 'Rizal High School');
      ('1554FDAG', 'Miguel Lorenzo Dela Cruz', 'migslorenzo@gmail.com', 135687411216, 92.4, 88, 'Pasig City', 9.0, 180000, 'Middle', 'ITR', 'Male', 'Tagalog', 18, 'Pasig City Science High School'),
      ('8731EFAS', 'Angelica Mae Santos', 'angelica23santos@gmail.com', 153546541325, 89.7, 84, 'Malabon City', 14.0, 95000, 'Low', 'Indigent', 'Female', 'Tagalog', 19, 'Tinajeros National High School'),
      ('XK93ALZP', 'Joshua Emmanuel Reyes', 'joshreyes02@yahoo.com', 134687411258, 91.2, 86, 'Quezon City', 7.5, 240000, 'Middle', 'ITR', 'Male', 'Kapampangan', 18, 'Quezon City Science High School'),
      ('ZL88MBQN', 'Beatrice Anne Mendoza', 'bea.mendoza@gmail.com', 165489635112, 95.3, 91, 'Manila', 3.0, 750000, 'Upper', 'ITR', 'Female', 'Tagalog', 17, 'Manila Science High School'),
      ('QW12BXCV', 'Nathaniel James Robles', 'njrobles@outlook.com', 158734596321, 85.5, 79, 'Caloocan City', 16.0, 110000, 'Low', 'ITR', 'Male', 'Tagalog', 19, 'Caloocan City Business High School'),
      ('UY23PLKM', 'Clarisse Marie Alonzo', 'clarisse.alonzo@mail.com', 143211458932, 87.8, 82, 'Taguig City', 5.0, 305000, 'Middle', 'ITR', 'Female', 'Tagalog', 18, 'Taguig Science High School'),
      ('WE45MNZX', 'Ricardo Luis Tan', 'rl.tan98@gmail.com', 172346789541, 90.1, 85, 'Makati City', 4.3, 520000, 'Middle', 'ITR', 'Male', 'Chinese-Filipino', 18, 'Makati Science High School'),
      ('EK12ZOPA', 'Danica Rose Ferrer', 'danicarose@yahoo.com', 186345121234, 88.9, 80, 'Parañaque City', 8.6, 102000, 'Low', 'Indigent', 'Female', 'Tagalog', 19, 'Parañaque National High School'),
      ('RF90XTLA', 'Lorenzo Miguel Abad', 'l.abad23@gmail.com', 154678234598, 93.4, 89, 'San Juan City', 6.2, 610000, 'Upper', 'ITR', 'Male', 'Tagalog', 18, 'San Juan City Science High School'),
      ('YH33LPKD', 'Juliana Faith Gomez', 'julianafaith@gmail.com', 162345879632, 86.7, 78, 'Navotas City', 15.0, 89000, 'Low', 'Indigent', 'Female', 'Tagalog', 19, 'Navotas National High School'),
      ('MN54UJHY', 'Kyle Andre Dizon', 'kyle.dizon2006@mail.com', 145236985741, 84.3, 76, 'Valenzuela City', 13.2, 120000, 'Low', 'ITR', 'Male', 'Tagalog', 20, 'Valenzuela City School of Mathematics and Science'),
      ('PL87ZOKQ', 'Sophia Nicole Bañares', 'sophianbanares@gmail.com', 135879645211, 94.0, 90, 'Mandaluyong City', 3.8, 470000, 'Middle', 'ITR', 'Female', 'Tagalog', 17, 'Mandaluyong High School'),
      ('TG45QWVN', 'Eduardo V. Tolentino', 'edtolentino@yahoo.com', 189745231245, 89.5, 85, 'Las Piñas City', 10.1, 135000, 'Low', 'ITR', 'Male', 'Tagalog', 20, 'Las Piñas National High School'),
      ('ZX31LKJA', 'Camille Ysabel Cruz', 'cruzcamilleysabel@gmail.com', 154872368905, 91.7, 87, 'Quezon City', 6.9, 390000, 'Middle', 'ITR', 'Female', 'Tagalog', 18, 'Commonwealth High School'),
      ('HR87AXMT', 'John Michael Velasco', 'jmvelasco99@mail.com', 175423698745, 88.1, 83, 'Marikina City', 11.0, 100000, 'Low', 'Indigent', 'Male', 'Tagalog', 19, 'Marikina Science High School'),
      ('AS45TDRE', 'Ma. Kristina Lorenzo', 'kristinalorenzo@gmail.com', 132456789231, 85.9, 80, 'Pasay City', 7.5, 92000, 'Low', 'Indigent', 'Female', 'Tagalog', 18, 'Pasay City North High School'),
      ('BV62LPOK', 'Renzo Gabriel Chua', 'rgchua@gmail.com', 176543211245, 92.6, 88, 'Manila', 2.4, 750000, 'Upper', 'ITR', 'Male', 'Chinese-Filipino', 17, 'Philippine Science High School - Main'),
      ('KM31DSAZ', 'Isabelle Anne Ramos', 'isaramos03@gmail.com', 167845232198, 87.3, 81, 'Muntinlupa City', 12.0, 270000, 'Middle', 'ITR', 'Female', 'Tagalog', 19, 'Muntinlupa Science High School'),
      ('LD76QPWE', 'Christian Paul Ignacio', 'cpignacio@mail.com', 142387456987, 90.0, 86, 'Quezon City', 5.6, 365000, 'Middle', 'ITR', 'Male', 'Ilocano', 18, 'San Francisco High School'),
      ('NU43YZER', 'Elaine Victoria Uy', 'elaineuy96@gmail.com', 174123786543, 94.2, 92, 'Binondo, Manila', 3.1, 860000, 'Upper', 'ITR', 'Female', 'Chinese-Filipino', 17, 'Chiang Kai Shek College'), 
      ('CP21KJYU', 'Gino Rafael del Rosario', 'ginorafael@gmail.com', 138754122354, 83.6, 77, 'Caloocan City', 14.5, 98000, 'Low', 'Indigent', 'Male', 'Tagalog', 19, 'Camarin High School'),
      ('RW88POLK', 'Patricia Sofia Go', 'patsgo@gmail.com', 133987521964, 89.8, 84, 'San Juan City', 6.0, 320000, 'Middle', 'ITR', 'Female', 'Chinese-Filipino', 18, 'OB Montessori'),
      ('SL73MCOD', 'Arvin Noel Matias', 'arvinnoel@yahoo.com', 169845221349, 90.5, 87, 'Taguig City', 8.2, 480000, 'Middle', 'ITR', 'Male', 'Tagalog', 18, 'Taguig National High School'),
      ('UV64LRTY', 'Alyssa Jane Ignacio', 'alyssaignacio@mail.com', 174321987654, 85.2, 79, 'Parañaque City', 11.7, 150000, 'Low', 'ITR', 'Female', 'Tagalog', 19, 'Parañaque Science High School'),
      ('KO33JIEU', 'Justin Marco Enriquez', 'justinmarco98@gmail.com', 159843210785, 91.9, 90, 'Makati City', 4.8, 640000, 'Upper', 'ITR', 'Male', 'Tagalog', 17, 'Pitogo High School');
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
