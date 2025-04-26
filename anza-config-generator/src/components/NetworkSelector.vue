<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6 w-full">
    <h2 class="text-xl font-semibold mb-4">Select Network</h2>
    
    <div class="flex flex-wrap mb-6">
      <div v-for="(network, key) in networks" :key="key" class="mr-4 mb-4">
        <button
          @click="setNetwork(key as SolanaNetwork)"
          class="px-6 py-3 rounded-md shadow-sm text-sm font-medium transition-colors"
          :class="selectedNetwork === key 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'"
        >
          {{ network.name }}
        </button>
      </div>
    </div>
    
    <div v-if="selectedNetwork !== 'custom'" class="bg-gray-50 p-4 rounded-lg mb-4">
      <h3 class="font-medium text-gray-800 mb-2">{{ networks[selectedNetwork].name }} Network Configuration:</h3>
      <p class="text-xs text-gray-500 mb-4">The following settings will be automatically applied.</p>
      
      <div class="grid grid-cols-1 gap-3">
        <div>
          <h4 class="text-sm font-semibold">Entrypoints:</h4>
          <div class="text-xs bg-gray-100 p-2 rounded mt-1 font-mono">
            <ul class="list-disc list-inside">
              <li v-for="(entrypoint, index) in networks[selectedNetwork].entrypoints" :key="index" class="mb-1 break-all">
                {{ entrypoint }}
              </li>
            </ul>
          </div>
        </div>
        
        <div>
          <h4 class="text-sm font-semibold">Genesis Hash:</h4>
          <div class="text-xs bg-gray-100 p-2 rounded mt-1 font-mono">
            {{ networks[selectedNetwork].genesisHash }}
          </div>
        </div>
        
        <div v-if="networks[selectedNetwork].knownValidators.length > 0">
          <h4 class="text-sm font-semibold">Known Validators:</h4>
          <div class="text-xs bg-gray-100 p-2 rounded mt-1 font-mono max-h-24 overflow-y-auto">
            <code class="block">{{ networks[selectedNetwork].knownValidators.join('\n') }}</code>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Custom entrypoint input when custom is selected -->
    <div v-if="selectedNetwork === 'custom'" class="mt-6">
      <h3 class="font-medium mb-2 text-left">Custom Entrypoint:</h3>
      <div class="mb-4">
        <input
          type="text"
          v-model="customEntrypoint"
          @input="updateCustomEntrypoint"
          placeholder="Enter custom entrypoint (e.g., example.com:8001)"
          class="w-full p-2 border rounded"
        />
      </div>
      <p class="text-xs text-gray-500 text-left">
        Format: hostname:port
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useConfigStore, SOLANA_NETWORKS, SolanaNetwork } from '../stores/configStore';

const configStore = useConfigStore();
const networks = SOLANA_NETWORKS;
const selectedNetwork = ref<SolanaNetwork>(configStore.nodeConfig.network);
const customEntrypoint = ref('');

// Initialize from store
watch(() => configStore.nodeConfig.network, (newNetwork) => {
  selectedNetwork.value = newNetwork;
});

function setNetwork(network: SolanaNetwork) {
  selectedNetwork.value = network;
  configStore.setNetwork(network);
  
  if (network === 'custom' && customEntrypoint.value) {
    configStore.updateOption('entrypoint', customEntrypoint.value);
  }
}

function updateCustomEntrypoint(event: Event) {
  const target = event.target as HTMLInputElement;
  customEntrypoint.value = target.value;
  
  if (selectedNetwork.value === 'custom') {
    configStore.updateOption('entrypoint', customEntrypoint.value);
  }
}
</script> 