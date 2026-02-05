<template>
  <div>
    <!-- Header Section -->
    <div class="mb-4">
      <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">
        <span class="text-gradient">Dashboard</span>
      </h1>
      <p class="text-body-1 text-medium-emphasis">
        Track your smart savings journey
      </p>
    </div>

    <!-- Tabs -->
    <div class="d-flex ga-2 mb-4">
      <v-btn
        :variant="activeTab === 'savings' ? 'flat' : 'tonal'"
        :color="activeTab === 'savings' ? 'primary' : undefined"
        prepend-icon="mdi-piggy-bank"
        rounded="pill"
        @click="activeTab = 'savings'"
        class="px-5"
      >
        Savings
      </v-btn>
      <v-btn
        :variant="activeTab === 'summary' ? 'flat' : 'tonal'"
        :color="activeTab === 'summary' ? 'primary' : undefined"
        prepend-icon="mdi-chart-box-outline"
        rounded="pill"
        @click="activeTab = 'summary'"
        class="px-5"
      >
        Summary
      </v-btn>
    </div>

    <!-- Tab Content -->
    <v-tabs-window v-model="activeTab">
      <!-- Savings Tab -->
      <v-tabs-window-item value="savings">
        <div class="d-flex align-center justify-space-between mb-4">
          <h2 class="text-h5 font-weight-bold">Recent Savings</h2>
          <v-btn
            v-if="savingsStore.totalEntries > 0"
            variant="text"
            color="primary"
            to="/savings"
            append-icon="mdi-chevron-right"
          >
            View All
          </v-btn>
        </div>

        <!-- Empty State -->
        <v-card 
          v-if="savingsStore.totalEntries === 0" 
          class="pa-8 text-center savings-card d-flex flex-column justify-center align-center"
          variant="flat"
          style="min-height: 57vh;"
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
                size="large"
              >
                Add Your First Saving
              </v-btn>
            </template>
          </AddSavingsDialog>
        </v-card>

        <!-- Recent Entries List -->
        <v-row v-else>
          <v-col 
            v-for="entry in savingsStore.recentEntries" 
            :key="entry.id"
            cols="12"
            md="6"
            lg="4"
          >
            <SavingsCard :entry="entry" />
          </v-col>
        </v-row>
      </v-tabs-window-item>

      <!-- Summary Tab -->
      <v-tabs-window-item value="summary">
        <SavingsStats />
      </v-tabs-window-item>
    </v-tabs-window>

    <!-- FAB for adding new savings -->
    <v-fab
      v-if="savingsStore.totalEntries > 0"
      icon="mdi-plus"
      color="primary"
      location="bottom end"
      size="large"
      class="fab-animated"
      app
      appear
    >
      <AddSavingsDialog>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-plus"
            color="primary"
            size="large"
            variant="elevated"
            class="fab-animated"
          />
        </template>
      </AddSavingsDialog>
    </v-fab>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSavingsStore } from '~/stores/savingsStore'

const savingsStore = useSavingsStore()
const activeTab = ref('savings')
</script>
