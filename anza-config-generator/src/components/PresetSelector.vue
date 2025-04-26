<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 class="text-xl font-semibold mb-4">Configuration Presets</h2>
    <p class="text-gray-600 mb-4">Select a preset to quickly configure your node with recommended settings.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div 
        v-for="preset in configStore.presets" 
        :key="preset.name"
        class="border rounded-lg p-4 cursor-pointer hover:border-blue-300 transition-all"
        @click="applyPreset(preset.name)"
      >
        <h3 class="font-medium mb-2">{{ preset.name }}</h3>
        <p class="text-sm text-gray-600 mb-3">{{ preset.description }}</p>
        <button 
          class="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
        >
          Apply Preset
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '../stores/configStore';

const configStore = useConfigStore();

function applyPreset(presetName: string) {
  configStore.applyPreset(presetName);
}
</script> 