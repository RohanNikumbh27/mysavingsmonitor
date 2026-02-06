<template>
  <div>
    <!-- Header Section -->
    <div class="mb-8">
      <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">
        <span class="text-gradient">Install App</span>
      </h1>
      <p class="text-body-1 text-medium-emphasis">
        Install MySavings on your device for quick access
      </p>
    </div>

    <!-- Accordion for Installation Instructions -->
    <v-expansion-panels v-model="openPanel" class="mb-5">
      <!-- Chrome Android (First & Default Open) -->
      <v-expansion-panel value="android" class="install-card rounded-xl mb-3">
        <v-expansion-panel-title class="pa-4">
          <div class="d-flex align-center">
            <v-avatar color="green-lighten-4" size="44" class="mr-3">
              <v-icon color="green">mdi-android</v-icon>
            </v-avatar>
            <span class="text-h6 font-weight-bold">Chrome (Android)</span>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="pa-2">
            <div class="d-flex align-start mb-4">
              <v-avatar color="success" size="28" class="mr-3 mt-1">
                <span class="text-caption font-weight-bold text-white">1</span>
              </v-avatar>
              <div class="text-body-1">
                Tap the <strong>three dots menu</strong> (⋮) in the top-right corner
              </div>
            </div>
            <div class="d-flex align-start mb-4">
              <v-avatar color="success" size="28" class="mr-3 mt-1">
                <span class="text-caption font-weight-bold text-white">2</span>
              </v-avatar>
              <div class="text-body-1">
                Tap <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong>
              </div>
            </div>
            <div class="d-flex align-start">
              <v-avatar color="success" size="28" class="mr-3 mt-1">
                <v-icon size="16">mdi-check</v-icon>
              </v-avatar>
              <div class="text-body-1">
                Tap <strong>"Add"</strong> to confirm
              </div>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Chrome Desktop -->
      <v-expansion-panel value="desktop" class="install-card rounded-xl mb-3">
        <v-expansion-panel-title class="pa-4">
          <div class="d-flex align-center">
            <v-avatar color="blue-lighten-4" size="44" class="mr-3">
              <v-icon color="blue">mdi-google-chrome</v-icon>
            </v-avatar>
            <span class="text-h6 font-weight-bold">Chrome (Desktop)</span>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="pa-2">
            <div class="d-flex align-start mb-4">
              <v-avatar color="primary" size="28" class="mr-3 mt-1">
                <span class="text-caption font-weight-bold text-white">1</span>
              </v-avatar>
              <div class="text-body-1">
                Click the <strong>three dots menu</strong> (⋮) in the top-right corner of Chrome
              </div>
            </div>
            <div class="d-flex align-start mb-4">
              <v-avatar color="primary" size="28" class="mr-3 mt-1">
                <span class="text-caption font-weight-bold text-white">2</span>
              </v-avatar>
              <div class="text-body-1">
                Look for <strong>"Install MySavings..."</strong> or <strong>"Save and Share" → "Install page as app"</strong>
              </div>
            </div>
            <div class="d-flex align-start">
              <v-avatar color="success" size="28" class="mr-3 mt-1">
                <v-icon size="16">mdi-check</v-icon>
              </v-avatar>
              <div class="text-body-1">
                Click <strong>"Install"</strong> in the popup dialog
              </div>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Safari iOS -->
      <v-expansion-panel value="ios" class="install-card rounded-xl">
        <v-expansion-panel-title class="pa-4">
          <div class="d-flex align-center">
            <v-avatar color="blue-grey-lighten-4" size="44" class="mr-3">
              <v-icon color="blue-grey">mdi-apple-safari</v-icon>
            </v-avatar>
            <span class="text-h6 font-weight-bold">Safari (iPhone / iPad)</span>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="pa-2">
            <div class="d-flex align-start mb-4">
              <v-avatar color="info" size="28" class="mr-3 mt-1">
                <span class="text-caption font-weight-bold text-white">1</span>
              </v-avatar>
              <div class="text-body-1">
                Tap the <strong>Share button</strong> (□↑) at the bottom of Safari
              </div>
            </div>
            <div class="d-flex align-start mb-4">
              <v-avatar color="info" size="28" class="mr-3 mt-1">
                <span class="text-caption font-weight-bold text-white">2</span>
              </v-avatar>
              <div class="text-body-1">
                Scroll down and tap <strong>"Add to Home Screen"</strong>
              </div>
            </div>
            <div class="d-flex align-start">
              <v-avatar color="info" size="28" class="mr-3 mt-1">
                <v-icon size="16">mdi-check</v-icon>
              </v-avatar>
              <div class="text-body-1">
                Tap <strong>"Add"</strong> in the top-right corner
              </div>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Benefits Card -->
    <v-card class="install-card rounded-xl" variant="flat">
      <v-card-title class="d-flex align-center pa-4">
        <v-avatar color="amber-lighten-4" size="44" class="mr-3">
          <v-icon color="amber-darken-2">mdi-star</v-icon>
        </v-avatar>
        <span class="text-h6 font-weight-bold">Why Install?</span>
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-4">
        <div class="d-flex ga-3 flex-wrap">
          <v-chip color="primary" variant="tonal" prepend-icon="mdi-rocket-launch">
            Faster Access
          </v-chip>
          <v-chip color="success" variant="tonal" prepend-icon="mdi-fullscreen">
            Full Screen
          </v-chip>
          <v-chip color="info" variant="tonal" prepend-icon="mdi-wifi-off">
            Works Offline
          </v-chip>
          <v-chip color="warning" variant="tonal" prepend-icon="mdi-bell">
            Get Updates
          </v-chip>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Default open panel is Android
const openPanel = ref('android')
</script>

<style scoped>
.install-card {
  border: 1px solid rgba(var(--v-theme-outline), 0.1);
  background: rgba(var(--v-theme-surface-variant), 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.install-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.v-expansion-panel {
  margin-bottom: 0 !important;
}

.v-expansion-panel::before {
  box-shadow: none !important;
}
</style>
