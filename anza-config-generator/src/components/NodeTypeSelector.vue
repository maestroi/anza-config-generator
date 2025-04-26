<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6 w-full">
    <h2 class="text-xl font-semibold mb-4">Select Node Type</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        class="border rounded-lg p-4 cursor-pointer transition-all"
        :class="{ 
          'border-blue-500 bg-blue-50': nodeType === 'validator',
          'border-gray-300 hover:border-blue-300': nodeType !== 'validator'
        }"
        @click="selectNodeType('validator')"
      >
        <div class="flex items-center mb-2">
          <div class="w-5 h-5 rounded-full border border-blue-500 mr-2 flex items-center justify-center">
            <div v-if="nodeType === 'validator'" class="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
          <h3 class="font-medium">Validator Node</h3>
        </div>
        <p class="text-sm text-gray-600 mb-2">
          Run a validator node that participates in consensus and helps secure the Solana network.
        </p>
        <div v-if="nodeType === 'validator'" class="text-xs text-blue-600 mt-2 bg-blue-50 p-2 rounded">
          <p class="font-semibold">Validator Node Settings:</p>
          <ul class="list-disc list-inside mt-1">
            <li>Private RPC service enabled</li>
            <li>Dynamic port range required (8000-8020)</li>
            <li>WAL recovery mode set to "skip_any_corrupted_record"</li>
            <li>Vote account required</li>
          </ul>
        </div>
      </div>
      
      <div 
        class="border rounded-lg p-4 cursor-pointer transition-all"
        :class="{ 
          'border-blue-500 bg-blue-50': nodeType === 'rpc',
          'border-gray-300 hover:border-blue-300': nodeType !== 'rpc'
        }"
        @click="selectNodeType('rpc')"
      >
        <div class="flex items-center mb-2">
          <div class="w-5 h-5 rounded-full border border-blue-500 mr-2 flex items-center justify-center">
            <div v-if="nodeType === 'rpc'" class="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
          <h3 class="font-medium">RPC Node</h3>
        </div>
        <p class="text-sm text-gray-600 mb-2">
          Run an RPC node that serves blockchain data but does not participate in consensus.
        </p>
        <div v-if="nodeType === 'rpc'" class="text-xs text-blue-600 mt-2 bg-blue-50 p-2 rounded">
          <p class="font-semibold">RPC Node Settings:</p>
          <ul class="list-disc list-inside mt-1">
            <li>Public RPC service enabled</li>
            <li>No vote account needed</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useConfigStore } from '../stores/configStore';

const configStore = useConfigStore();
const nodeType = ref<'validator' | 'rpc'>(configStore.nodeConfig.type);

function selectNodeType(type: 'validator' | 'rpc') {
  nodeType.value = type;
  configStore.setNodeType(type);
}

// Initialize from store
watch(() => configStore.nodeConfig.type, (newType) => {
  nodeType.value = newType;
});
</script> 