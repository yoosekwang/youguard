<template>
    <div>
        <section class="bg-white">
            <div class="grid grid-cols-1 lg:grid-cols-2">

                <div
                    class="relative hidden md:flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
                    <div class="absolute inset-0">
                        <img v-if="settingsStore.settings?.loginBanner" class="object-cover w-full h-screen"
                            :src="settingsStore.settings?.loginBanner"
                            alt="" />
                        <img v-else class="object-cover w-full h-screen"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/4/girl-working-on-laptop.jpg"
                            alt="" />
                    </div>
                    <div class="z-20">
                        <div class="flex z-20 items-center">
                            <img v-if="settingsStore.settings?.logo" :src="settingsStore.settings?.logo" alt="" width="250">
                            <div v-else>
                                <Icon icon="material-symbols:water-drop-outline-rounded" width="4em" height="4em"
                                class="text-blue-600" />
                                <span class="text-6xl font-medium uppercase text-white font-bold"> <span
                                    class="text-blue-700">You</span>Guard</span>
                            </div>
                            
                        </div>
                    </div>
                    <div class="absolute h-screen inset-0 bg-gradient-to-t from-black to-transparent"></div>
                </div>

                <div class="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                    <div class="xl:w-full xl:max-w-sm w-full xl:mx-auto">
                        <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl">{{$t("login_sign_in")}}</h2>
                        <p class="mt-2 text-base text-gray-600">{{$t("login_dont_have_an_account")}}
                            
                            
                            <NuxtLink href="/signup" title=""
                                class="primary-color font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">
                            <span class="ml-1">{{$t("login_register")}}</span>    
                            </NuxtLink>
                        </p>

                        <form action="#" method="POST" class="mt-8">
                            <div class="space-y-5">

                                <div>
                                    <label for="" class="text-base font-medium text-gray-900">{{$t("login_email_address")}}</label>
                                    <div class="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                        <div
                                            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </div>

                                        <input type="text" name="" id="email" :placeholder="$t('login_enter_email_to_get_started')"
                                            class="custom-input block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            v-model="email" />
                                    </div>
                                </div>

                                <div>
                                    <label for="" class="text-base font-medium text-gray-900">{{$t("login_password")}}  </label>
                                    <div class="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                        <div
                                            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                            </svg>
                                        </div>

                                        <input :type="showPassword ? 'text' : 'password'" name="" id="pass"
                                            :placeholder="$t('login_enter_your_password')"
                                            class="custom-input block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            v-model="password" />
                                        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                                            <button type="button" @click="togglePasswordVisibility"
                                                class="focus:outline-none">
                                                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg"
                                                    width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                                    <path fill="currentColor" fill-rule="evenodd"
                                                        d="M12 17.8c4.034 0 7.686-2.25 9.648-5.8C19.686 8.45 16.034 6.2 12 6.2S4.314 8.45 2.352 12c1.962 3.55 5.614 5.8 9.648 5.8M12 5c4.808 0 8.972 2.848 11 7c-2.028 4.152-6.192 7-11 7s-8.972-2.848-11-7c2.028-4.152 6.192-7 11-7m0 9.8a2.8 2.8 0 1 0 0-5.6a2.8 2.8 0 0 0 0 5.6m0 1.2a4 4 0 1 1 0-8a4 4 0 0 1 0 8" />
                                                </svg>

                                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="1.5em"
                                                    height="1.5em" viewBox="0 0 24 24">
                                                    <path fill="currentColor" fill-rule="evenodd"
                                                        d="m18.67 16.973l2.755 2.755l-.849.848L3.85 3.85L4.697 3l2.855 2.855C8.932 5.303 10.432 5 12 5c4.808 0 8.972 2.848 11 7a12.65 12.65 0 0 1-4.33 4.973M8.486 6.79l1.664 1.664a4 4 0 0 1 5.398 5.398l2.255 2.255c1.574-1 2.904-2.403 3.845-4.106C19.686 8.45 16.034 6.2 12 6.2a10.8 10.8 0 0 0-3.514.59m6.152 6.152a2.8 2.8 0 0 0-3.579-3.579zm1.81 5.204c-1.38.552-2.88.855-4.448.855c-4.808 0-8.972-2.848-11-7a12.65 12.65 0 0 1 4.33-4.973l.867.867A11.36 11.36 0 0 0 2.352 12c1.962 3.55 5.614 5.8 9.648 5.8a10.8 10.8 0 0 0 3.514-.59l.934.935zM8.453 10.15l.909.91a2.8 2.8 0 0 0 3.579 3.579l.91.908a4 4 0 0 1-5.398-5.398z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <button type="button"
                                        class="primary-btn inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80"
                                        @click="login">
                                        <span v-if="isLoading" class="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em"
                                                viewBox="0 0 24 24">
                                                <circle cx="18" cy="12" r="0" fill="#fff">
                                                    <animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s"
                                                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                                        repeatCount="indefinite" values="0;2;0;0" />
                                                </circle>
                                                <circle cx="12" cy="12" r="0" fill="#fff">
                                                    <animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s"
                                                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                                        repeatCount="indefinite" values="0;2;0;0" />
                                                </circle>
                                                <circle cx="6" cy="12" r="0" fill="#fff">
                                                    <animate attributeName="r" begin="0" calcMode="spline" dur="1.5s"
                                                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                                        repeatCount="indefinite" values="0;2;0;0" />
                                                </circle>
                                            </svg>
                                        </span>
                                        <span v-else>{{$t("login_sign_in")}}</span>
                                    </button>

                                    <p class="mt-2 text-base text-gray-600">
                                        <NuxtLink href="/forgot-password" title=""
                                            class="primary-color font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">
                                            {{$t("login_forgot_password")}}
                                        </NuxtLink>
                                    </p>
                                </div>
                            </div>
                        </form>



                        <!-- <p class="mt-5 text-sm text-gray-600">
                            This site is protected by reCAPTCHA and the Google <a href="#" title=""
                                class="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700">Privacy
                                Policy</a> &
                            <a href="#" title=""
                                class="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700">Terms
                                of Service</a>
                        </p> -->
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script setup>
import { useSettingsStore } from '~/stores/settings'
const settingsStore = useSettingsStore()
</script>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import { Icon } from "@iconify/vue";

definePageMeta({
    middleware: 'guest'
})
export default {
    components: {
        Icon
    },
    data() {
        return {
            email: '',
            password: '',
            isLoading: false,
            showPassword: false
        }
    },
    created() {
        console.log("From new Gihub Actions");
    },
    methods: {
        async login() {
            try {
                this.isLoading = true;
                const response = await axios.post(`${useRuntimeConfig().public.apiBase}/api/user/login`, {
                    usernameOrEmail: this.email,
                    password: this.password
                });

                localStorage.setItem("accessToken", response.data.token);
                localStorage.setItem("role", response.data.userRole);

                navigateTo("/dashboard");
                toast.success("Login successful")
                console.log(response.data)
                this.isLoading = false;
            } catch (error) {
                toast.error(error.response.data.message||"Login failed")
                console.error(error)
                this.isLoading = false;
            }
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        }
    }
}
</script>

<style></style>
