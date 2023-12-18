import { defineStore } from 'pinia';

export const useCardsStore = defineStore('cards', {
    state: () => ({
		debitCards: []
	}),
});