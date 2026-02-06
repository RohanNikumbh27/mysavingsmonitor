<template>
  <div>
    <!-- Header Section -->
    <div class="d-flex flex-column flex-md-row align-md-center justify-space-between mb-6">
      <div class="mb-4 mb-md-0">
        <v-btn
          variant="text"
          color="medium-emphasis"
          prepend-icon="mdi-arrow-left"
          to="/udhari"
          class="mb-2 pl-0"
          density="compact"
        >
          Back to Udhari
        </v-btn>
        <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">
          <span class="text-gradient">{{ person?.name || 'Loading...' }}</span>
        </h1>
        <p v-if="person?.phone" class="text-body-1 text-medium-emphasis">
          {{ person.phone }}
        </p>
      </div>

      <div class="d-flex ga-2">
        <v-btn
          color="error"
          variant="tonal"
          prepend-icon="mdi-delete"
          @click="confirmDelete = true"
        >
          Delete
        </v-btn>
      </div>
    </div>

    <!-- Summary Card -->
    <v-card v-if="person" class="mb-6 savings-card" variant="flat">
      <v-card-text>
        <v-row>
          <v-col cols="4" class="text-center">
            <div class="text-caption text-medium-emphasis mb-1">Total Gave</div>
            <div class="text-h6 font-weight-bold text-error">
              ₹{{ summary.totalGave.toLocaleString('en-IN') }}
            </div>
          </v-col>
          <v-col cols="4" class="text-center">
            <div class="text-caption text-medium-emphasis mb-1">Total Received</div>
            <div class="text-h6 font-weight-bold text-success">
              ₹{{ summary.totalReceived.toLocaleString('en-IN') }}
            </div>
          </v-col>
          <v-col cols="4" class="text-center">
            <div class="text-caption text-medium-emphasis mb-1">Balance</div>
            <div 
              class="text-h6 font-weight-bold"
              :class="summary.balance >= 0 ? 'text-success' : 'text-error'"
            >
              ₹{{ Math.abs(summary.balance).toLocaleString('en-IN') }}
            </div>
            <div class="text-caption text-medium-emphasis">
              {{ summary.balance >= 0 ? 'to receive' : 'to pay' }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Empty State -->
    <v-card 
      v-if="transactions.length === 0" 
      class="pa-8 text-center savings-card d-flex flex-column justify-center align-center"
      variant="flat"
      style="min-height: 40vh;"
    >
      <v-icon size="64" color="primary" class="mb-4 opacity-60">mdi-cash-clock</v-icon>
      <h3 class="text-h6 font-weight-medium mb-2">No transactions yet</h3>
      <p class="text-body-2 text-medium-emphasis mb-4">
        Record when you give or receive money
      </p>
      <AddUdhariTransactionDialog :person-id="id">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            color="primary"
            variant="elevated"
            prepend-icon="mdi-plus"
          >
            Add Transaction
          </v-btn>
        </template>
      </AddUdhariTransactionDialog>
    </v-card>

    <!-- Transaction Timeline -->
    <v-card v-else variant="flat" class="border rounded-lg overflow-hidden">
      <v-list lines="two" class="pa-0">
        <template v-for="(transaction, index) in transactions" :key="transaction.id">
          <v-list-item class="py-3">
            <template #prepend>
              <v-avatar 
                :color="transaction.type === 'gave' ? 'error' : 'success'" 
                variant="tonal" 
                class="mr-4"
              >
                <v-icon>{{ transaction.type === 'gave' ? 'mdi-arrow-top-right' : 'mdi-arrow-bottom-left' }}</v-icon>
              </v-avatar>
            </template>

            <v-list-item-title class="font-weight-bold text-body-1 mb-1">
              <span :class="transaction.type === 'gave' ? 'text-error' : 'text-success'">
                {{ transaction.type === 'gave' ? 'Gave' : 'Received' }}
              </span>
              <span class="ml-2">₹{{ transaction.amount.toLocaleString('en-IN') }}</span>
            </v-list-item-title>
            
            <v-list-item-subtitle>
              <span v-if="transaction.description">{{ transaction.description }} • </span>
              <span>{{ formatDate(transaction.date) }}</span>
            </v-list-item-subtitle>

            <template #append>
              <v-btn
                icon="mdi-delete"
                variant="text"
                color="error"
                size="small"
                @click.stop="deleteTransaction(transaction.id)"
              />
            </template>
          </v-list-item>
          <v-divider v-if="index < transactions.length - 1" />
        </template>
      </v-list>
    </v-card>

    <!-- FAB for adding new transaction -->
    <AddUdhariTransactionDialog v-if="transactions.length > 0" :person-id="id">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          icon="mdi-plus"
          color="primary"
          size="large"
          height="60"
          width="60"
          class="fab-animated position-fixed elevation-4"
          style="bottom: 24px; right: 24px; z-index: 100;"
        />
      </template>
    </AddUdhariTransactionDialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="confirmDelete" max-width="400" persistent>
      <v-card class="pa-2">
        <v-card-title class="text-h6">Delete Person?</v-card-title>
        <v-card-text>
          Are you sure you want to delete <strong>{{ person?.name }}</strong>? 
          This will also delete all their transaction records. This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="confirmDelete = false">Cancel</v-btn>
          <v-btn color="error" variant="elevated" @click="handleDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUdhariStore } from '~/stores/udhariStore'

const route = useRoute()
const router = useRouter()
const udhariStore = useUdhariStore()

const id = route.params.id as string
const confirmDelete = ref(false)

const person = computed(() => udhariStore.getPersonById(id))
const transactions = computed(() => udhariStore.getTransactionsByPerson(id))
const summary = computed(() => udhariStore.getPersonSummary(id))

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

function deleteTransaction(transactionId: string) {
  udhariStore.deleteTransaction(transactionId)
}

function handleDelete() {
  udhariStore.deletePerson(id)
  router.push('/udhari')
}
</script>
