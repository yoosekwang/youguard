<!-- pages/admin/software.vue -->
<template>
    <NuxtLayout name="developerdashboard">
        <div class="min-h-screen bg-gray-50 py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="mb-8 flex items-center justify-between">
                    <div class="">
                        <h1 class="text-2xl font-semibold text-gray-900">Text Management</h1>
                        <p class="mt-1 text-sm text-gray-500">Manage texts of frontend from here</p>
                    </div>
                    <div class=" text-gray-400 focus-within:text-gray-600">
                        <select v-model="page" id="region"
                            class="block w-full py-3 px-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600">
                            <option value="home_">Home Page</option>
                            <option value="login_">Login Page</option>
                            <option value="registration_">Registration Page</option>
                            <option value="forgot_password_">Forgot Password Page</option>
                        </select>
                    </div>
                </div>

                <!-- Texts -->
                <div class="mt-8">
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <div class="flex items-center justify-between">
                                <h2 class="text-lg font-medium text-gray-900">Texts</h2>
                                <button @click="updateTranslations"
                                    class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                                    <span>Update All Text</span>
                                </button>
                            </div>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            English
                                        </th>
                                        <!-- <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Korean
                                        </th> -->
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="(key, index) in Object.keys(translations.en)" :key="index">
                                        <td v-if="key.startsWith(page)" class="px-6 py-4 whitespace-nowrap">
                                            <input v-model="translations.en[key]" type="text"
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        </td>
                                        <!-- <td class="px-6 py-4 whitespace-nowrap">
                                            <input v-model="translations.ko[key]" type="text" 
                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        </td> -->
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>




<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
export default {
    data() {
        return {
            page: 'home_',
            translations: {
                en: {},
                ko: {}
            },
            newVersion: {
                version: '',
                description: '',
                name: '',
                file: null,
            },
            currentVersion: {
                version: '',
                releaseDate: new Date(),
                downloads: 1254,
            },
            versionHistory: [],
        };
    },

    methods: {
        async fetchTranslations() {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                return alert('Please login to view versions');
            }
            try {
                const response = await axios.get(
                    `${useRuntimeConfig().public.apiBase}/api/translations`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = response.data;
                this.translations = data;
                console.log(data);
            } catch (error) {
                console.error('Error fetching versions:', error);
            }
        },
        async updateTranslations() {
         
            const token = localStorage.getItem('accessToken');
            if (!token) {
                return alert('Please login to update');
            }

            try {
                const response = await axios.post(
                    `${useRuntimeConfig().public.apiBase}/api/translations/update`,
                    JSON.stringify(this.translations),
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.data.success) {
                    alert('Updated successfully');
                } else {
                    alert(response.data.message || 'Failed to update');
                }
            } catch (error) {
                console.error('Error updating:', error);
                alert(
                    error.response?.data?.message ||
                    'An error occurred while updating. Please try again.'
                );
            }
        },
    },
    mounted() {
        const route = useRoute();
        this.page = route.query.page ?? "home_";
        this.fetchTranslations();
    },
};
</script>
