<template>
  <v-card class="savings-card hover-lift" variant="flat">
    <div class="d-flex align-start pa-4">
      <!-- Savings Icon -->
      <v-avatar
        color="primary"
        size="48"
        class="mr-4"
      >
        <v-icon color="white" size="24">mdi-piggy-bank</v-icon>
      </v-avatar>

      <!-- Entry Details -->
      <div class="flex-grow-1 overflow-hidden">
        <h3 class="text-subtitle-1 font-weight-bold text-truncate mb-1">
          {{ entry.title }}
        </h3>

        <p v-if="entry.description" class="text-body-2 text-medium-emphasis text-truncate mb-2">
          {{ entry.description }}
        </p>

        <!-- Price Details -->
        <div class="d-flex align-center flex-wrap ga-3 mb-2">
          <div class="d-flex align-center">
            <v-icon size="16" color="error" class="mr-1">mdi-currency-rupee</v-icon>
            <span class="text-body-2 text-decoration-line-through text-medium-emphasis">
              {{ entry.originalPrice.toLocaleString('en-IN') }}
            </span>
          </div>
          <v-icon size="14" class="text-medium-emphasis">mdi-arrow-right</v-icon>
          <div class="d-flex align-center">
            <v-icon size="16" color="success" class="mr-1">mdi-currency-rupee</v-icon>
            <span class="text-body-2 font-weight-medium">
              {{ entry.paidPrice.toLocaleString('en-IN') }}
            </span>
          </div>
        </div>

        <!-- Saved Amount & Date -->
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-icon size="18" color="savings" class="mr-1">mdi-piggy-bank</v-icon>
            <span class="text-body-1 font-weight-bold text-gradient-warm">
              ₹{{ entry.savedAmount.toLocaleString('en-IN') }}
            </span>
            <span class="text-caption text-medium-emphasis ml-1">saved</span>
          </div>
          <span class="text-caption text-medium-emphasis">
            {{ formatDate(entry.date) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <v-divider />
    <v-card-actions class="pa-3 ga-2">
      <EditSavingsDialog :entry="entry">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            variant="tonal"
            color="primary"
            class="flex-grow-1"
            prepend-icon="mdi-pencil"
          >
            Edit
          </v-btn>
        </template>
      </EditSavingsDialog>

      <DeleteConfirmDialog :entry="entry">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            variant="tonal"
            color="error"
            class="flex-grow-1"
            prepend-icon="mdi-delete"
          >
            Delete
          </v-btn>
        </template>
      </DeleteConfirmDialog>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { SavingsEntry } from '~/stores/savingsStore'

const props = defineProps<{
  entry: SavingsEntry
}>()

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
</script>
