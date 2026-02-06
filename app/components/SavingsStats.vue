<template>
  <v-row class="stats-row">
    <!-- Total Savings Card -->
    <v-col cols="12" sm="6" md="4" class="stats-col">
      <div class="glass-stats-card glass-primary">
        <div class="glass-glow"></div>
        <div class="glass-content">
          <div class="d-flex align-center mb-3">
            <div class="icon-wrapper icon-primary">
              <v-icon color="white" size="24">mdi-piggy-bank</v-icon>
            </div>
            <span class="text-body-2 text-white font-weight-medium ml-3">Total Savings</span>
          </div>
          <h2 class="text-h4 font-weight-bold text-white mb-1">
            ₹{{ savingsStore.totalSavings.toLocaleString('en-IN') }}
          </h2>
          <span class="text-caption text-white-70">
            From {{ savingsStore.totalEntries }} smart {{ savingsStore.totalEntries === 1 ? 'decision' : 'decisions' }}
          </span>
        </div>
        <div class="floating-particles">
          <span></span><span></span><span></span>
        </div>
      </div>
    </v-col>

    <!-- This Month Card -->
    <v-col cols="12" sm="6" md="4" class="stats-col">
      <div class="glass-stats-card glass-warm">
        <div class="glass-glow"></div>
        <div class="glass-content">
          <div class="d-flex align-center mb-3">
            <div class="icon-wrapper icon-warm">
              <v-icon color="white" size="24">mdi-calendar-month</v-icon>
            </div>
            <span class="text-body-2 text-white font-weight-medium ml-3">This Month</span>
          </div>
          <h2 class="text-h4 font-weight-bold text-white mb-1">
            ₹{{ savingsStore.thisMonthSavings.toLocaleString('en-IN') }}
          </h2>
          <span class="text-caption text-white-70">
            {{ currentMonth }}
          </span>
        </div>
        <div class="floating-particles">
          <span></span><span></span><span></span>
        </div>
      </div>
    </v-col>

    <!-- Average Savings Card -->
    <v-col cols="12" sm="6" md="4" class="stats-col">
      <div class="glass-stats-card glass-accent">
        <div class="glass-glow"></div>
        <div class="glass-content">
          <div class="d-flex align-center mb-3">
            <div class="icon-wrapper icon-accent">
              <v-icon color="white" size="24">mdi-trending-up</v-icon>
            </div>
            <span class="text-body-2 text-white font-weight-medium ml-3">Avg. per Entry</span>
          </div>
          <h2 class="text-h4 font-weight-bold text-white mb-1">
            ₹{{ Math.round(savingsStore.averageSavingsPerEntry).toLocaleString('en-IN') }}
          </h2>
          <span class="text-caption text-white-70">
            Per smart decision
          </span>
        </div>
        <div class="floating-particles">
          <span></span><span></span><span></span>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSavingsStore } from '~/stores/savingsStore'

const savingsStore = useSavingsStore()

const currentMonth = computed(() => {
  return new Date().toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  })
})
</script>

<style scoped>
/* Row and column overflow handling */
.stats-row {
  overflow: visible !important;
  padding: 50px 20px;
  height: 50vh;
}

.stats-col {
  overflow: visible !important;
}

.glass-stats-card {
  position: relative;
  border-radius: 24px;
  padding: 24px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 160px;
  z-index: 1;
}

.glass-stats-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  z-index: 10;
}

/* Primary - Blue/Purple gradient */
.glass-primary {
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.7) 0%, 
    rgba(139, 92, 246, 0.7) 50%,
    rgba(168, 85, 247, 0.7) 100%);
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
}

.glass-primary:hover {
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.5);
}

/* Warm - Orange/Yellow gradient */
.glass-warm {
  background: linear-gradient(135deg, 
    rgba(251, 146, 60, 0.7) 0%, 
    rgba(251, 191, 36, 0.7) 50%,
    rgba(245, 158, 11, 0.7) 100%);
  box-shadow: 0 8px 32px rgba(251, 146, 60, 0.3);
}

.glass-warm:hover {
  box-shadow: 0 20px 60px rgba(251, 146, 60, 0.5);
}

/* Accent - Pink/Rose gradient */
.glass-accent {
  background: linear-gradient(135deg, 
    rgba(236, 72, 153, 0.7) 0%, 
    rgba(244, 114, 182, 0.7) 50%,
    rgba(251, 113, 133, 0.7) 100%);
  box-shadow: 0 8px 32px rgba(236, 72, 153, 0.3);
}

.glass-accent:hover {
  box-shadow: 0 20px 60px rgba(236, 72, 153, 0.5);
}

/* Glass glow effect */
.glass-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
  animation: rotate-glow 8s linear infinite;
  pointer-events: none;
}

@keyframes rotate-glow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Content layer */
.glass-content {
  position: relative;
  z-index: 2;
}

/* Icon wrapper */
.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.glass-stats-card:hover .icon-wrapper {
  transform: scale(1.1) rotate(5deg);
}

.icon-primary {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.icon-warm {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 15px rgba(251, 146, 60, 0.3);
}

.icon-accent {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
}

/* Text colors */
.text-white {
  color: #ffffff !important;
}

.text-white-70 {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Floating particles animation */
.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.floating-particles span {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: float-up 4s ease-in-out infinite;
}

.floating-particles span:nth-child(1) {
  left: 20%;
  bottom: -10px;
  animation-delay: 0s;
  animation-duration: 4s;
}

.floating-particles span:nth-child(2) {
  left: 50%;
  bottom: -10px;
  animation-delay: 1.5s;
  animation-duration: 5s;
  width: 4px;
  height: 4px;
}

.floating-particles span:nth-child(3) {
  left: 75%;
  bottom: -10px;
  animation-delay: 3s;
  animation-duration: 4.5s;
  width: 8px;
  height: 8px;
}

@keyframes float-up {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-180px) scale(0.5);
    opacity: 0;
  }
}

/* Shimmer effect on hover */
.glass-stats-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
  z-index: 1;
}

.glass-stats-card:hover::before {
  left: 100%;
}
</style>
