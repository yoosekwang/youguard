// stores/settings.js
import { defineStore } from 'pinia'
import { useFetch } from 'nuxt/app'


export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: null,
  }),
  actions: {
    async fetchSettings() {
      const { data } = await useFetch(`${useRuntimeConfig().public.apiBase}/api/kv-settings`) // Adjust API endpoint
      this.settings = data.value.data
    },
  },
})
