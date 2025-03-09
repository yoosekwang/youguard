<!-- pages/admin/software.vue -->
<template>
    <NuxtLayout name="developerdashboard">
        <div class="min-h-screen bg-gray-50 py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-2xl font-semibold text-gray-900">Design Management</h1>
                    <p class="mt-1 text-sm text-gray-500">Manage software design and configuration</p>
                </div>

                <div class="grid lg:grid-cols-3 gap-8">
                    <!-- Upload New Version -->
                    <div class="lg:col-span-2">
                        <div class="bg-white rounded-lg shadow p-6">
                            <h2 class="text-lg font-medium text-gray-900 mb-4">Update Design</h2>

                            <div class="space-y-6">
                                <!-- Version Info -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input v-model="form.title" type="text" placeholder=""
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>

                                <!-- Release Notes -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">
                                        Meta Description
                                    </label>
                                    <textarea v-model="form.metaDescription" rows="4"
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder=""></textarea>
                                </div>


                                <div>
                                    <label class="block text-sm font-medium text-gray-700">
                                        Primary Color
                                    </label>
                                    <input type="color" v-model="form.primaryColor"
                                        class="w-full h-10 cursor-pointer p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700">
                                        Button Color
                                    </label>
                                    <input type="color" v-model="form.buttonColor"
                                        class="w-full h-10 cursor-pointer p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700">
                                        Button Text Color
                                    </label>
                                    <input type="color" v-model="form.buttonTextColor"
                                        class="w-full h-10 cursor-pointer p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>

                                <!-- Upload Button -->
                                <div class="flex justify-end">
                                    <button @click="updateSettings"
                                        class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                                        :disabled="isUpdating">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em"
                                            viewBox="0 0 1024 1024">
                                            <path fill="currentColor"
                                                d="M544 864V672h128L512 480L352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.81 239.81 0 0 1 512 192a239.87 239.87 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6z" />
                                        </svg>
                                        <span>Update</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Current Logo -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-start justify-between mb-4">
                            <h2 class="text-lg font-medium text-gray-900">Current Logo</h2>

                        </div>
                        <div class="space-y-4">
                            <img :src="form.logo" alt="">
                        </div>

                        <!-- File Upload -->
                        <div class="space-y-2 mt-10">
                            <label class="block text-sm font-medium text-gray-700">
                                Change Logo
                            </label>
                            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
                                @click="triggerFileInput" @dragover.prevent @drop.prevent="handleFileDrop">
                                <div v-if="!logo" class="space-y-2">
                                    <Icon name="mdi:cloud-upload" class="h-10 w-10 text-gray-400 mx-auto" />
                                    <div class="text-sm text-gray-600">
                                        <span class="text-blue-500 font-medium">Click to upload</span> or drag
                                        and drop
                                    </div>
                                    <p class="text-xs text-gray-500">
                                        JPG, JPEG, PNG and WEB Files are Allowed
                                    </p>
                                </div>
                                <div v-else class="space-y-2">
                                    <Icon name="mdi:file-check" class="h-10 w-10 text-green-500 mx-auto" />
                                    <p class="text-sm text-gray-900 font-medium">{{ logo?.name }}</p>
                                    <button @click.stop="removeFile" class="text-xs text-red-600 hover:text-red-800">
                                        Remove file
                                    </button>
                                </div>
                            </div>
                            <input ref="fileInput" type="file" class="hidden" @change="handleFileSelect"
                                accept=".jpg,.jpeg,.png" />
                        </div>

                        <!-- Upload Button -->
                        <div class="flex justify-end mt-3">
                            <button @click="updateLogo"
                                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                                :disabled="isUpdatingLogo">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em"
                                    viewBox="0 0 1024 1024">
                                    <path fill="currentColor"
                                        d="M544 864V672h128L512 480L352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.81 239.81 0 0 1 512 192a239.87 239.87 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6z" />
                                </svg>
                                <span>Update</span>
                            </button>
                        </div>


                    </div>
                </div>


            </div>
        </div>
    </NuxtLayout>
</template>




<script>
import axios from 'axios';
definePageMeta({
    middleware: 'auth'
})
export default {
    data() {
        return {
            isUpdatingLogo: false,
            isUpdating: false,
            logo: null,
            form: {
                title: '',
                metaDescription: '',
                logo: '',
                primaryColor: '',
                buttonColor: '',
                buttonTextColor: '',
            },
        };
    },
    computed: {

    },
    methods: {
        async fetchSettings() {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                return alert('Please login to view versions');
            }
            try {
                const response = await axios.get(
                    `${useRuntimeConfig().public.apiBase}/api/kv-settings`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.data.data;
                this.form = { ...data };
                console.log(data);
            } catch (error) {
                console.error('Error fetching versions:', error);
            }
        },
        async updateSettings() {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                return alert('Please login to view versions');
            }
            try {
                this.isUpdating = true;
                const response = await axios.post(
                    `${useRuntimeConfig().public.apiBase}/api/settings/update`,
                    JSON.stringify(this.form),
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
                console.error('Error fetching versions:', error);
            } finally {
                this.isUpdating = false;
            }
        },
        async updateLogo() {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                return alert('Please login to view versions');
            }
            try {

                const formData = new FormData();
                formData.set('file', this.logo);

                this.isUpdatingLogo = true;
                const response = await axios.post(
                    `${useRuntimeConfig().public.apiBase}/api/upload`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                console.log(response.data);
                this.form.logo = response.data.fileUrl;
                this.updateSettings();

            } catch (error) {
                console.error('Error fetching versions:', error);
            } finally {
                this.isUpdatingLogo = false;
            }
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileSelect(event) {
            this.logo = event.target.files[0];
            console.log(this.logo);
        },
        handleFileDrop(event) {
            this.logo = event.dataTransfer.files[0];
        },
        removeFile() {
            this.logo = null;
        },
    },
    mounted() {
        this.fetchSettings();
    },
};
</script>
