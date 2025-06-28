<template>
  <div class="landing-page">
    <header class="header" style="background: transparent; backdrop-filter: none; box-shadow: none;">
      <router-link to="/">
        <img src="../../Assets/algofordaseat-logo.png" alt="Logo" class="logo-icon" />
      </router-link>
    </header>
    <div class="header-border"></div>
    <main class="main-content">
      <h1>
        <span class="main-title-1">
          Welcome to <span class="main-title-orange">AlgoForDaSeat</span>
        </span>
      </h1>
      <p class="main-subtitle">Fair Shots for School Slots</p>
      <img src="../assets/illustration.png" alt="Illustration" class="illustration-img" />
      <section class="mission-section">
        <h2>Our Mission</h2>
        <p>
          AlgoForDaSeat is a public school enrollment management system committed to fairly allocating limited school slots. We ensure equitable access to education by leveraging transparent, data-driven criteria, promoting a brighter future for every student in our community.
        </p>
      </section>
      <section class="principles-section">
        <h2>Core Principles</h2>
        <div class="principles-grid">
          <div class="principle-card">
            <img src="../assets/academic-excellence.png" alt="Academic Excellence Icon" class="principle-icon-img" />
            <h3>Academic Excellence</h3>
            <p>Prioritizing strong scholastic achievements and student potential to foster a thriving learning environment.</p>
          </div>
          <div class="principle-card">
            <img src="../assets/school-proximity.png" alt="School Proximity Icon" class="principle-icon-img" />
            <h3>School Proximity</h3>
            <p>Considering student's distance to school for better accessibility and stronger community integration.</p>
          </div>
          <div class="principle-card">
            <img src="../assets/socioeconomic-equity.png" alt="Socioeconomic Equity Icon" class="principle-icon-img" />
            <h3>Socioeconomic Equity</h3>
            <p>Supporting equitable opportunities for students from diverse socioeconomic backgrounds to ensure fairness.</p>
          </div>
        </div>
      </section>
    </main>
    <router-link to="/team" class="bottom-team-link">Meet the Team</router-link>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
onMounted(() => {
  document.body.classList.add('home-gradient-bg');
});
onUnmounted(() => {
  document.body.classList.remove('home-gradient-bg');
});
// No login button or script needed
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  padding-bottom: 40px;
  position: relative;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 12px 32px;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 2px 12px rgba(210,105,30,0.07);
  margin-bottom: 32px;
}
.logo-icon {
  width: 65px;
  height: 65px;
  top: 14px;
  left: 18px;
}
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1, h2, h3, .main-title-1, .main-title-orange, .bottom-team-link {
  font-family: 'Poppins', sans-serif;
}
.main-title-1 {
  color: #A86523F0;
  text-shadow: 0 2px 8px #d2691e22;
  font-size: 2.7rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
  text-align: center;
}
.main-title-orange {
  color: #f4a825;
}
.main-subtitle {
  color: #7D848D;
  font-size: 1.1rem;
  width: 300px;
  height: 30px;
  margin: 0 auto 1.5rem auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.illustration-img {
  width: 600px;
  max-width: 90vw;
  border-radius: 12px;
}
.mission-section {
  text-align: center;
  margin-bottom: 2.5rem;
}
.mission-section h2 {
  color: #A86523;
  font-size: 29.9px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: 0%;
  vertical-align: middle;
  margin-bottom: 24px;
}
.mission-section p {
  color: #6A7178;
  font-size: 18px;
  line-height: 29.27px;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
  max-width: 760px;
  margin: 0 auto;
}
.principles-section {
  text-align: center;
}
.principles-section h2 {
  font-size: 31.3px;
  line-height: 100%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #A86523;
  margin-bottom: 32px;
}
.principles-grid {
  display: flex;
  gap: 32px;
  justify-content: center;
  flex-wrap: wrap;
}
.principle-card {
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.07);
  padding: 28px 18px 24px 18px;
  width: 260px;
  text-align: center;
  margin-bottom: 24px;
}
.principle-icon-img {
  width: 44px;
  height: 44px;
  margin-top: 34px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.principle-card h3 {
  color: #a05a1c;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}
.principle-card p {
  color: #7a5a3a;
  font-size: 0.95rem;
}
@media (max-width: 900px) {
  .principles-grid {
    flex-direction: column;
    align-items: center;
  }
}
.bottom-team-link {
  display: block;
  margin: 64px auto 24px auto;
  text-align: center;
  font-size: 1.15rem;
  color: #a86523;
  font-weight: 600;
  text-decoration: none;
  background: #fff7ef;
  border-radius: 8px;
  padding: 12px 32px;
  box-shadow: 0 2px 8px rgba(210,105,30,0.07);
  transition: background 0.2s, color 0.2s;
  width: fit-content;
}
.bottom-team-link:hover {
  background: #ffe5c2;
  color: #f4a825;
}
.header-border {
  width: 1168px;
  height: 3px;
  background: #F6EDDC;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 77px;
  margin: 0;
  z-index: 10;
}
p, .main-subtitle, .principle-card p, .mission-section p {
  font-family: 'Inter', Arial, sans-serif;
}
</style> 