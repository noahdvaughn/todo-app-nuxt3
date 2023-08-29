import { defineStore } from 'pinia'

export const useOpenedStore = defineStore({
    id: 'opened',
    state: () => ({
        viewingOpen: false
    }),
    actions: {
        setViewingOpen(boolean: boolean){
            this.viewingOpen = boolean
        }
    }
})