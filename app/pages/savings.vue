<template>
  <div>
    <!-- Header Section -->
    <div class="d-flex flex-column flex-md-row align-md-center justify-space-between mb-6">
      <div class="mb-4 mb-md-0">
        <v-btn
          variant="text"
          color="medium-emphasis"
          prepend-icon="mdi-arrow-left"
          to="/"
          class="mb-2 pl-0"
          density="compact"
        >
          Back to Dashboard
        </v-btn>
        <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">
          <span class="text-gradient">My Savings</span>
        </h1>
        <p class="text-body-1 text-medium-emphasis">
          All your smart savings in one place
        </p>
      </div>

      <div class="d-flex align-center ga-2">
        <v-btn-toggle
          v-model="viewMode"
          color="primary"
          variant="outlined"
          class="mr-2"
          mandatory
          density="comfortable"
          @update:model-value="saveViewMode"
        >
          <v-btn value="grid" icon="mdi-view-grid"></v-btn>
          <v-btn value="list" icon="mdi-view-list"></v-btn>
        </v-btn-toggle>

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
    </div>

    <!-- Summary Section (Moved to Top) -->
    <v-card
      v-if="savingsStore.sortedEntries.length > 0"
      class="mb-6 pa-4 savings-card"
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

    <!-- Empty State -->
    <v-card 
      v-if="savingsStore.sortedEntries.length === 0" 
      class="pa-8 text-center savings-card d-flex flex-column justify-center align-center"
      variant="flat"
      style="min-height: 67vh;"
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

    <!-- Savings Grid View -->
    <v-row v-else-if="viewMode === 'grid'">
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

    <!-- Savings List View -->
    <v-card v-else variant="flat" class="border rounded-lg overflow-hidden">
      <v-list lines="two" class="pa-0">
        <template v-for="(entry, index) in savingsStore.sortedEntries" :key="entry.id">
          <v-list-item class="py-3 hover-bg-surface-variant transition-colors">
            <template #prepend>
              <v-avatar color="primary" variant="tonal" class="mr-4 rounded-lg">
                <v-icon>mdi-piggy-bank</v-icon>
              </v-avatar>
            </template>

            <v-list-item-title class="font-weight-bold text-body-1 mb-1">
              {{ entry.title }}
            </v-list-item-title>
            
            <v-list-item-subtitle class="d-flex align-center">
              <span class="mr-3">{{ formatDate(entry.date) }}</span>
              <v-chip size="x-small" variant="tonal" color="success" label>
                Saved ₹{{ entry.savedAmount.toLocaleString('en-IN') }}
              </v-chip>
            </v-list-item-subtitle>

            <template #append>
              <div class="d-flex align-center ga-2">
                <div class="text-right mr-4 d-none d-sm-block">
                  <div class="text-caption text-medium-emphasis text-decoration-line-through">
                    ₹{{ entry.originalPrice.toLocaleString('en-IN') }}
                  </div>
                  <div class="font-weight-medium">
                    ₹{{ entry.paidPrice.toLocaleString('en-IN') }}
                  </div>
                </div>
                
                <EditSavingsDialog :entry="entry">
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      width="55" height="55" class="my-1"
                      icon="mdi-pencil"
                      variant="tonal"
                      density="comfortable"
                      color="medium-emphasis"
                    ></v-btn>
                  </template>
                </EditSavingsDialog>

                <DeleteConfirmDialog :entry="entry">
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      width="55" height="55" class="my-1"
                      icon="mdi-delete"
                      variant="tonal"
                      density="comfortable"
                      color="error"
                    ></v-btn>
                  </template>
                </DeleteConfirmDialog>
              </div>
            </template>
          </v-list-item>
          <v-divider v-if="index < savingsStore.sortedEntries.length - 1" />
        </template>
      </v-list>
    </v-card>

    <!-- Summary Footer Removed (Moved to Top) -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSavingsStore } from '~/stores/savingsStore'

const savingsStore = useSavingsStore()
const viewMode = ref<'grid' | 'list'>('grid')

function saveViewMode() {
  localStorage.setItem('savingsViewMode', viewMode.value)
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

onMounted(() => {
  const savedMode = localStorage.getItem('savingsViewMode')
  if (savedMode && (savedMode === 'grid' || savedMode === 'list')) {
    viewMode.value = savedMode
  }
})
</script>
