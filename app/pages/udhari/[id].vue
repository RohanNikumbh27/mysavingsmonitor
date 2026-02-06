
<template>
  <div>
    <!-- Header -->
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <v-btn
          variant="text"
          color="medium-emphasis"
          prepend-icon="mdi-arrow-left"
          to="/udhari"
          class="pl-0 mb-1"
          density="compact"
        >
          Back
        </v-btn>
        <h1 class="text-h5 font-weight-bold">
          {{ person?.name || 'Loading...' }}
        </h1>
        <p v-if="person?.phone" class="text-caption text-medium-emphasis">
          {{ person.phone }}
        </p>
      </div>

      <!-- Delete Button with inline dialog -->
      <v-btn color="error" variant="tonal" size="small">
        <v-icon size="18">mdi-delete</v-icon>
        <v-dialog activator="parent" max-width="400" scrim="error">
          <template #default="{ isActive }">
            <v-card class="rounded-xl bg-surface" prepend-icon="mdi-delete-outline" title="Delete Person">
              <template #text>
                <p class="text-center py-2">
                  Delete <strong>{{ person?.name }}</strong> and all their transactions?
                </p>
              </template>
              <v-card-actions class="px-5 pb-4 ga-3">
                <v-btn variant="tonal" class="flex-grow-1" @click="isActive.value = false">Cancel</v-btn>
                <v-btn variant="flat" color="error" class="flex-grow-1" @click="handleDelete(isActive)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>
    </div>

    <!-- Balance Summary - Modern Design -->
    <div v-if="person" class="summary-grid mb-5">
      <div class="summary-item summary-give">
        <div class="summary-icon">
          <v-icon size="32" color="error">mdi-arrow-up-circle</v-icon>
        </div>
        <div class="summary-content">
          <div class="summary-label">You Will Give</div>
          <div class="summary-amount text-error">₹{{ summary.totalGave.toLocaleString('en-IN') }}</div>
        </div>
      </div>
      <div class="summary-item summary-get">
        <div class="summary-icon">
          <v-icon size="32" color="success">mdi-arrow-down-circle</v-icon>
        </div>
        <div class="summary-content">
          <div class="summary-label">You Will Get</div>
          <div class="summary-amount text-success">₹{{ summary.totalReceived.toLocaleString('en-IN') }}</div>
        </div>
      </div>
    </div>

    <!-- Two-column action buttons -->
    <div class="d-flex ga-4 mb-5">
      <!-- GAVE Button with inline dialog -->
      <v-btn color="error" variant="flat" height="80" class="action-btn gave-btn flex-grow-1 rounded-xl">
        <div class="d-flex flex-column align-center">
          <v-icon size="24">mdi-arrow-top-right</v-icon>
          <span class="text-caption font-weight-bold mt-1">YOU GAVE</span>
        </div>
        <v-dialog activator="parent" max-width="400" scrim="error">
          <template #default="{ isActive }">
            <v-card class="rounded-xl bg-surface">
              <v-card-title class="text-center pt-4 pb-2">
                <v-chip color="error" variant="flat" class="font-weight-bold">YOU GAVE ₹</v-chip>
              </v-card-title>
              <v-card-text class="px-5">
                <v-text-field
                  v-model.number="gaveForm.amount"
                  type="number"
                  label="Amount"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-currency-inr"
                  class="mb-2"
                  autofocus
                />
                <v-text-field
                  v-model="gaveForm.description"
                  label="Note (optional)"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-note-text"
                />
              </v-card-text>
              <v-card-actions class="px-5 pb-4 ga-3">
                <v-btn variant="tonal" class="flex-grow-1" @click="isActive.value = false">Cancel</v-btn>
                <v-btn 
                  variant="flat" 
                  color="error" 
                  class="flex-grow-1"
                  :disabled="!gaveForm.amount || gaveForm.amount <= 0"
                  @click="saveGave(isActive)"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>

      <!-- GOT Button with inline dialog -->
      <v-btn color="success" variant="flat" height="80" class="action-btn got-btn flex-grow-1 rounded-xl">
        <div class="d-flex flex-column align-center">
          <v-icon size="24">mdi-arrow-bottom-left</v-icon>
          <span class="text-caption font-weight-bold mt-1">YOU GOT</span>
        </div>
        <v-dialog activator="parent" max-width="400" scrim="success">
          <template #default="{ isActive }">
            <v-card class="rounded-xl bg-surface">
              <v-card-title class="text-center pt-4 pb-2">
                <v-chip color="success" variant="flat" class="font-weight-bold">YOU GOT ₹</v-chip>
              </v-card-title>
              <v-card-text class="px-5">
                <v-text-field
                  v-model.number="gotForm.amount"
                  type="number"
                  label="Amount"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-currency-inr"
                  class="mb-2"
                  autofocus
                />
                <v-text-field
                  v-model="gotForm.description"
                  label="Note (optional)"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-note-text"
                />
              </v-card-text>
              <v-card-actions class="px-5 pb-4 ga-3">
                <v-btn variant="tonal" class="flex-grow-1" @click="isActive.value = false">Cancel</v-btn>
                <v-btn 
                  variant="flat" 
                  color="success" 
                  class="flex-grow-1"
                  :disabled="!gotForm.amount || gotForm.amount <= 0"
                  @click="saveGot(isActive)"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>
    </div>

    <!-- Transaction List -->
    <div class="transactions-container">
      <!-- Empty state -->
      <v-card v-if="transactions.length === 0" variant="flat" class="pa-8 text-center rounded-xl">
        <v-icon size="48" color="medium-emphasis" class="mb-3">mdi-cash-clock</v-icon>
        <p class="text-body-2 text-medium-emphasis">No transactions yet</p>
      </v-card>

      <!-- Transaction cards - EXACT copy of SavingsCard design -->
      <div 
        v-for="tx in transactions" 
        :key="tx.id"
        class="tx-wrapper"
        :class="tx.type === 'gave' ? 'justify-end' : 'justify-start'"
      >
        <v-card 
          class="tx-card hover-lift rounded-xl"
          :class="tx.type === 'gave' ? 'tx-border-red' : 'tx-border-green'"
          variant="flat"
        >
          <div class="d-flex align-center pa-4 py-5">
            <!-- Left: Colored Avatar with icon -->
            <v-avatar 
              :class="tx.type === 'gave' ? 'avatar-red' : 'avatar-green'" 
              size="52" 
              class="mr-4"
            >
              <v-icon :color="tx.type === 'gave' ? 'error' : 'success'" size="26">
                {{ tx.type === 'gave' ? 'mdi-arrow-top-right' : 'mdi-arrow-bottom-left' }}
              </v-icon>
            </v-avatar>

            <!-- Middle: Title + Date + Chip -->
            <div class="flex-grow-1">
              <h3 class="text-subtitle-1 font-weight-bold">
                {{ tx.description || (tx.type === 'gave' ? 'Money Given' : 'Money Received') }}
              </h3>
              <div class="text-body-2 text-medium-emphasis mt-1">{{ formatDate(tx.date) }}</div>
              <v-chip 
                size="small" 
                :color="tx.type === 'gave' ? 'error' : 'success'" 
                variant="tonal"
                class="mt-2"
              >
                {{ tx.type === 'gave' ? 'Gave' : 'Got' }} ₹{{ tx.amount.toLocaleString('en-IN') }}
              </v-chip>
            </div>

            <!-- Right: Delete button only -->
            <v-btn icon variant="tonal" color="error" size="44" class="ml-4">
              <v-icon>mdi-delete</v-icon>
              <v-dialog activator="parent" max-width="400" scrim="error">
                <template #default="{ isActive }">
                  <v-card class="rounded-xl bg-surface" prepend-icon="mdi-delete-outline" title="Delete Transaction">
                    <template #text>
                      <p class="text-center py-2">
                        Delete this <strong>₹{{ tx.amount.toLocaleString('en-IN') }}</strong> transaction?
                      </p>
                    </template>
                    <v-card-actions class="px-5 pb-4 ga-3">
                      <v-btn variant="tonal" class="flex-grow-1" @click="isActive.value = false">Cancel</v-btn>
                      <v-btn variant="flat" color="error" class="flex-grow-1" @click="confirmDeleteTx(tx.id, isActive)">Delete</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-btn>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUdhariStore } from '~/stores/udhariStore'

const route = useRoute()
const router = useRouter()
const udhariStore = useUdhariStore()

const id = route.params.id as string

const person = computed(() => udhariStore.getPersonById(id))
const transactions = computed(() => udhariStore.getTransactionsByPerson(id))
const summary = computed(() => udhariStore.getPersonSummary(id))

// Form state for gave/got dialogs
const gaveForm = reactive({ amount: null as number | null, description: '' })
const gotForm = reactive({ amount: null as number | null, description: '' })

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function saveGave(isActive: { value: boolean }) {
  if (gaveForm.amount && gaveForm.amount > 0) {
    udhariStore.addTransaction({
      personId: id,
      type: 'gave',
      amount: gaveForm.amount,
      description: gaveForm.description,
      date: new Date().toISOString(),
    })
    gaveForm.amount = null
    gaveForm.description = ''
    isActive.value = false
  }
}

function saveGot(isActive: { value: boolean }) {
  if (gotForm.amount && gotForm.amount > 0) {
    udhariStore.addTransaction({
      personId: id,
      type: 'received',
      amount: gotForm.amount,
      description: gotForm.description,
      date: new Date().toISOString(),
    })
    gotForm.amount = null
    gotForm.description = ''
    isActive.value = false
  }
}

function deleteTransaction(transactionId: string) {
  udhariStore.deleteTransaction(transactionId)
}

function confirmDeleteTx(transactionId: string, isActive: { value: boolean }) {
  udhariStore.deleteTransaction(transactionId)
  isActive.value = false
}

function handleDelete(isActive: { value: boolean }) {
  udhariStore.deletePerson(id)
  isActive.value = false
  router.push('/udhari')
}
</script>

<style scoped>
/* Transactions container */
.transactions-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 20px;
}

/* Transaction wrapper for alignment */
.tx-wrapper {
  display: flex;
  width: 100%;
}

.tx-wrapper.justify-start {
  justify-content: flex-start;
}

.tx-wrapper.justify-end {
  justify-content: flex-end;
}

/* Transaction card */
.tx-card {
  background: rgba(var(--v-theme-surface-variant), 0.5);
  border: 1px solid rgba(var(--v-theme-outline), 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  max-width: 85%;
}

.tx-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

/* Colored borders for light mode visibility */
.tx-border-red {
  border: 2px solid rgba(239, 68, 68, 0.1);
}

.tx-border-green {
  border: 2px solid rgba(34, 197, 94, 0.1);
}

/* Avatar backgrounds with 40% opacity */
.avatar-red {
  background-color: rgba(239, 68, 68, 0.4) !important;
}

.avatar-green {
  background-color: rgba(34, 197, 94, 0.4) !important;
}

/* Modern action buttons */
.action-btn {
  transition: all 0.3s ease;
  text-transform: none !important;
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2) !important;
}

.gave-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
}

.got-btn {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%) !important;
}

/* Summary Grid - Modern Design */
.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.summary-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.summary-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.summary-give {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.summary-get {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.05) 100%);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.summary-icon {
  margin-right: 16px;
}

.summary-label {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.7;
  margin-bottom: 4px;
}

.summary-amount {
  font-size: 24px;
  font-weight: 700;
}
</style>
