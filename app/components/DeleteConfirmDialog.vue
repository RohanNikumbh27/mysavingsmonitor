<template>
  <v-btn v-bind="$attrs" variant="tonal" icon="mdi-delete" color="error">
    <v-icon>mdi-delete</v-icon>
    <v-dialog activator="parent" :width="$vuetify.display.mobile ? '90%' : '400'" max-width="400" scrim="error">
      <template v-slot:default="{ isActive }">
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
              color="gray-lighten-4"
              class="flex-grow-1"
              text="Cancel"
              @click="isActive.value = false"
            />
            <v-btn
              variant="elevated"
              color="error"
              class="flex-grow-1"
              text="Delete"
              @click="handleDelete(isActive)"
            />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-btn>
</template>

<script setup lang="ts">
import { useSavingsStore, type SavingsEntry } from '~/stores/savingsStore'

const props = defineProps<{
  entry: SavingsEntry
}>()

const savingsStore = useSavingsStore()

function handleDelete(isActive: { value: boolean }) {
  savingsStore.deleteEntry(props.entry.id)
  isActive.value = false
}
</script>
