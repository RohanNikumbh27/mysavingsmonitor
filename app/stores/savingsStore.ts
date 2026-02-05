import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface SavingsEntry {
    id: string
    title: string
    description: string
    originalPrice: number
    paidPrice: number
    savedAmount: number
    date: string
    createdAt: string
}

export const useSavingsStore = defineStore('savings', () => {
    // State
    const entries = ref<SavingsEntry[]>([])

    // Getters
    const totalSavings = computed(() => {
        return entries.value.reduce((sum, entry) => sum + entry.savedAmount, 0)
    })

    const totalEntries = computed(() => entries.value.length)

    const thisMonthSavings = computed(() => {
        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()

        return entries.value
            .filter(entry => {
                const entryDate = new Date(entry.date)
                return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear
            })
            .reduce((sum, entry) => sum + entry.savedAmount, 0)
    })

    const sortedEntries = computed(() => {
        return [...entries.value].sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    })

    const recentEntries = computed(() => {
        return sortedEntries.value.slice(0, 5)
    })

    const averageSavingsPerEntry = computed(() => {
        if (entries.value.length === 0) return 0
        return totalSavings.value / entries.value.length
    })

    // Actions
    function addEntry(entry: Omit<SavingsEntry, 'id' | 'savedAmount' | 'createdAt'>) {
        const newEntry: SavingsEntry = {
            ...entry,
            id: generateId(),
            savedAmount: entry.originalPrice - entry.paidPrice,
            createdAt: new Date().toISOString(),
        }
        entries.value.push(newEntry)
    }

    function updateEntry(id: string, updates: Partial<Omit<SavingsEntry, 'id' | 'createdAt'>>) {
        const index = entries.value.findIndex(e => e.id === id)
        if (index === -1) return

        const entry = entries.value[index]
        const originalPrice = updates.originalPrice !== undefined ? updates.originalPrice : entry.originalPrice
        const paidPrice = updates.paidPrice !== undefined ? updates.paidPrice : entry.paidPrice

        entries.value[index] = {
            id: entry.id,
            title: updates.title !== undefined ? updates.title : entry.title,
            description: updates.description !== undefined ? updates.description : entry.description,
            originalPrice: originalPrice,
            paidPrice: paidPrice,
            savedAmount: originalPrice - paidPrice,
            date: updates.date !== undefined ? updates.date : entry.date,
            createdAt: entry.createdAt,
        }
    }

    function deleteEntry(id: string) {
        const index = entries.value.findIndex(e => e.id === id)
        if (index !== -1) {
            entries.value.splice(index, 1)
        }
    }

    function getEntryById(id: string) {
        return entries.value.find(e => e.id === id)
    }

    // Utility
    function generateId() {
        return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    }

    return {
        // State
        entries,

        // Getters
        totalSavings,
        totalEntries,
        thisMonthSavings,
        sortedEntries,
        recentEntries,
        averageSavingsPerEntry,

        // Actions
        addEntry,
        updateEntry,
        deleteEntry,
        getEntryById,
    }
}, {
    persist: {
        key: 'mysavings-data',
        storage: typeof window !== 'undefined' ? localStorage : undefined,
    },
} as any)
