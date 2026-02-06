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
          icon
          width="60"
          height="50"
          variant="tonal"
          class="mr-2"
          @click="drawer = !drawer"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <div v-if="!$vuetify.display.mobile" class="d-flex align-center ml-2">
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

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      border="none"
      elevation="0"
    >
      <v-divider class="mb-4" />

      <v-list nav density="comfortable" class="px-4 pt-0">
        <v-list-item
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          rounded="xl"
          class="mb-2 pa-5"
          :active="isItemActive(item)"
          color="primary"
          variant="text"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main class="bg-background">
      <v-container fluid class="pa-4 pa-sm-5 pa-md-6">
        <NuxtPage />
      </v-container>
    </v-main>

    <!-- Back to Top Button -->
    <v-fade-transition>
      <v-btn
        v-show="showBackToTop"
        icon
        color="primary"
        size="large"
        class="back-to-top"
        @click="scrollToTop"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fade-transition>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme, useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'

const theme = useTheme()
const display = useDisplay()
const route = useRoute()
const drawer = ref(false)
const showBackToTop = ref(false)

const isDark = computed(() => theme.global.name.value === 'dark')

const navItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
  { title: 'Savings', icon: 'mdi-cash-multiple', to: '/savings' },
  { title: 'Udhari', icon: 'mdi-account-cash', to: '/udhari' },
  { title: 'Install App', icon: 'mdi-download', to: '/install' },
]

function handleScroll() {
  // Show button when scrolled past 80vh
  const scrollThreshold = window.innerHeight * 0.8
  showBackToTop.value = window.scrollY > scrollThreshold
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    theme.global.name.value = savedTheme
  }
  
  // Open drawer by default on desktop, closed on mobile
  drawer.value = !display.mobile.value
  
  // Add scroll listener
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function toggleTheme() {
  const newTheme = isDark.value ? 'light' : 'dark'
  theme.global.name.value = newTheme
  localStorage.setItem('theme', newTheme)
}
function isItemActive(item: any) {
  const currentPath = route.path

  if (item.title === 'Udhari') {
    return currentPath.startsWith('/udhari')
  }

  return currentPath === item.to
}
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
