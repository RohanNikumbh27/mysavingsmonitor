<template>
  <div>
    <!-- Header Section -->
    <div class="d-flex flex-column flex-md-row align-md-center justify-space-between mb-6">
      <div class="mb-4 mb-md-0">
        <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">
          <span class="text-gradient">Udhari</span>
        </h1>
        <p class="text-body-1 text-medium-emphasis">
          Track money you've lent to people
        </p>
      </div>

      <AddPersonDialog>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            color="primary"
            variant="elevated"
            prepend-icon="mdi-account-plus"
            size="large"
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
      variant="flat"
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
  </div>
</template>

<script setup lang="ts">
import { useUdhariStore } from '~/stores/udhariStore'

const udhariStore = useUdhariStore()

function getBalance(personId: string) {
  return udhariStore.getBalanceByPerson(personId)
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
