import { defineStore } from 'pinia'

export const useRegisteringStore = defineStore({
    id: 'registering',
    state: () => ({
        registering: false
    }),
    actions: {
        setRegistering(boolean: boolean){
            this.registering = boolean
        }
    }
})