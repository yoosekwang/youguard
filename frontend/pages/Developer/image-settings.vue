<!-- pages/admin/software.vue -->
<template>
    <NuxtLayout name="developerdashboard">
        <div class="min-h-screen bg-gray-50 py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-2xl font-semibold text-gray-900">Image Management</h1>
                    <p class="mt-1 text-sm text-gray-500">Manage Images of site</p>
                </div>

                <!-- Home page Banner -->
                <div class="grid lg:grid-cols-3 gap-8 mb-5">
                    <!-- Upload New Version -->
                    <div class="lg:col-span-2">
                        <div class="bg-white rounded-lg shadow p-6">
                            <h2 class="text-lg font-medium text-gray-900 mb-4">Homepage Banner</h2>

                            <div class="space-y-6">

                                <!-- File Upload -->
                                <div class="space-y-2">
                                  
                                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
                                        @click="triggerHomeFileInput" @dragover.prevent @drop.prevent="handleFileDrop" id="homebannerdrop">
                                        <div v-if="!homeBanner" class="space-y-2">
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
                                            <p class="text-sm text-gray-900 font-medium">{{ homeBanner?.name }}</p>
                                            <button @click.stop="removeFile" id="homebannerremove"
                                                class="text-xs text-red-600 hover:text-red-800">
                                                Remove file
                                            </button>
                                        </div>
                                    </div>
                                    <input ref="homeFileInput" type="file" class="hidden" id="homebanner" @change="handleFileSelect"
                                        accept=".jpg,.jpeg,.png" />
                                </div>

                                <!-- Upload Button -->
                                <div class="flex justify-end">
                                    <button @click="() => uploadFile('homebanner')"
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
                    <!-- Homepage banner Preview -->
                    <div class="bg-white h-full rounded-lg shadow p-6">
                        <div class="flex items-start justify-between mb-4">
                            <h2 class="text-lg font-medium text-gray-900">Current Image</h2>
                        </div>
                        <div class="space-y-4">
                            <img :src="form.homeBanner" alt="" style="max-height: 180px;">
                        </div>
                    </div>
                </div>

                 <!-- Login page Banner -->
                 <div class="grid lg:grid-cols-3 gap-8 mb-5">
                    <!-- Upload New Version -->
                    <div class="lg:col-span-2">
                        <div class="bg-white rounded-lg shadow p-6">
                            <h2 class="text-lg font-medium text-gray-900 mb-4">Login Page Banner</h2>

                            <div class="space-y-6">

                                <!-- File Upload -->
                                <div class="space-y-2">
                                  
                                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
                                        @click="triggerLoginFileInput" @dragover.prevent @drop.prevent="handleFileDrop" id="loginbannerdrop">
                                        <div v-if="!loginBanner" class="space-y-2">
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
                                            <p class="text-sm text-gray-900 font-medium">{{ loginBanner?.name }}</p>
                                            <button @click.stop="removeFile" id="loginbannerremove"
                                                class="text-xs text-red-600 hover:text-red-800">
                                                Remove file
                                            </button>
                                        </div>
                                    </div>
                                    <input ref="loginFileInput" type="file" class="hidden" id="loginbanner" @change="handleFileSelect"
                                        accept=".jpg,.jpeg,.png" />
                                </div>

                                <!-- Upload Button -->
                                <div class="flex justify-end">
                                    <button @click="() => uploadFile('loginbanner')"
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
                    <!-- Homepage banner Preview -->
                    <div class="bg-white h-full rounded-lg shadow p-6">
                        <div class="flex items-start justify-between mb-4">
                            <h2 class="text-lg font-medium text-gray-900">Current Image</h2>
                        </div>
                        <div class="space-y-4">
                            <img :src="form.loginBanner" alt="" style="max-height: 180px;">
                        </div>
                    </div>
                </div>

                 <!-- Registration page Banner -->
                 <div class="grid lg:grid-cols-3 gap-8 mb-5">
                    <!-- Upload New Version -->
                    <div class="lg:col-span-2">
                        <div class="bg-white rounded-lg shadow p-6">
                            <h2 class="text-lg font-medium text-gray-900 mb-4">Registration Page Banner</h2>

                            <div class="space-y-6">

                                <!-- File Upload -->
                                <div class="space-y-2">
                                  
                                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
                                        @click="triggerRegistrationFileInput" @dragover.prevent @drop.prevent="handleFileDrop" id="registrationbannerdrop">
                                        <div v-if="!registrationBanner" class="space-y-2">
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
                                            <p class="text-sm text-gray-900 font-medium">{{ registrationBanner?.name }}</p>
                                            <button @click.stop="removeFile" id="registrationbannerremove"
                                                class="text-xs text-red-600 hover:text-red-800">
                                                Remove file
                                            </button>
                                        </div>
                                    </div>
                                    <input ref="registrationFileInput" type="file" class="hidden" id="registrationbanner" @change="handleFileSelect"
                                        accept=".jpg,.jpeg,.png" />
                                </div>

                                <!-- Upload Button -->
                                <div class="flex justify-end">
                                    <button @click="() => uploadFile('registrationbanner')"
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
                    <!-- Homepage banner Preview -->
                    <div class="bg-white h-full rounded-lg shadow p-6">
                        <div class="flex items-start justify-between mb-4">
                            <h2 class="text-lg font-medium text-gray-900">Current Image</h2>
                        </div>
                        <div class="space-y-4">
                            <img :src="form.registrationBanner" alt="" style="max-height: 180px;">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </NuxtLayout>
</template>




<script>
import axios from 'axios';

export default {
    data() {
        return {
            isUpdating: false,
            homeBanner: null,
            loginBanner: null,
            registrationBanner: null,
            form: {
                title: '',
                metaDescription: '',
                logo: '',
                loginBanner: '',
                registrationBanner: '',
                homeBanner: '',
                primaryColor: '',
                buttonColor: '',
            }
        };
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
        triggerHomeFileInput() {
            this.$refs.homeFileInput.click();
        },
        triggerLoginFileInput() {
            this.$refs.loginFileInput.click();
        },
        triggerRegistrationFileInput() {
            this.$refs.registrationFileInput.click();
        },
        handleFileSelect(event) {
            const id = event.target.id;
            if(id == "homebanner"){
                this.homeBanner = event.target.files[0];
            }else if(id == "loginbanner"){
                this.loginBanner = event.target.files[0];
            }else if(id == "registrationbanner"){
                this.registrationBanner = event.target.files[0];
            }
        },
        handleFileDrop(event) {
            const id = event.target.id;
            if(id == "homebannerdrop"){
                this.homeBanner = event.dataTransfer.files[0];
            }else if(id == "loginbannerdrop"){
                this.loginBanner = event.dataTransfer.files[0];
            }else if(id == "registrationbannerdrop"){
                this.registrationBanner = event.dataTransfer.files[0];
            }
        },
        removeFile(event) {
            const id = event.target.id;
            if(id == "homebannerremove"){
                this.homeBanner = null;
            }else if(id == "loginbannerremove"){
                this.loginBanner = null;
            }else if(id == "registrationbannerremove"){
                this.registrationBanner = null;
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
        async uploadFile(type) {
          
            const token = localStorage.getItem('accessToken');
            if (!token) {
                return alert('Please login to view versions');
            }
            try {

                const formData = new FormData();
                if(type == "homebanner"){
                    formData.set('file', this.homeBanner);
                }else if(type == "loginbanner"){
                    formData.set('file', this.loginBanner);
                }else if(type == "registrationbanner"){
                    formData.set('file', this.registrationBanner);
                }else{
                    return alert('Someting wrong!');
                }
                

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
            
                if(type == "homebanner"){
                    this.form.homeBanner = response.data.fileUrl;
                }else if(type == "loginbanner"){
                    this.form.loginBanner = response.data.fileUrl;
                }else if(type == "registrationbanner"){
                    this.form.registrationBanner = response.data.fileUrl;
                }
                
                this.updateSettings();

            } catch (error) {
                console.error('Error fetching versions:', error);
            } finally {
                this.isUpdatingLogo = false;
            }
        },
    },
    mounted() {
        this.fetchSettings();
    },
};
</script>
