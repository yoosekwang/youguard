<template>
    <main>
        <div class="max-w-8xl mx-auto">
            <!-- Header -->
            <div class="md:flex justify-between items-center mb-6">
                <h1 class="md:text-2xl font-semibold text-gray-900 mb-2 md:mb-0">Developer Management</h1>
               
            </div>

            <!-- Table -->
            <div class="bg-white rounded-lg ">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th v-for="header in headers" :key="header.key"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    @click="sortBy(header.key)">
                                    <div class="flex items-center space-x-1">
                                        <span>{{ header.label }}</span>
                                        <Icon v-if="sortColumn === header.key"
                                            :name="sortDirection === 'asc' ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                                            class="h-4 w-4" />
                                    </div>
                                </th>
                                <th
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="user in filteredDevelopers" :key="user.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="h-10 w-10 flex-shrink-0">
                                            <div
                                                class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span class="text-blue-600 font-medium">
                                                    {{ user.name.charAt(0) }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                                            <div class="text-sm text-gray-500">{{ user.email }}</div>
                                        </div>
                                    </div>
                                </td>
                               
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div class="flex justify-end space-x-3">
                                      
                                        <button @click="openEditModal(user)" class="text-blue-600 hover:text-blue-900">
                                            <Icon icon="mdi:pencil" class="h-5 w-5" />
                                        </button>
                                       
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div v-if="showEditModal"
                    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-white rounded-lg p-6 w-[400px]">
                        <h2 class="text-lg font-bold text-gray-800 mb-4">Edit Developer</h2>
                        
                        <div class="mb-5">
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input v-model="selectedUser.name" type="text"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div class="mb-5">
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input v-model="selectedUser.email" type="text" 
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div class="mb-5">
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Password (optional)
                            </label>
                            <input v-model="selectedUser.password" type="password" placeholder=""
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div class="mb-5">
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password (optional)
                            </label>
                            <input v-model="selectedUser.password_confirmation" type="password" placeholder=""
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div class="flex justify-end space-x-4">
                            <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                @click="closeEditModal">
                                Cancel
                            </button>
                            <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                @click="confirmUpdate">
                                Update
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { toast } from 'vue3-toastify';


const searchQuery = ref('');
const sortColumn = ref('name');
const sortDirection = ref('asc');


const showEditModal = ref(false);
const selectedUser = ref(null);

// Open the delete confirmation modal
const openEditModal = (user) => {
    selectedUser.value = user;
    showEditModal.value = true;
};

// Close the delete modal
const closeEditModal = () => {
    selectedUser.value = null;
    showEditModal.value = false;
};

// Confirm the delete action
const confirmUpdate = async () => {
    if (selectedUser.value) {
        try {
            const password = selectedUser.value.password;
            const password_confirmation = selectedUser.value.password_confirmation;

            if(password || password_confirmation){
                if (!password || !password_confirmation) {
                    toast.error("Both password and password confirmation are required.");
                    return;
                }

                if(password.length < 6){
                    toast.error("Please choose a strong password.");
                    return;
                }

                if (password !== password_confirmation) {
                    toast.error("Passwords do not match.");
                    return;
                }
            }
            const token = localStorage.getItem("accessToken");
            const config = useRuntimeConfig()
            await axios.put(`${config.public.apiBase}/api/developers/${selectedUser.value.id}`, 
            {...selectedUser.value},
            {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success(`Developer ${selectedUser.value.name} updated successfully`);
            // Refresh users list
            fetchDevelopers();
            closeEditModal();
        } catch (error) {
            toast.error("Failed to Update developer");
            console.error("Error updating developer:", error);
        } finally {
            
        }
    }else{
        toast.error("Something wen't wrong!");
    }
};


const headers = [
    { key: 'name', label: 'Name' },
];


const developers = ref([]);

const fetchDevelopers = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const config = useRuntimeConfig()
        const response = await axios.get(`${config.public.apiBase}/api/developers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("All developers:", response.data.developers);

        // Filter and transform the API response to match your requirements
        developers.value = response.data.developers
            .map(developer => ({
                id: developer._id,
                name: developer.name || 'N/A',
                email: developer.email || 'N/A',
                password: '',
                password_confirmation: ''
            }));
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};


onMounted(fetchDevelopers);

// Filter and sort users
const filteredDevelopers = computed(() => {
    let filtered = [...developers.value];

    // Apply search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(developer =>
            developer.name.toLowerCase().includes(query) ||
            developer.email.toLowerCase().includes(query)
        );
    }


    // Apply sorting
    filtered.sort((a, b) => {
        const aValue = a[sortColumn.value];
        const bValue = b[sortColumn.value];

        if (sortDirection.value === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    return filtered;
});


const getStatusClass = (status) => {
    switch (status) {
        case true:
            return 'bg-green-100 text-green-700';
        case false:
            return 'bg-yellow-100 text-yellow-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};

const sortBy = (column) => {
    if (sortColumn.value === column) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn.value = column;
        sortDirection.value = 'asc';
    }
};


const messageUser = (user) => {
   
    console.log('Message user:', user);
};
</script>
