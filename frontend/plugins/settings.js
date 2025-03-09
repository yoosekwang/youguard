// plugins/settings.js
import { useHead, useRoute } from '#imports'
import { useSettingsStore } from '../stores/settings'

export default defineNuxtPlugin(async (nuxtApp) => {
  const settingsStore = useSettingsStore()
  await settingsStore.fetchSettings()

  const route = useRoute()
  const path = route.path?.toLocaleLowerCase();

  if (path === '/' || path === '/signin' || path === "/signup" || path === "/forgot-password") {
    useHead({
      style: [
        {
          innerHTML: `
            .primary-btn { 
              background-color: ${settingsStore.settings?.buttonColor} !important; 
              color: ${settingsStore.settings?.buttonTextColor} !important; 
            }
            .hero {
              background: url('${settingsStore.settings?.homeBanner}') !important;
              background-repeat: no-repeat !important;
              background-position: 50% !important;
            }
            .icon-color{
              color: ${settingsStore.settings?.primaryColor} !important; 
            }
            .primary-color{
              color: ${settingsStore.settings?.primaryColor} !important; 
            }
            .custom-input:focus {
              outline: none; 
              box-shadow: 0 0 0 1px ${settingsStore.settings?.primaryColor} !important; 
              border: 1px solid ${settingsStore.settings?.primaryColor} !important; 
            }
          `
        }
      ]
    })
  }

})
