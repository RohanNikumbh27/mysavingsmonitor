<template>
  <v-row>
    <!-- Total Savings Card -->
    <v-col cols="12" sm="6" md="4">
      <v-card class="stats-card hover-lift h-100" variant="flat">
        <v-card-text class="pa-5">
          <div class="d-flex align-center mb-3">
            <v-avatar color="primary" size="44" class="mr-3">
              <v-icon color="white">mdi-piggy-bank</v-icon>
            </v-avatar>
            <span class="text-body-2 text-medium-emphasis font-weight-medium">Total Savings</span>
          </div>
          <h2 class="text-h4 font-weight-bold text-gradient mb-1">
            ₹{{ savingsStore.totalSavings.toLocaleString('en-IN') }}
          </h2>
          <span class="text-caption text-medium-emphasis">
            From {{ savingsStore.totalEntries }} smart {{ savingsStore.totalEntries === 1 ? 'decision' : 'decisions' }}
          </span>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- This Month Card -->
    <v-col cols="12" sm="6" md="4">
      <v-card class="stats-card hover-lift h-100" variant="flat">
        <v-card-text class="pa-5">
          <div class="d-flex align-center mb-3">
            <v-avatar color="savings" size="44" class="mr-3">
              <v-icon color="white">mdi-calendar-month</v-icon>
            </v-avatar>
            <span class="text-body-2 text-medium-emphasis font-weight-medium">This Month</span>
          </div>
          <h2 class="text-h4 font-weight-bold text-gradient-warm mb-1">
            ₹{{ savingsStore.thisMonthSavings.toLocaleString('en-IN') }}
          </h2>
          <span class="text-caption text-medium-emphasis">
            {{ currentMonth }}
          </span>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Average Savings Card -->
    <v-col cols="12" sm="6" md="4">
      <v-card class="stats-card hover-lift h-100" variant="flat">
        <v-card-text class="pa-5">
          <div class="d-flex align-center mb-3">
            <v-avatar color="secondary" size="44" class="mr-3">
              <v-icon color="white">mdi-trending-up</v-icon>
            </v-avatar>
            <span class="text-body-2 text-medium-emphasis font-weight-medium">Avg. per Entry</span>
          </div>
          <h2 class="text-h4 font-weight-bold mb-1">
            ₹{{ Math.round(savingsStore.averageSavingsPerEntry).toLocaleString('en-IN') }}
          </h2>
          <span class="text-caption text-medium-emphasis">
            Per smart decision
          </span>
        </v-card-text>
      </v-card>
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
