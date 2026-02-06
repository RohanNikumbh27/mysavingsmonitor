<template>
  <div>
    <!-- Header Section -->
    <div class="mb-6">
      <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">
        <span class="text-gradient">Install App</span>
      </h1>
      <p class="text-body-1 text-medium-emphasis">
        Install MySavings on your device for quick access
      </p>
    </div>

    <!-- Chrome Desktop -->
    <v-card class="mb-4 savings-card" variant="flat">
      <v-card-title class="d-flex align-center">
        <v-icon color="primary" class="mr-2">mdi-google-chrome</v-icon>
        Chrome (Desktop)
      </v-card-title>
      <v-card-text>
        <v-timeline side="end" density="compact" class="ml-n4">
          <v-timeline-item dot-color="primary" size="small">
            <div class="text-body-2">
              Click the <strong>three dots menu</strong> (⋮) in the top-right corner of Chrome
            </div>
          </v-timeline-item>
          <v-timeline-item dot-color="primary" size="small">
            <div class="text-body-2">
              Look for <strong>"Install MySavings..."</strong> or <strong>"Save and Share" → "Install page as app"</strong>
            </div>
          </v-timeline-item>
          <v-timeline-item dot-color="success" size="small">
            <div class="text-body-2">
              Click <strong>"Install"</strong> in the popup dialog
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>

    <!-- Chrome Android -->
    <v-card class="mb-4 savings-card" variant="flat">
      <v-card-title class="d-flex align-center">
        <v-icon color="success" class="mr-2">mdi-android</v-icon>
        Chrome (Android)
      </v-card-title>
      <v-card-text>
        <v-timeline side="end" density="compact" class="ml-n4">
          <v-timeline-item dot-color="success" size="small">
            <div class="text-body-2">
              Tap the <strong>three dots menu</strong> (⋮) in the top-right corner
            </div>
          </v-timeline-item>
          <v-timeline-item dot-color="success" size="small">
            <div class="text-body-2">
              Tap <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong>
            </div>
          </v-timeline-item>
          <v-timeline-item dot-color="success" size="small">
            <div class="text-body-2">
              Tap <strong>"Add"</strong> to confirm
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>

    <!-- Safari iOS -->
    <v-card class="mb-4 savings-card" variant="flat">
      <v-card-title class="d-flex align-center">
        <v-icon color="info" class="mr-2">mdi-apple-safari</v-icon>
        Safari (iPhone / iPad)
      </v-card-title>
      <v-card-text>
        <v-timeline side="end" density="compact" class="ml-n4">
          <v-timeline-item dot-color="info" size="small">
            <div class="text-body-2">
              Tap the <strong>Share button</strong> (□↑) at the bottom of Safari
            </div>
          </v-timeline-item>
          <v-timeline-item dot-color="info" size="small">
            <div class="text-body-2">
              Scroll down and tap <strong>"Add to Home Screen"</strong>
            </div>
          </v-timeline-item>
          <v-timeline-item dot-color="info" size="small">
            <div class="text-body-2">
              Tap <strong>"Add"</strong> in the top-right corner
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>

    <!-- Benefits Card -->
    <v-card class="savings-card" variant="flat">
      <v-card-title class="d-flex align-center">
        <v-icon color="warning" class="mr-2">mdi-star</v-icon>
        Why Install?
      </v-card-title>
      <v-card-text>
        <v-list density="compact" class="bg-transparent pa-0">
          <v-list-item prepend-icon="mdi-rocket-launch" class="px-0">
            <v-list-item-title>Faster access from your home screen</v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-fullscreen" class="px-0">
            <v-list-item-title>Full-screen experience without browser UI</v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-wifi-off" class="px-0">
            <v-list-item-title>Works offline once installed</v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-bell" class="px-0">
            <v-list-item-title>Receives future update notifications</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
// Static page - no script needed
</script>
