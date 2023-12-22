import { create } from "zustand"


export const usePayedStore = create((set) => {
    return {
        payed: false,
        idOrder: '',
        fetchPayed:  () => set((state) => ({
            payed: !state.payed
        })),
        fetchOrderId: (id) => set((state) => ({
            idOrder: id
        }))
    }
})