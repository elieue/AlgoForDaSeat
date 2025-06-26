<template>
  <div class="team-bg">
    <div class="team-container">
      <h2 class="team-title">Meet the Team</h2>
      <div class="team-grid">
        <!-- First row: 5 members -->
        <div class="team-member" v-for="member in firstRow" :key="member.name">
          <div class="team-photo-wrapper">
            <img v-if="member.img" :src="member.img" :alt="member.name" class="team-photo" />
            <div v-else class="team-photo team-photo-placeholder">150×150</div>
          </div>
          <div class="team-name">{{ member.name }}</div>
          <div class="team-role">{{ member.role }}</div>
        </div>
      </div>
      <div class="team-grid team-grid-bottom">
        <!-- Second row: 4 members -->
        <div class="team-member" v-for="member in secondRow" :key="member.name">
          <div class="team-photo-wrapper">
            <img v-if="member.img" :src="member.img" :alt="member.name" class="team-photo" />
            <div v-else class="team-photo team-photo-placeholder">150×150</div>
          </div>
          <div class="team-name">{{ member.name }}</div>
          <div class="team-role">{{ member.role }}</div>
        </div>
      </div>
      <footer class="team-footer">© 2025 AlgoForDaSeat. All rights reserved.</footer>
    </div>
  </div>
</template>

<script setup>
// Static imports for images in src/assets
import cabadduelija from '../assets/cabadduelija.png'
import delgadohannahlette from '../assets/delgadohannahlette.png'
import gentedaisyrie from '../assets/gentedaisyrie.png'
import gerodaneoervine from '../assets/gerodaneoervine.png'
import jocsondanlouie from '../assets/jocsondanlouie.png'
import lambohonashley from '../assets/lambohonashley.png'
import lapatanjesus from '../assets/lapatanjesus.png'
import sanchezmariella from '../assets/sanchezmariella.png'

const firstRow = [
  { name: 'Bondad, Felicity Joy', role: 'Backend', img: '' }, // placeholder
  { name: 'Cabaddu, Elija', role: 'Backend', img: cabadduelija },
  { name: 'Delgado, Hannahlette', role: 'Frontend', img: delgadohannahlette },
  { name: 'Gente, Daisyrie', role: 'UI/UX', img: gentedaisyrie },
  { name: 'Geroda, Neo Ervine', role: 'Backend', img: gerodaneoervine },
]
const secondRow = [
  { name: 'Jocson, Dan Louie', role: 'Frontend', img: jocsondanlouie },
  { name: 'Lambohon, Ashley', role: 'UI/UX', img: lambohonashley },
  { name: 'Lapatan, Jesus', role: 'Backend', img: lapatanjesus },
  { name: 'Sanchez, Mariella', role: 'Frontend', img: sanchezmariella },
]
</script>

<style scoped>
.team-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #fff7ef 0%, #ffe5c2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.team-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 16px 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.team-title {
  font-family: 'Poppins', Arial, sans-serif;
  font-size: 2.3rem;
  font-weight: 700;
  color: #23272f;
  margin-bottom: 40px;
  text-align: center;
}
.team-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 36px 32px;
  justify-items: center;
  margin-bottom: 0;
  width: 100%;
  max-width: 900px;
}
.team-grid-bottom {
  grid-template-columns: repeat(4, 1fr);
  margin-top: 38px;
  margin-bottom: 48px;
}
.team-member {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
}
.team-photo-wrapper {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2.5px solid #f4a825;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  margin-bottom: 16px;
  padding: 0;
}
.team-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
}
.team-photo-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
  font-size: 1.1rem;
  font-family: 'Inter', Arial, sans-serif;
  background: #f7f7f7;
  width: 100%;
  height: 100%;
}
.team-name {
  font-family: 'Poppins', Arial, sans-serif;
  font-weight: 600;
  font-size: 1.08rem;
  color: #23272f;
  margin-bottom: 2px;
  text-align: center;
}
.team-role {
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: #7d848d;
  text-align: center;
}
.team-footer {
  width: 100%;
  text-align: center;
  color: #bdbdbd;
  font-size: 15px;
  font-family: 'Inter', Arial, sans-serif;
  margin-top: 32px;
  margin-bottom: 16px;
}
@media (max-width: 1100px) {
  .team-grid {
    max-width: 100vw;
    gap: 24px 8px;
  }
  .team-member {
    width: 140px;
  }
  .team-photo-wrapper {
    width: 110px;
    height: 110px;
  }
}
@media (max-width: 900px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 18px 8px;
  }
  .team-grid-bottom {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  .team-member {
    width: 100px;
  }
  .team-photo-wrapper {
    width: 70px;
    height: 70px;
  }
}
</style> 