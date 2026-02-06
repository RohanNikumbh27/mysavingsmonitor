import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface UdhariPerson {
    id: string
    name: string
    phone?: string
    createdAt: string
}

export interface UdhariTransaction {
    id: string
    personId: string
    type: 'gave' | 'received'  // gave = user gave money, received = user got payment back
    amount: number
    description: string
    date: string
    createdAt: string
}

export const useUdhariStore = defineStore('udhari', () => {
    // State
    const people = ref<UdhariPerson[]>([])
    const transactions = ref<UdhariTransaction[]>([])

    // Getters
    const sortedPeople = computed(() => {
        return [...people.value].sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    })

    const totalOutstanding = computed(() => {
        return people.value.reduce((sum, person) => {
            return sum + getBalanceByPerson(person.id)
        }, 0)
    })

    // Get balance for a specific person (positive = they owe you, negative = you owe them)
    function getBalanceByPerson(personId: string): number {
        return transactions.value
            .filter(t => t.personId === personId)
            .reduce((balance, t) => {
                if (t.type === 'gave') {
                    return balance + t.amount  // They owe you more
                } else {
                    return balance - t.amount  // They paid back
                }
            }, 0)
    }

    // Get transactions for a specific person, sorted by date
    function getTransactionsByPerson(personId: string) {
        return transactions.value
            .filter(t => t.personId === personId)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    // Get person by ID
    function getPersonById(id: string) {
        return people.value.find(p => p.id === id)
    }

    // Get total gave and received for a person
    function getPersonSummary(personId: string) {
        const personTransactions = transactions.value.filter(t => t.personId === personId)
        const totalGave = personTransactions
            .filter(t => t.type === 'gave')
            .reduce((sum, t) => sum + t.amount, 0)
        const totalReceived = personTransactions
            .filter(t => t.type === 'received')
            .reduce((sum, t) => sum + t.amount, 0)
        
        return {
            totalGave,
            totalReceived,
            balance: totalGave - totalReceived
        }
    }

    // Actions
    function addPerson(data: { name: string; phone?: string }) {
        const newPerson: UdhariPerson = {
            id: generateId(),
            name: data.name,
            phone: data.phone,
            createdAt: new Date().toISOString(),
        }
        people.value.push(newPerson)
        return newPerson
    }

    function updatePerson(id: string, updates: { name?: string; phone?: string }) {
        const index = people.value.findIndex(p => p.id === id)
        if (index === -1) return

        people.value[index] = {
            ...people.value[index],
            ...updates,
        }
    }

    function deletePerson(id: string) {
        // Delete all transactions for this person first
        transactions.value = transactions.value.filter(t => t.personId !== id)
        // Then delete the person
        const index = people.value.findIndex(p => p.id === id)
        if (index !== -1) {
            people.value.splice(index, 1)
        }
    }

    function addTransaction(data: {
        personId: string
        type: 'gave' | 'received'
        amount: number
        description: string
        date: string
    }) {
        const newTransaction: UdhariTransaction = {
            id: generateId(),
            personId: data.personId,
            type: data.type,
            amount: data.amount,
            description: data.description,
            date: data.date,
            createdAt: new Date().toISOString(),
        }
        transactions.value.push(newTransaction)
        return newTransaction
    }

    function deleteTransaction(id: string) {
        const index = transactions.value.findIndex(t => t.id === id)
        if (index !== -1) {
            transactions.value.splice(index, 1)
        }
    }

    // Utility
    function generateId() {
        return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    }

    return {
        // State
        people,
        transactions,

        // Getters
        sortedPeople,
        totalOutstanding,

        // Methods
        getBalanceByPerson,
        getTransactionsByPerson,
        getPersonById,
        getPersonSummary,

        // Actions
        addPerson,
        updatePerson,
        deletePerson,
        addTransaction,
        deleteTransaction,
    }
}, {
    persist: {
        key: 'mysavings-udhari',
        storage: typeof window !== 'undefined' ? localStorage : undefined,
    },
} as any)
