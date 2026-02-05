<template>
  <div>
    <!-- Header Section -->
    <div class="d-flex flex-column flex-md-row align-md-center justify-space-between mb-6">
      <div class="mb-4 mb-md-0">
        <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">
          <span class="text-gradient">My Savings</span>
        </h1>
        <p class="text-body-1 text-medium-emphasis">
          All your smart savings in one place
        </p>
      </div>

      <AddSavingsDialog>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            color="primary"
            variant="elevated"
            prepend-icon="mdi-plus"
            size="large"
          >
            Add Saving
          </v-btn>
        </template>
      </AddSavingsDialog>
    </div>

    <!-- Empty State -->
    <v-card 
      v-if="savingsStore.sortedEntries.length === 0" 
      class="pa-8 text-center savings-card d-flex flex-column justify-center align-center"
      variant="flat"
      style="min-height: 70vh;"
    >
      <v-icon size="80" color="primary" class="mb-4 opacity-60">mdi-piggy-bank-outline</v-icon>
      <h3 class="text-h6 font-weight-medium mb-2">No savings yet</h3>
      <p class="text-body-2 text-medium-emphasis mb-4">
        Start tracking your smart savings today!
      </p>
      <AddSavingsDialog>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            color="primary"
            variant="elevated"
            prepend-icon="mdi-plus"
          >
            Add Saving
          </v-btn>
        </template>
      </AddSavingsDialog>
    </v-card>

    <!-- Savings List -->
    <v-row v-else>
      <v-col 
        v-for="(entry, index) in savingsStore.sortedEntries" 
        :key="entry.id"
        cols="12"
        sm="6"
        lg="4"
        class="fade-in-up"
        :style="{ animationDelay: `${index * 0.05}s` }"
      >
        <SavingsCard :entry="entry" />
      </v-col>
    </v-row>

    <!-- Summary Footer -->
    <v-card
      v-if="savingsStore.sortedEntries.length > 0"
      class="mt-6 pa-4 savings-card"
      variant="flat"
    >
      <div class="d-flex flex-wrap justify-space-between align-center ga-4">
        <div class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-counter</v-icon>
          <span class="text-body-1">
            <strong>{{ savingsStore.sortedEntries.length }}</strong> 
            total {{ savingsStore.sortedEntries.length === 1 ? 'saving' : 'savings' }}
          </span>
        </div>
        <div class="d-flex align-center">
          <v-icon color="savings" class="mr-2">mdi-cash</v-icon>
          <span class="text-h6 font-weight-bold text-gradient-warm">
            ₹{{ savingsStore.totalSavings.toLocaleString('en-IN') }}
          </span>
          <span class="text-body-2 text-medium-emphasis ml-1">saved</span>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useSavingsStore } from '~/stores/savingsStore'

const savingsStore = useSavingsStore()
</script>
