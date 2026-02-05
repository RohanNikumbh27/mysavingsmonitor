<template>
  <v-app>
    <v-app-bar 
      flat 
      class="px-2 px-md-4"
      :class="{ 'glass-effect': true }"
      elevation="0"
      rounded="0"
    >
      <template v-slot:prepend>
        <v-btn
          v-if="$vuetify.display.mobile"
          icon
          variant="text"
          @click="drawer = !drawer"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <div v-else class="d-flex align-center ml-2">
          <v-icon color="primary" size="28" class="mr-2">mdi-piggy-bank</v-icon>
          <span class="text-h6 font-weight-bold text-gradient">MySavings</span>
        </div>
      </template>

      <!-- Mobile Header Title -->
      <div v-if="$vuetify.display.mobile" class="d-flex align-center">
        <v-icon color="primary" size="24" class="mr-2">mdi-piggy-bank</v-icon>
        <span class="text-subtitle-1 font-weight-bold text-gradient">MySavings</span>
      </div>

      <v-spacer />

      <v-btn
        icon
        variant="tonal"
        color="primary"
        size="small"
        width="60"
        height="50"
        @click="toggleTheme"
      >
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Navigation Drawer for Mobile -->
    <!-- Navigation Drawer for Mobile -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="!$vuetify.display.mobile && rail"
      :permanent="!$vuetify.display.mobile"
      :temporary="$vuetify.display.mobile"
      @click="rail = false"
      border="none"
      elevation="1"
    >
     

      <v-divider class="mb-4" />

      <v-list nav density="comfortable" class="px-4 pt-0">
        <v-list-item
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          rounded="lg"
          class="mb-2"
          :active="$route.path === item.to"
          color="primary"
          variant="text"
        />
      </v-list>

      <template v-slot:append v-if="!$vuetify.display.mobile">
        <div class="pa-2">
          <v-btn
            icon
            variant="text"
            size="small"
            @click.stop="rail = !rail"
          >
            <v-icon>{{ rail ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main class="bg-background">
      <v-container fluid class="pa-4 pa-sm-5 pa-md-6">
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const drawer = ref(false)
const rail = ref(false)

const isDark = computed(() => theme.global.name.value === 'dark')

const navItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
  { title: 'Savings', icon: 'mdi-cash-multiple', to: '/savings' },
]

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}
</script>
