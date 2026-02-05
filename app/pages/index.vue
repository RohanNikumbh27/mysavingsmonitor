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
          style="min-height: 50vh;"
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

        <!-- Recent Entries Table -->
        <v-card v-else variant="flat" class="border rounded-lg overflow-hidden">
          <v-data-table
            :headers="headers"
            :items="savingsStore.recentEntries"
            item-value="id"
            hide-default-footer
            hover
            class="bg-transparent"
          >
            <template #item.title="{ item }">
              <div class="font-weight-bold">{{ item.title }}</div>
              <div v-if="item.description" class="text-caption text-medium-emphasis text-truncate" style="max-width: 200px">
                {{ item.description }}
              </div>
            </template>

            <template #item.date="{ item }">
              {{ formatDate(item.date) }}
            </template>

            <template #item.originalPrice="{ item }">
              <span class="text-medium-emphasis text-decoration-line-through">
                ₹{{ item.originalPrice.toLocaleString('en-IN') }}
              </span>
            </template>

            <template #item.paidPrice="{ item }">
              <span class="font-weight-medium">
                ₹{{ item.paidPrice.toLocaleString('en-IN') }}
              </span>
            </template>

            <template #item.savedAmount="{ item }">
              <v-chip color="success" size="small" variant="tonal" label>
                ₹{{ item.savedAmount.toLocaleString('en-IN') }}
              </v-chip>
            </template>

            <template #item.actions="{ item }">
              <div class="d-flex justify-end">
                <EditSavingsDialog :entry="item">
                  <template #activator="{ props }">
                    <v-btn v-bind="props" icon="mdi-pencil" variant="text" size="small" color="medium-emphasis"></v-btn>
                  </template>
                </EditSavingsDialog>
                <DeleteConfirmDialog :entry="item">
                  <template #activator="{ props }">
                    <v-btn v-bind="props" icon="mdi-delete" variant="text" size="small" color="error"></v-btn>
                  </template>
                </DeleteConfirmDialog>
              </div>
            </template>
          </v-data-table>
        </v-card>
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

const headers = [
  { title: 'Title', key: 'title', align: 'start' },
  { title: 'Date', key: 'date', align: 'start' },
  { title: 'Original', key: 'originalPrice', align: 'end' },
  { title: 'Paid', key: 'paidPrice', align: 'end' },
  { title: 'Saved', key: 'savedAmount', align: 'end' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
] as const

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  })
}
</script>
