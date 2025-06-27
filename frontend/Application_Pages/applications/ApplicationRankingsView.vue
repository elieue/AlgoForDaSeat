<template>
  <transition name="page-fade">
    <div class="rankings-page figma-yellow-bg">
      <div class="rankings-header">
        <h1 class="page-title figma-black figma-bold">Application Rankings</h1>
        <button class="process-btn" :disabled="localLoading" @click="onProcessRankings" aria-label="Process Rankings">
          <img src="../../Assets/process-ranking-logo.svg" class="btn-icon" alt="Process" />
          <span v-if="!localLoading">Process Rankings</span>
          <span v-else class="spinner"></span>
        </button>
      </div>
      <p class="page-desc" style="color:#555;">Review processed rankings for approved and waitlisted students. This page shows the ranking results after processing applications.</p>
      
      <!-- Initial Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading applications...</p>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <p class="error-message">{{ error }}</p>
        <button @click="loadData" class="retry-btn">Retry</button>
      </div>
      
      <!-- Main Content -->
      <div v-else>
        <transition name="fade-slide">
          <div v-if="alertUnranked" class="unranked-alert">
            <img src="../../Assets/ranking-logo.svg" class="alert-icon" alt="Unranked" />
            <div>
              <b class="figma-orange figma-bold">Unranked Applications</b><br />
              <span style="color:#555;">There are {{ unrankedCount }} application(s) that have not been ranked yet (typically 'Pending' status). Click "Process Rankings" to process them. This page will then display approved applications based on these rankings.</span>
            </div>
          </div>
        </transition>
        <transition name="fade-slide">
          <template v-if="!localLoading">
            <div v-if="localError" class="error-toast figma-shadow" aria-live="assertive" style="color:#b71c1c; background:#ffebee; border:1.5px solid #ffcdd2;">{{ localError }}</div>
            <div v-else-if="approvedRankings.length === 0 && waitlistedRankings.length === 0" class="empty-state" aria-live="polite">
              <img src="../../Assets/ranking-logo.svg" class="empty-icon" alt="No Rankings" />
              <h2 class="empty-title">No applications have been ranked yet.</h2>
              <p class="empty-desc">Run <b>Process Rankings</b> to rank applications and categorize them into approved, waitlisted, and rejected.</p>
            </div>
            <div v-else>
              <!-- Approved Rankings Section -->
              <div v-if="approvedRankings.length > 0" class="card rankings-card figma-shadow" style="background:#fff; border-radius:24px; padding:32px; margin-bottom: 24px;">
                <div class="card-header" style="padding:0 0 8px 0;">
                  <span class="card-title figma-black figma-bold" style="font-size:1.25rem;display:flex;align-items:center;gap:10px;">
                    <img src="../../Assets/approved-applications-logo.svg" class="card-icon figma-orange" alt="Approved Rankings" style="width:28px;height:28px;" />
                    Ranked Approved Applications <span class="count figma-orange figma-bold">({{ approvedRankings.length }})</span>
                  </span>
                  <span class="card-sub" style="color:#555; font-size:1rem; margin-top:2px;">Approved student applications, ranked based on multiple criteria including academic performance, proximity, and socioeconomic status. Lower rank indicates higher priority.</span>
                </div>
                <div class="table-scroll" style="overflow-x:auto;">
                  <ApplicationRankingsTable :applications="approvedRankings" @view="goToApplicantProfile" />
                </div>
                <div class="footer-row" v-if="approvedRankings.length" style="color:#888; font-size:1.02rem; padding:16px 0 0 0;">Showing {{ approvedRankings.length }} approved and ranked application(s).</div>
              </div>

              <!-- Waitlisted Rankings Section -->
              <div v-if="waitlistedRankings.length > 0" class="card rankings-card figma-shadow" style="background:#fff; border-radius:24px; padding:32px;">
                <div class="card-header" style="padding:0 0 8px 0;">
                  <span class="card-title figma-black figma-bold" style="font-size:1.25rem;display:flex;align-items:center;gap:10px;">
                    <img src="../../Assets/waitlisted-applications-logo.svg" class="card-icon figma-orange" alt="Waitlisted Rankings" style="width:28px;height:28px;" />
                    Ranked Waitlisted Applications <span class="count figma-orange figma-bold">({{ waitlistedRankings.length }})</span>
                  </span>
                  <span class="card-sub" style="color:#555; font-size:1rem; margin-top:2px;">Waitlisted student applications, ranked based on multiple criteria. These students are qualified but are currently on the waitlist due to slot limitations.</span>
                </div>
                <div class="table-scroll" style="overflow-x:auto;">
                  <ApplicationRankingsTable :applications="waitlistedRankings" @view="goToApplicantProfile" />
                </div>
                <div class="footer-row" v-if="waitlistedRankings.length" style="color:#888; font-size:1.02rem; padding:16px 0 0 0;">Showing {{ waitlistedRankings.length }} waitlisted and ranked application(s).</div>
              </div>
            </div>
          </template>
        </transition>
        <div v-if="localLoading" class="skeleton-loader figma-shadow" style="margin-top:32px;display:flex;flex-direction:column;gap:18px;">
          <div class="skeleton-card" style="height:64px;width:100%;background:#f5f5f5;border-radius:24px;"></div>
          <div class="skeleton-table" style="height:220px;width:100%;background:#f5f5f5;border-radius:24px;"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import ApplicationRankingsTable from './components/ApplicationRankingsTable.vue';
import { useApplicationsStore } from '../store/applications.js';
import { useRouter } from 'vue-router';
import applicationsAPI from '../api/applications.js';

const applicationsStore = useApplicationsStore();
const { pending, approved, rankings, loading, error } = storeToRefs(applicationsStore);

const localLoading = ref(false);
const localError = ref(null);

// Computed properties
const unrankedCount = computed(() => pending.value.length);
const alertUnranked = computed(() => unrankedCount.value > 0);

// Filter rankings to show both approved and waitlisted applications with rankings
const approvedRankings = computed(() => {
  return rankings.value
    .filter(ranking => ranking.status === 'admitted')
    .sort((a, b) => a.rank - b.rank);
});

const waitlistedRankings = computed(() => {
  return rankings.value
    .filter(ranking => ranking.status === 'waitlisted')
    .sort((a, b) => a.rank - b.rank);
});

const router = useRouter();

async function onProcessRankings() {
  localLoading.value = true;
  localError.value = null;
  try {
    // Call backend allocation endpoint
    const result = await applicationsAPI.allocateSlots();
    console.log('Allocations:', result.allocations);
    
    // Reload all applications to get updated data
    await applicationsStore.loadAllApplications();
    
    if (result.allocations && result.allocations.length > 0) {
      // Process rankings for both admitted and waitlisted students
      const processedRankings = result.allocations
        .filter(app => app.status === 'admitted' || app.status === 'waitlisted')
        .sort((a, b) => a.rank - b.rank)
        .map((app, index) => ({
          id: app.id,
          fullName: app.full_name,
          gpaPts: app.score && app.score.gpaPts,
          examPts: app.score && app.score.examPts,
          incomePts: app.score && app.score.incomePts,
          indigentPts: app.score && app.score.indigentPts,
          proximityPts: app.score && app.score.proximityPts,
          totalPts: app.score && app.score.total,
          status: app.status,
          assigned: app.assigned,
          rank: app.rank,
          eligibility: app.status === 'admitted' ? 'High Priority' : 'Waitlisted',
        }));
      applicationsStore.setRankings(processedRankings);
    }
  } catch (e) {
    localError.value = 'Failed to process rankings. Please try again.';
  } finally {
    localLoading.value = false;
  }
}

function goToApplicantProfile(app) {
  router.push(`/admin/applicant-profile/${app.id || app.lrn}`);
}

async function loadData() {
  await applicationsStore.loadAllApplications();
}

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.rankings-page {
  padding: 32px 40px 32px 40px;
  min-height: 100vh;
  /* background: var(--color-bg); now set by .figma-yellow-bg */
  animation: fadein 0.6s cubic-bezier(.4,0,.2,1);
}
@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
.page-fade-enter-active, .page-fade-leave-active {
  transition: opacity 0.5s cubic-bezier(.4,0,.2,1);
}
.page-fade-enter-from, .page-fade-leave-to {
  opacity: 0;
}
.page-fade-enter-to, .page-fade-leave-from {
  opacity: 1;
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.45s cubic-bezier(.4,0,.2,1);
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(24px);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.rankings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.page-title {
  color: #f7a600;
  font-family: 'Poppins', sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  background: none;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  margin-bottom: 0;
  letter-spacing: 0.2px;
  /* Figma: #ff8800, bold */
}
.process-btn {
  display: flex;
  align-items: center;
  background: #f7a600;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.12rem;
  border: none;
  border-radius: 12px;
  padding: 12px 32px 12px 20px;
  box-shadow: 0 2px 8px 0 rgba(247,166,0,0.10);
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, border-color 0.18s, transform 0.12s cubic-bezier(.4,0,.2,1);
  outline: none;
  gap: 12px;
  min-width: 210px;
  min-height: 48px;
  position: relative;
}
.process-btn:active {
  transform: scale(0.97);
  background: #ffb300;
}
.process-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.process-btn:hover:not(:disabled), .process-btn:focus:not(:disabled) {
  background: #ffb300;
  color: #fff;
  box-shadow: 0 4px 16px 0 rgba(247,166,0,0.18);
}
.btn-icon {
  width: 24px;
  height: 24px;
}
.spinner {
  width: 22px;
  height: 22px;
  border: 3px solid #fff;
  border-top: 3px solid #b35c00;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.page-desc {
  font-family: 'Inter', sans-serif;
  color: var(--color-muted);
  margin-bottom: 18px;
  font-size: 1.1rem;
  /* Figma: #555 */
}
.unranked-alert {
  display: flex;
  align-items: flex-start;
  background: #fff9c4;
  color: #74512D;
  border: 2px solid #ffe082;
  border-radius: 12px;
  padding: 18px 24px;
  margin-bottom: 18px;
  font-family: 'Inter', sans-serif;
  font-size: 1.08rem;
  box-shadow: 0 2px 8px 0 rgba(247,166,0,0.06);
  gap: 18px;
  /* Figma: #74512D */
}
.unranked-alert .alert-icon {
  width: 28px;
  height: 28px;
  margin-top: 2px;
  flex-shrink: 0;
  filter: brightness(0.7) sepia(1) hue-rotate(-20deg) saturate(3);
}
.error-toast {
  background: #ffebee;
  color: #b71c1c;
  border: 1.5px solid #ffcdd2;
  border-radius: 8px;
  padding: 12px 18px;
  margin-bottom: 18px;
  font-family: 'Inter', sans-serif;
  font-size: 1.08rem;
  font-weight: 600;
  box-shadow: 0 2px 8px 0 rgba(183,28,28,0.06);
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-yellow-bg);
  border: 2px dashed var(--color-yellow-text);
  border-radius: 18px;
  padding: 48px 0 48px 0;
  margin-top: 32px;
  box-shadow: 0 2px 12px 0 rgba(255,136,0,0.06);
  min-height: 320px;
}
.empty-icon {
  width: 54px;
  height: 54px;
  margin-bottom: 18px;
  opacity: 0.85;
}
.empty-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.35rem;
  font-weight: 800;
  color: #888;
  margin-bottom: 8px;
  text-align: center;
  /* Figma: #b35c00 */
}
.empty-desc {
  font-family: 'Inter', sans-serif;
  color: #aaa;
  font-size: 1.08rem;
  text-align: center;
  /* Figma: #002171 */
}
.rankings-card {
  margin-top: 18px;
  padding: 0 0 18px 0;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12);
  border: 2px solid var(--color-border);
  animation: fadein 0.5s cubic-bezier(.4,0,.2,1);
}
.card-header {
  padding: 24px 32px 8px 32px;
}
.card-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-secondary);
  display: flex;
  align-items: center;
  gap: 10px;
  /* Figma: #181818 */
}
.card-icon {
  width: 24px;
  height: 24px;
}
.count {
  color: var(--color-yellow-text);
  font-weight: 700;
}
.card-sub {
  font-family: 'Inter', sans-serif;
  display: block;
  color: var(--color-muted);
  font-size: 1rem;
  margin-top: 2px;
  /* Figma: #555 */
}
.table-scroll {
  overflow-x: auto;
  padding: 0 8px 0 8px;
}
.footer-row {
  font-family: 'Inter', sans-serif;
  color: #888;
  font-size: 1.02rem;
  padding: 16px 32px 0 32px;
  text-align: left;
  /* Figma: #888 */
}
.skeleton-loader {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.skeleton-card {
  height: 64px;
  width: 100%;
  background: #f5f5f5;
  border-radius: 16px;
  animation: pulse 1.2s infinite alternate;
}
.skeleton-table {
  height: 220px;
  width: 100%;
  background: #f5f5f5;
  border-radius: 16px;
  animation: pulse 1.2s infinite alternate;
}
@keyframes pulse {
  0% { opacity: 1; }
  100% { opacity: 0.6; }
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 16px;
  padding: 48px 0;
  margin-top: 8px;
  text-align: center;
}
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #f7a600;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 2px dashed #ffcdd2;
  border-radius: 16px;
  padding: 48px 0;
  margin-top: 8px;
  text-align: center;
}
.error-message {
  font-family: 'Inter', sans-serif;
  color: #d32f2f;
  font-size: 1rem;
  margin-bottom: 16px;
}
.retry-btn {
  background: #f7a600;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.retry-btn:hover {
  background: #e69500;
}
</style> 