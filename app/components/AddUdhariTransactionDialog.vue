<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <template #activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps" />
    </template>

    <v-card class="pa-2">
      <v-card-title class="text-h6 d-flex align-center">
        <v-icon color="primary" class="mr-2">mdi-cash-plus</v-icon>
        Add Transaction
      </v-card-title>

      <v-card-text>
        <v-form ref="form" @submit.prevent="handleSubmit">
          <!-- Transaction Type Toggle -->
          <v-btn-toggle
            v-model="formData.type"
            mandatory
            color="primary"
            class="mb-4 w-100"
            divided
            variant="outlined"
          >
            <v-btn value="gave" class="flex-grow-1" :color="formData.type === 'gave' ? 'error' : undefined">
              <v-icon start>mdi-arrow-top-right</v-icon>
              I Gave
            </v-btn>
            <v-btn value="received" class="flex-grow-1" :color="formData.type === 'received' ? 'success' : undefined">
              <v-icon start>mdi-arrow-bottom-left</v-icon>
              I Received
            </v-btn>
          </v-btn-toggle>

          <v-text-field
            v-model.number="formData.amount"
            label="Amount"
            prepend-inner-icon="mdi-currency-rupee"
            variant="outlined"
            type="number"
            :rules="[rules.required, rules.positive]"
            class="mb-3"
            autofocus
          />

          <v-text-field
            v-model="formData.description"
            label="Description (Optional)"
            prepend-inner-icon="mdi-text"
            variant="outlined"
            class="mb-3"
          />

          <!-- Date Picker -->
          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
          >
            <template #activator="{ props }">
              <v-text-field
                v-bind="props"
                :model-value="formattedDate"
                label="Date"
                prepend-inner-icon="mdi-calendar"
                variant="outlined"
                readonly
                :rules="[rules.required]"
              />
            </template>
            <v-date-picker
              v-model="formData.date"
              color="primary"
              @update:model-value="dateMenu = false"
            />
          </v-menu>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="handleClose">Cancel</v-btn>
        <v-btn 
          :color="formData.type === 'gave' ? 'error' : 'success'" 
          variant="elevated" 
          @click="handleSubmit" 
          :loading="loading"
        >
          {{ formData.type === 'gave' ? 'Record Gave' : 'Record Received' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useUdhariStore } from '~/stores/udhariStore'

const props = defineProps<{
  personId: string
}>()

const udhariStore = useUdhariStore()

const dialog = ref(false)
const loading = ref(false)
const dateMenu = ref(false)
const form = ref()

const formData = reactive({
  type: 'gave' as 'gave' | 'received',
  amount: null as number | null,
  description: '',
  date: new Date(),
})

const formattedDate = computed(() => {
  if (!formData.date) return ''
  const date = new Date(formData.date)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
})

const rules = {
  required: (v: any) => !!v || 'This field is required',
  positive: (v: number) => (v && v > 0) || 'Amount must be greater than 0',
}

function handleClose() {
  dialog.value = false
  resetForm()
}

function resetForm() {
  formData.type = 'gave'
  formData.amount = null
  formData.description = ''
  formData.date = new Date()
  form.value?.reset()
}

async function handleSubmit() {
  const { valid } = await form.value?.validate()
  if (!valid) return

  loading.value = true
  
  try {
    const dateValue = formData.date instanceof Date ? formData.date : new Date(formData.date)
    const dateStr = dateValue.toISOString().split('T')[0]
      
    udhariStore.addTransaction({
      personId: props.personId,
      type: formData.type,
      amount: formData.amount!,
      description: formData.description,
      date: dateStr,
    })
    handleClose()
  } finally {
    loading.value = false
  }
}
</script>
