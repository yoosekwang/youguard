<!-- pages/index.vue -->
<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <!-- Navigation -->
        <nav class="bg-white/70 backdrop-blur-md border-b border-gray-100">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <img v-if="settingsStore.settings?.logo" :src="settingsStore.settings?.logo" alt="" width="150">
                        <div v-else>
                            <Icon icon="material-symbols:water-drop-outline-rounded" width="1.5em" height="1.5em"
                            class="text-blue-600" />
                            <span class="text-xl font-medium uppercase font-bold"> <span
                                    class="text-blue-700">You</span>Guard</span>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <NuxtLink to="/signin"
                            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium">
                            {{ $t("home_login") }}
                        </NuxtLink>
                        <NuxtLink to="/signup"
                            class="primary-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            {{ $t("home_register") }}
                        </NuxtLink>

                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <!-- Announcement Box (if any) -->
            <!-- <div v-if="announcement"
                class="mb-12 bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100">
                <div class="flex items-start space-x-3">
                    <Icon name="mdi:bullhorn" class="h-5 w-5 text-blue-500 mt-0.5" />
                    <p class="text-gray-600">{{ announcement }}</p>
                </div>
            </div> -->

            <!-- Main Content -->
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">
                        {{ $t('home_secure_your_content_with_advanced_watermarking') }} 
                    </h1>
                    <p class="text-lg text-gray-600 mb-8">
                        {{ $t('home_protect_your_digital_assets_with_our_state_of_the_art_mobile_watermarking_solution_simple_secure_and_reliable') }}
                    </p>
                    <div v-if="isLoggedIn" class="space-y-4">
                        <div v-if="isApproved" class="flex items-center">
                            <button
                                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                                @click="downloadSoftware">
                                <Icon name="mdi:download" class="h-5 w-5" />
                                <span>Download Software</span>
                            </button>
                            <span class="ml-4 text-sm text-gray-500">Version {{ currentVersion }}</span>
                        </div>
                        <div v-else class="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <p class="text-amber-700">
                                Your account is pending approval. We'll notify you once approved.
                            </p>
                        </div>
                    </div>
                    <div v-else class="flex items-center space-x-4">
                        <NuxtLink to="/signup"
                            class="primary-btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                            {{ $t("home_get_started") }}
                        </NuxtLink>
                    </div>
                </div>
                <div class="relative">
                    <!-- Container with Background Image -->
                    <div
                        class="hero aspect-square rounded-2xl shadow-lg bg-white flex items-center justify-center bg-[url('@/assets/img/hero.png')] bg-cover bg-center">
                        <Icon name="mdi:cellphone" class="h-32 w-32 text-blue-500" />
                    </div>

                    <!-- Feature Tags -->
                    <div
                        class="absolute -bottom-6 left-12 bg-white rounded-full px-4 py-2 shadow-md border border-gray-100">
                        <div class="flex items-center space-x-2">
                            <Icon name="mdi:shield-check" />
                            <Icon icon="tdesign:secured" class="h-4 w-4 text-green-500" />
                            <span class="text-sm font-medium">{{$t("home_secure")}}</span>
                        </div>
                    </div>

                    <div
                        class="absolute -right-4 top-1/3 bg-white rounded-full px-4 py-2 shadow-md border border-gray-100">
                        <div class="flex items-center space-x-2">
                            <Icon icon="prime:mobile" class="h-4 w-4 text-blue-500" />
                            <span class="text-sm font-medium">{{$t("home_mobile_only")}}</span>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Features Section -->
            <div class="mt-24 grid md:grid-cols-3 gap-8">
                <div class="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100">

                    <Icon icon="oi:shield" class="icon-color h-8 w-8 text-blue-500 mb-4" />
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{$t("home_secure_protection")}}</h3>
                    <p class="text-gray-600">{{$t("home_advanced_watermarking_technology_to_protect_your_digital_content")}}</p>
                </div>
                <div class="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100">
                    <Icon icon="material-symbols:update-rounded" class="icon-color h-8 w-8 text-blue-500 mb-4" />
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{$t("home_regular_updates")}}</h3>
                    <p class="text-gray-600">{{$t("home_stay_current_with_our_latest_security_features_and_improvements")}}</p>
                </div>
                <div class="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100">
                    <Icon icon="fluent:person-support-24-regular" class="icon-color h-8 w-8 text-blue-500 mb-4" />
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{$t("home_direct_support")}}</h3>
                    <p class="text-gray-600">{{$t("home_direct_messaging_with_our_support_team_for_assistance")}}</p>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useSettingsStore } from '~/stores/settings'
const settingsStore = useSettingsStore()
const announcement = ref('New version 2.1.0 is now available with enhanced security features!');
const currentVersion = ref('2.1.0');
const isLoggedIn = ref(false);
const isApproved = ref(false);

const downloadSoftware = () => {
    // Implement download logic
    console.log('Downloading software...');
};

</script>


<style scoped>
.hero {
    background: url('@/assets/img/hero.png');
    background-size: cover;
    background-position: center;
}
</style>
