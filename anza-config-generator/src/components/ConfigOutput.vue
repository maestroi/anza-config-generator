<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6 w-full">
    <h2 class="text-xl font-semibold mb-4">Generated Configuration</h2>
    
    <div class="mb-4" v-if="!configStore.isValid">
      <div class="bg-red-50 border-l-4 border-red-500 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">
              Please fill in all required fields before generating your configuration.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="w-full">
      <div class="flex mb-4">
        <button 
          @click="activeTab = 'env'"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          :class="activeTab === 'env' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          .env Format
        </button>
        <button 
          @click="activeTab = 'cli'"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          :class="activeTab === 'cli' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          CLI Command
        </button>
      </div>
      
      <div class="bg-gray-100 p-4 rounded w-full">
        <div v-if="activeTab === 'env'" class="relative">
          <pre class="text-sm overflow-x-auto whitespace-pre-wrap w-full">{{ configStore.generateEnvFile }}</pre>
          <button 
            @click="copyToClipboard(configStore.generateEnvFile)"
            class="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white rounded p-2"
            title="Copy to clipboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        
        <div v-else class="relative">
          <pre class="text-sm overflow-x-auto whitespace-pre bg-gray-800 text-green-400 p-4 rounded-md font-mono w-full">{{ configStore.generateCliCommand }}</pre>
          <button 
            @click="copyToClipboard(configStore.generateCliCommand)"
            class="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white rounded p-2"
            title="Copy to clipboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div class="mt-4 flex justify-end space-x-3">
        <button 
          @click="downloadConfig"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Download as .env
        </button>
        <button 
          @click="copyToClipboard(activeTab === 'env' ? configStore.generateEnvFile : configStore.generateCliCommand)"
          class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
        >
          {{ activeTab === 'env' ? 'Copy .env' : 'Copy CLI Command' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useConfigStore } from '../stores/configStore';

const configStore = useConfigStore();
const activeTab = ref<'env' | 'cli'>('env');

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

function downloadConfig() {
  const content = configStore.generateEnvFile;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'solana-validator.env';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
</script> 