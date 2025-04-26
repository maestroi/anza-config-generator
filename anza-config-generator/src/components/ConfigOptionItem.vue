<template>
  <div class="mb-4 p-4 border rounded-lg bg-white">
    <div class="flex items-start justify-between mb-2">
      <div>
        <h3 class="font-medium">{{ option.name }}</h3>
        <p class="text-sm text-gray-600">{{ option.description }}</p>
      </div>
      
      <div v-if="option.required" class="text-xs bg-blue-100 text-blue-800 rounded px-2 py-1">
        Required
      </div>
    </div>
    
    <!-- Toggle input -->
    <div v-if="option.type === 'toggle'" class="mt-3">
      <label class="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          :checked="option.value === true"
          @change="updateToggle"
          class="sr-only peer"
        />
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span class="ms-3 text-sm font-medium text-gray-900">
          {{ option.value ? 'Enabled' : 'Disabled' }}
        </span>
      </label>
    </div>
    
    <!-- Special case for known validators or other multi-line inputs -->
    <div v-else-if="option.type === 'text' && option.id === 'knownValidator'" class="mt-3">
      <textarea
        :value="option.value as string"
        @input="updateText($event)"
        class="w-full p-2 border rounded"
        :class="{ 'border-red-500': option.required && !option.value }"
        :placeholder="'Enter one validator public key per line'"
        rows="4"
      ></textarea>
      <p class="text-xs text-gray-500 mt-1">
        Enter one validator public key per line
      </p>
    </div>
    
    <!-- Special case for account indexes with multiple selections -->
    <div v-else-if="option.type === 'text' && option.id === 'accountIndexes'" class="mt-3">
      <div class="space-y-2">
        <div v-for="opt in option.options" :key="opt.value" class="flex items-center">
          <input
            type="checkbox"
            :id="opt.value"
            :value="opt.value"
            :checked="isIndexSelected(opt.value)"
            @change="toggleAccountIndex(opt.value)"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label :for="opt.value" class="ml-2 text-sm text-gray-700">{{ opt.label }}</label>
        </div>
      </div>
      <p class="text-xs text-gray-500 mt-1">
        Select multiple account indexes if needed
      </p>
    </div>
    
    <!-- Text input -->
    <div v-else-if="option.type === 'text'" class="mt-3">
      <input
        type="text"
        :value="option.value as string"
        @input="updateText($event)"
        class="w-full p-2 border rounded"
        :class="{ 'border-red-500': option.required && !option.value }"
        :placeholder="option.required ? 'Required' : 'Optional'"
      />
    </div>
    
    <!-- Number input -->
    <div v-else-if="option.type === 'number'" class="mt-3">
      <input
        type="number"
        :value="option.value as number"
        @input="updateNumber($event)"
        class="w-full p-2 border rounded"
        :placeholder="option.required ? 'Required' : 'Optional'"
      />
    </div>
    
    <!-- Select input -->
    <div v-else-if="option.type === 'select'" class="mt-3">
      <select
        :value="option.value as string"
        @change="updateSelect($event)"
        class="w-full p-2 border rounded"
        :class="{ 'border-red-500': option.required && !option.value }"
      >
        <option value="" disabled>Select an option</option>
        <option 
          v-for="opt in option.options" 
          :key="opt.value" 
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
      <!-- Add a manual entrypoint option if this is an entrypoint field -->
      <div v-if="option.id === 'entrypoint' && configStore.nodeConfig.network === 'custom'" class="mt-2">
        <input
          type="text"
          :value="option.value as string"
          @input="updateText($event)"
          class="w-full p-2 border rounded"
          placeholder="Enter custom entrypoint (e.g., example.com:8001)"
        />
      </div>
    </div>
    
    <!-- Warning message if present -->
    <div v-if="option.warning && showWarning" class="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-yellow-700">
            {{ option.warning }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useConfigStore, ConfigOption } from '../stores/configStore';

const props = defineProps<{
  option: ConfigOption;
}>();

const configStore = useConfigStore();

// Determine if we should show a warning
const showWarning = computed(() => {
  if (!props.option.warning) return false;
  
  // Only show warning if the option is enabled (for toggles)
  if (props.option.type === 'toggle') {
    return props.option.value === true;
  }
  
  // For other types, show warning if there's a value
  return props.option.value !== '' && props.option.value !== null;
});

// Account index helpers
function isIndexSelected(indexValue: string): boolean {
  if (!props.option.value) return false;
  const selectedIndexes = (props.option.value as string).split(',');
  return selectedIndexes.includes(indexValue);
}

function toggleAccountIndex(indexValue: string) {
  if (!props.option.value) {
    configStore.updateOption(props.option.id, indexValue);
    return;
  }
  
  const selectedIndexes = (props.option.value as string)
    .split(',')
    .map(i => i.trim())
    .filter(i => i !== '');
    
  if (isIndexSelected(indexValue)) {
    // Remove the index
    const newIndexes = selectedIndexes.filter(i => i !== indexValue);
    configStore.updateOption(props.option.id, newIndexes.join(','));
  } else {
    // Add the index
    selectedIndexes.push(indexValue);
    configStore.updateOption(props.option.id, selectedIndexes.join(','));
  }
}

// Update functions for different input types
function updateToggle(event: Event) {
  const target = event.target as HTMLInputElement;
  configStore.updateOption(props.option.id, target.checked);
}

function updateText(event: Event) {
  const target = event.target as HTMLInputElement;
  configStore.updateOption(props.option.id, target.value);
}

function updateNumber(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.value === '' ? null : Number(target.value);
  configStore.updateOption(props.option.id, value);
}

function updateSelect(event: Event) {
  const target = event.target as HTMLSelectElement;
  configStore.updateOption(props.option.id, target.value);
}
</script> 