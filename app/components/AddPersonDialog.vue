<template>
  <v-dialog v-model="dialog" :width="$vuetify.display.mobile ? '90%' : '500'" persistent>
    <template #activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps" />
    </template>

    <v-card class="pa-2 rounded-xl">
      <v-card-title class="text-h6 d-flex align-center pa-4">
        <v-icon color="primary" class="mr-2">mdi-account-plus</v-icon>
        Add Person
      </v-card-title>

      <v-card-text class="px-4">
        <v-form ref="form" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="formData.name"
            label="Name"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            :rules="[rules.required]"
            class="mb-3"
            autofocus
            rounded="xl"
          />

          <v-text-field
            v-model="formData.phone"
            label="Phone Number (Optional)"
            prepend-inner-icon="mdi-phone"
            variant="outlined"
            type="tel"
            rounded="xl"
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-4 pt-0 d-flex ga-3">
        <v-btn 
          variant="tonal" 
          class="flex-grow-1" 
          height="57" 
          rounded="xl"
          @click="handleClose"
        >
          Cancel
        </v-btn>
        <v-btn 
          color="primary" 
          variant="elevated" 
          class="flex-grow-1" 
          height="57" 
          rounded="xl"
          @click="handleSubmit" 
          :loading="loading"
        >
          Add Person
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUdhariStore } from '~/stores/udhariStore'

const udhariStore = useUdhariStore()

const dialog = ref(false)
const loading = ref(false)
const form = ref()

const formData = reactive({
  name: '',
  phone: '',
})

const rules = {
  required: (v: string) => !!v || 'Name is required',
}

function handleClose() {
  dialog.value = false
  resetForm()
}

function resetForm() {
  formData.name = ''
  formData.phone = ''
  form.value?.reset()
}

async function handleSubmit() {
  const { valid } = await form.value?.validate()
  if (!valid) return

  loading.value = true
  
  try {
    udhariStore.addPerson({
      name: formData.name,
      phone: formData.phone || undefined,
    })
    handleClose()
  } finally {
    loading.value = false
  }
}
</script>
