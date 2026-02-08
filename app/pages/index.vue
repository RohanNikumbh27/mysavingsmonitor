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
    <div class="d-flex ga-1 mb-4 overflow-x-auto absolute">
      <v-btn
        :variant="activeTab === 'savings' ? 'flat' : 'tonal'"
        :color="activeTab === 'savings' ? 'primary' : undefined"
        prepend-icon="mdi-piggy-bank"
        rounded="pill"
        @click="activeTab = 'savings'"
        class="px-4"
      >
        Savings
      </v-btn>
      <v-btn
        :variant="activeTab === 'udhari' ? 'flat' : 'tonal'"
        :color="activeTab === 'udhari' ? 'primary' : undefined"
        prepend-icon="mdi-account-cash"
        rounded="pill"
        @click="activeTab = 'udhari'"
        class="px-4"
      >
        Udhari
      </v-btn>
      <v-btn
        :variant="activeTab === 'summary' ? 'flat' : 'tonal'"
        :color="activeTab === 'summary' ? 'primary' : undefined"
        prepend-icon="mdi-chart-box-outline"
        rounded="pill"
        @click="activeTab = 'summary'"
        class="px-4"
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
              <div class="d-flex justify-end align-center ga-1">
                <EditSavingsDialog :entry="item">
                  <template #activator="{ props }">
                    <v-btn v-bind="props" icon="mdi-pencil" variant="tonal" size="small" width="55" height="55" class="my-1" background color="medium-emphasis"></v-btn>
                  </template>
                </EditSavingsDialog>
                <DeleteConfirmDialog :entry="item" size="small" width="55" height="55" class="my-1" />
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-tabs-window-item>

      <!-- Udhari Tab -->
      <v-tabs-window-item value="udhari">
        <div class="d-flex align-center justify-space-between mb-4">
          <h2 class="text-h5 font-weight-bold">Recent Udhari</h2>
          <AddPersonDialog>
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                variant="flat"
                color="primary"
                prepend-icon="mdi-account-plus"
              >
                Add Person
              </v-btn>
            </template>
          </AddPersonDialog>
        </div>

        <!-- Total Outstanding Card -->
        <v-card
          v-if="udhariStore.sortedPeople.length > 0"
          class="mb-6 pa-4 savings-card"
          variant="tonal"
        >
          <div class="d-flex flex-wrap justify-space-between align-center ga-4">
            <div class="d-flex align-center">
              <v-icon color="primary" class="mr-2">mdi-account-group</v-icon>
              <span class="text-body-1">
                <strong>{{ udhariStore.sortedPeople.length }}</strong> 
                {{ udhariStore.sortedPeople.length === 1 ? 'person' : 'people' }}
              </span>
            </div>
            <div class="d-flex align-center">
              <v-icon :color="udhariStore.totalOutstanding >= 0 ? 'success' : 'error'" class="mr-2">
                mdi-cash
              </v-icon>
              <span class="text-h6 font-weight-bold" :class="udhariStore.totalOutstanding >= 0 ? 'text-success' : 'text-error'">
                ₹{{ Math.abs(udhariStore.totalOutstanding).toLocaleString('en-IN') }}
              </span>
              <span class="text-body-2 text-medium-emphasis ml-1">
                {{ udhariStore.totalOutstanding >= 0 ? 'to receive' : 'to pay' }}
              </span>
            </div>
          </div>
        </v-card>

        <!-- Empty State -->
        <v-card 
          v-if="udhariStore.sortedPeople.length === 0" 
          class="pa-8 text-center savings-card d-flex flex-column justify-center align-center"
          variant="flat"
          style="min-height: 50vh;"
        >
          <v-icon size="80" color="primary" class="mb-4 opacity-60">mdi-account-cash-outline</v-icon>
          <h3 class="text-h6 font-weight-medium mb-2">No udhari records yet</h3>
          <p class="text-body-2 text-medium-emphasis mb-4">
            Start tracking money you lend to people
          </p>
          <AddPersonDialog>
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                color="primary"
                variant="elevated"
                prepend-icon="mdi-account-plus"
              >
                Add Your First Person
              </v-btn>
            </template>
          </AddPersonDialog>
        </v-card>

        <!-- People List -->
        <v-card v-else variant="flat" class="border rounded-lg overflow-hidden">
          <v-list lines="two" class="pa-0">
            <template v-for="(person, index) in udhariStore.sortedPeople" :key="person.id">
              <v-list-item 
                class="py-3 hover-bg-surface-variant transition-colors cursor-pointer"
                :to="`/udhari/${person.id}`"
              >
                <template #prepend>
                  <v-avatar color="primary" variant="tonal" class="mr-4 rounded-lg">
                    <span class="text-h6 font-weight-bold">{{ person.name.charAt(0).toUpperCase() }}</span>
                  </v-avatar>
                </template>

                <v-list-item-title class="font-weight-bold text-body-1 mb-1">
                  {{ person.name }}
                </v-list-item-title>
                
                <v-list-item-subtitle class="d-flex align-center">
                  <span v-if="person.phone" class="mr-3">{{ person.phone }}</span>
                  <span v-else class="text-medium-emphasis">No phone</span>
                </v-list-item-subtitle>

                <template #append>
                  <div class="d-flex align-center">
                    <div class="text-right mr-2">
                      <div 
                        class="text-h6 font-weight-bold"
                        :class="getBalance(person.id) >= 0 ? 'text-success' : 'text-error'"
                      >
                        ₹{{ Math.abs(getBalance(person.id)).toLocaleString('en-IN') }}
                      </div>
                      <div class="text-caption text-medium-emphasis">
                        {{ getBalance(person.id) >= 0 ? 'to receive' : 'to pay' }}
                      </div>
                    </div>
                    <v-icon color="medium-emphasis">mdi-chevron-right</v-icon>
                  </div>
                </template>
              </v-list-item>
              <v-divider v-if="index < udhariStore.sortedPeople.length - 1" />
            </template>
          </v-list>
        </v-card>
      </v-tabs-window-item>

      <!-- Summary Tab -->
      <v-tabs-window-item value="summary">
        <h2 class="text-h5 font-weight-bold mb-4">Savings Summary</h2>
        <SavingsStats />
        
        <div class="my-6">
          <v-divider></v-divider>
        </div>
        
        <h2 class="text-h5 font-weight-bold mb-4">Udhari Summary</h2>
        <UdhariStats />
      </v-tabs-window-item>
    </v-tabs-window>

    <!-- FAB for adding new savings (only visible in savings tab) -->
    <AddSavingsDialog v-if="savingsStore.totalEntries > 0 && activeTab === 'savings'">
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
    </AddSavingsDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSavingsStore } from '~/stores/savingsStore'
import { useUdhariStore } from '~/stores/udhariStore'

const route = useRoute()
const router = useRouter()
const savingsStore = useSavingsStore()
const udhariStore = useUdhariStore()
const activeTab = ref('savings')

// Sync tab with URL query
onMounted(() => {
  if (route.query.tab) {
    activeTab.value = route.query.tab as string
  }
})

// Watch for changes in activeTab to update URL
watch(activeTab, (newTab) => {
  router.replace({ query: { ...route.query, tab: newTab } })
})

// Watch for changes in URL to update activeTab
watch(() => route.query.tab, (newTab) => {
  if (newTab) {
    activeTab.value = newTab as string
  }
})

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

function getBalance(personId: string) {
  return udhariStore.getBalanceByPerson(personId)
}
</script>
