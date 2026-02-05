<template>
  <v-dialog v-model="dialog" :width="$vuetify.display.mobile ? '90%' : '400'" max-width="400" scrim="error">
    <template v-slot:activator="{ props }">
      <slot name="activator" :props="props" />
    </template>
    
    <v-card class="rounded-xl" prepend-icon="mdi-delete-outline" title="Delete Saving">
      <template v-slot:text>
        <div class="pa-3 px-5 text-center">
          <v-icon size="64" color="error" class="mb-4 opacity-70">mdi-delete-alert</v-icon>
          <h3 class="text-h6 font-weight-medium mb-2">
            Delete "{{ entry.title }}"?
          </h3>
          <p class="text-body-2 text-medium-emphasis mb-2">
            This will remove this saving of 
            <strong class="text-on-surface">₹{{ entry.savedAmount.toLocaleString('en-IN') }}</strong>
            from your records.
          </p>
          <p class="text-caption text-error">
            This action cannot be undone.
          </p>
        </div>
      </template>

      <v-card-actions class="px-5 pb-5 ga-3">
        <v-btn
          variant="tonal"
          color="black"
          class="flex-grow-1"
          text="Cancel"
          @click="dialog = false"
        />
        <v-btn
          variant="elevated"
          color="error"
          class="flex-grow-1"
          text="Delete"
          @click="handleDelete"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSavingsStore, type SavingsEntry } from '~/stores/savingsStore'

const props = defineProps<{
  entry: SavingsEntry
}>()

const savingsStore = useSavingsStore()
const dialog = ref(false)

function handleDelete() {
  savingsStore.deleteEntry(props.entry.id)
  dialog.value = false
}
</script>
