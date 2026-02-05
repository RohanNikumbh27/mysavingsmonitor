<template>
  <div>
    <slot name="activator" :props="activatorProps" />

    <v-dialog v-model="dialog" :width="$vuetify.display.mobile ? '90%' : '500'" max-width="500">
      <v-card class="rounded-xl" prepend-icon="mdi-plus-circle-outline" title="Add New Saving">
        <v-card-text class="pa-5">
          <v-form ref="formRef" v-model="formValid" @submit.prevent="handleSubmit">
            <!-- Title -->
            <v-text-field
              v-model="form.title"
              label="What did you save on?"
              placeholder="e.g., Homemade lunch, Paneer with coupon"
              prepend-inner-icon="mdi-text"
              :rules="[rules.required]"
              variant="outlined"
              class="mb-3"
            />


            <!-- Original Price -->
            <v-text-field
              v-model.number="form.originalPrice"
              label="Original Price"
              placeholder="What would you normally pay?"
              prepend-inner-icon="mdi-currency-rupee"
              type="number"
              :rules="[rules.required, rules.positive]"
              variant="outlined"
              class="mb-3"
            >
              <template #append-inner>
                <span class="text-caption text-medium-emphasis">₹</span>
              </template>
            </v-text-field>

            <!-- Paid Price -->
            <v-text-field
              v-model.number="form.paidPrice"
              label="Price Paid"
              placeholder="What did you actually pay?"
              prepend-inner-icon="mdi-cash"
              type="number"
              :rules="[rules.required, rules.nonNegative, rules.lessThanOriginal]"
              variant="outlined"
              class="mb-3"
            >
              <template #append-inner>
                <span class="text-caption text-medium-emphasis">₹</span>
              </template>
            </v-text-field>

            <!-- Date -->
            <v-menu
              v-model="dateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="formattedDate"
                  label="Date"
                  prepend-inner-icon="mdi-calendar"
                  :rules="[rules.required]"
                  variant="outlined"
                  readonly
                  v-bind="props"
                  class="mb-1"
                />
              </template>
              <v-date-picker
                v-model="pickerDate"
                color="primary"
                @update:model-value="onDateSelected"
              />
            </v-menu>

            <!-- Saved Amount Preview -->
            <v-alert
              v-if="savedAmount > 0"
              type="success"
              variant="tonal"
              class="mb-0"
              density="compact"
            >
              <div class="d-flex align-center justify-space-between">
                <span class="font-weight-medium">You saved:</span>
                <span class="text-h6 font-weight-bold">₹{{ savedAmount.toLocaleString('en-IN') }}</span>
              </div>
            </v-alert>
          </v-form>
        </v-card-text>

        <v-card-actions class="px-5 pb-5 ga-3">
          <v-btn
            variant="outlined"
            color="primary"
            class="flex-grow-1"
            text="Cancel"
            @click="handleCancel"
          />
          <v-btn
            variant="elevated"
            color="primary"
            class="flex-grow-1"
            text="Add Saving"
            :disabled="!formValid"
            @click="handleSubmit"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useSavingsStore } from '~/stores/savingsStore'

const savingsStore = useSavingsStore()
const dialog = ref(false)
const formRef = ref<any>(null)
const formValid = ref(false)
const dateMenu = ref(false)

const defaultForm = () => ({
  title: '',
  originalPrice: null as number | null,
  paidPrice: null as number | null,
  date: new Date().toISOString().split('T')[0],
})

const form = ref(defaultForm())

// Date picker value (Date object for v-date-picker)
const pickerDate = ref<Date>(new Date())

// Formatted date for display
const formattedDate = computed(() => {
  if (!form.value.date) return ''
  const date = new Date(form.value.date)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
})

function onDateSelected(date: Date) {
  form.value.date = date.toISOString().split('T')[0]
  dateMenu.value = false
}

const rules = {
  required: (v: any) => !!v || v === 0 || 'This field is required',
  positive: (v: number) => v > 0 || 'Must be greater than 0',
  nonNegative: (v: number) => v >= 0 || 'Cannot be negative',
  lessThanOriginal: (v: number) => {
    if (form.value.originalPrice === null) return true
    return v <= form.value.originalPrice || 'Paid price cannot exceed original price'
  },
}

const savedAmount = computed(() => {
  const original = form.value.originalPrice || 0
  const paid = form.value.paidPrice || 0
  return Math.max(0, original - paid)
})

const activatorProps = computed(() => ({
  onClick: () => { dialog.value = true }
}))

watch(dialog, (isOpen) => {
  if (isOpen) {
    form.value = defaultForm()
  }
})

function handleCancel() {
  dialog.value = false
  form.value = defaultForm()
}

function handleSubmit() {
  if (!formValid.value) return
  
  savingsStore.addEntry({
    title: form.value.title,
    description: '',
    originalPrice: form.value.originalPrice || 0,
    paidPrice: form.value.paidPrice || 0,
    date: form.value.date,
  })
  
  dialog.value = false
  form.value = defaultForm()
}
</script>
