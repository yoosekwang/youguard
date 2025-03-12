<!-- pages/admin/logs.vue -->
<template>
    <NuxtLayout name="admindashboard">
        <div class="log-container">
            <h2 class="title">📜 System Logs</h2>

            <!-- Log Controls -->
                <div class="controls">
                <input v-model="searchQuery" placeholder="🔍 Search logs..." class="search-input" />
                <button @click="exportLogs" class="export-btn">📥 Export CSV</button>
            </div>

            <!-- Log Display Table -->
            <div class="log-table">
            <table>
                <thead>
                <tr>
                    <th>📅 Date</th>
                    <th>⚠️ Level</th>
                    <th>📝 Message</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(log, index) in filteredLogs" :key="index">
                    <td>{{ formatDate(log.timestamp) }}</td>
                    <td :class="logClass(log.level)">{{ log.level.toUpperCase() }}</td>
                    <td>
                        {{ log.message }}
                        <vue-json-viewer :value="log.message"></vue-json-viewer>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </NuxtLayout>

</template>

<script>
import moment from "moment";
import VueJsonViewer from "vue3-json-viewer"; // ✅ Import Vue 3 JSON Viewer
import "vue3-json-viewer/dist/index.css"; // ✅ Import default styles
import axios from 'axios';
export default {
  components: { VueJsonViewer }, // ✅ Register it here
  data() {
    return {
      logs: [],
      searchQuery: "",
    };
  },
  async mounted() {
    await this.fetchLogs();
  },
  computed: {
    filteredLogs() {
      return this.logs.filter((log) =>
        log.message.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchLogs() {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("Access token is missing");
            return;
        }
        const response = await axios.get(`${useRuntimeConfig().public.apiBase}/api/logs`,{ headers: { Authorization: `Bearer ${token}` } });
        response.data.logs.pop();
        this.logs = response.data.logs.map((log) => {
          const [timestamp, level, ...messageParts] = log.split(" ");
          return {
            timestamp,
            level: level.replace("[", "").replace("]:", ""),
            message: messageParts.join(" "),
          };
        });
        this.logs.reverse()
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    },
    formatDate(date) {
      return moment(date, "YYYY-MM-DD HH:mm:ss").format("MMM DD, YYYY - HH:mm");
    },
    logClass(level) {
      return {
        "log-info": level === "info",
        "log-warn": level === "warn",
        "log-error": level === "error",
      };
    },
    exportLogs() {
      const csvContent = "data:text/csv;charset=utf-8," + this.logs.map(log => `${log.timestamp},${log.level},${log.message}`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "system_logs.csv");
      document.body.appendChild(link);
      link.click();
    },
  },
};
</script>
<style scoped>
.log-container {
  max-width: 1300px;
  margin: auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.search-input {
  padding: 8px;
  width: 70%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.export-btn {
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.export-btn:hover {
  background: #0056b3;
}

.log-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background: #f4f4f4;
}

.log-info { color: #007bff; font-weight: bold; }
.log-warn { color: #ffa500; font-weight: bold; }
.log-error { color: #ff0000; font-weight: bold; }
</style>