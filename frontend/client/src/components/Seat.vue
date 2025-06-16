<template>
  <div>
    <h2>Seat Allocation Results</h2>
    <table>
      <tr>
        <th>Student ID</th>
        <th>Exam Score</th>
        <th>GPA</th>
        <th>Proximity</th>
        <th>Economic Status</th>
        <th>Decision</th>
      </tr>
      <tr v-for="student in students" :key="student.applicant_id">
        <td>{{ student.applicant_id }}</td>
        <td>{{ student.exam_score }}</td>
        <td>{{ student.gpa }}</td>
        <td>{{ student.proximity }}</td>
        <td>{{ student.economic_status }}</td>
        <td>{{ student.decision }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const students = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:5173/allocate-seats');
        students.value = response.data;
      } catch (error) {
        console.error('Error fetching seat allocation:', error);
      }
    });

    return { students };
  },
};
</script>
