<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6 w-full">
    <h2 class="text-xl font-semibold mb-4">Node Configuration</h2>
    
    <div class="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-blue-700">
            Configure your {{ nodeType }} settings. Required fields are marked. Network settings are already applied.
          </p>
        </div>
      </div>
    </div>
    
    <div class="space-y-6">
      <!-- Basic Options -->
      <div>
        <h3 class="text-lg font-medium mb-3 pb-2 border-b">Basic Options</h3>
        <div>
          <config-option-item 
            v-for="option in configByCategory.basic" 
            :key="option.id" 
            :option="option"
          />
        </div>
      </div>
      
      <!-- Network Options (excluding network-selection related options) -->
      <div>
        <h3 class="text-lg font-medium mb-3 pb-2 border-b">Network Options</h3>
        <div>
          <config-option-item 
            v-for="option in filteredNetworkOptions" 
            :key="option.id" 
            :option="option"
          />
        </div>
      </div>
      
      <!-- Performance Options -->
      <div>
        <h3 class="text-lg font-medium mb-3 pb-2 border-b">Performance Options</h3>
        <div>
          <config-option-item 
            v-for="option in configByCategory.performance" 
            :key="option.id" 
            :option="option"
          />
        </div>
      </div>
      
      <!-- Security Options (excluding Genesis Hash) -->
      <div>
        <h3 class="text-lg font-medium mb-3 pb-2 border-b">Security Options</h3>
        <div>
          <config-option-item 
            v-for="option in filteredSecurityOptions" 
            :key="option.id" 
            :option="option"
          />
        </div>
      </div>
      
      <!-- Advanced Options -->
      <div>
        <div @click="toggleAdvancedOptions" class="flex items-center justify-between cursor-pointer text-lg font-medium mb-3 pb-2 border-b">
          <h3>Advanced Options</h3>
          <svg :class="{'transform rotate-180': showAdvancedOptions}" class="h-5 w-5 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
        
        <div v-if="showAdvancedOptions" class="space-y-6">
          <!-- Basic Advanced Options -->
          <div>
            <config-option-item 
              v-for="option in basicAdvancedOptions" 
              :key="option.id" 
              :option="option"
            />
          </div>
          
          <!-- RPC Advanced Options (collapsible) -->
          <div>
            <div @click="toggleRpcOptions" class="flex items-center justify-between cursor-pointer text-md font-medium pl-2 py-2 bg-gray-50 rounded">
              <h4>RPC Options</h4>
              <svg :class="{'transform rotate-180': showRpcOptions}" class="h-4 w-4 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <div v-if="showRpcOptions" class="mt-2 pl-4 border-l-2 border-gray-200">
              <config-option-item 
                v-for="option in rpcAdvancedOptions" 
                :key="option.id" 
                :option="option"
              />
            </div>
          </div>
          
          <!-- Snapshot Advanced Options (collapsible) -->
          <div>
            <div @click="toggleSnapshotOptions" class="flex items-center justify-between cursor-pointer text-md font-medium pl-2 py-2 bg-gray-50 rounded">
              <h4>Snapshot Options</h4>
              <svg :class="{'transform rotate-180': showSnapshotOptions}" class="h-4 w-4 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <div v-if="showSnapshotOptions" class="mt-2 pl-4 border-l-2 border-gray-200">
              <config-option-item 
                v-for="option in snapshotAdvancedOptions" 
                :key="option.id" 
                :option="option"
              />
            </div>
          </div>
          
          <!-- Account Options (collapsible) -->
          <div>
            <div @click="toggleAccountOptions" class="flex items-center justify-between cursor-pointer text-md font-medium pl-2 py-2 bg-gray-50 rounded">
              <h4>Account Options</h4>
              <svg :class="{'transform rotate-180': showAccountOptions}" class="h-4 w-4 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <div v-if="showAccountOptions" class="mt-2 pl-4 border-l-2 border-gray-200">
              <config-option-item 
                v-for="option in accountAdvancedOptions" 
                :key="option.id" 
                :option="option"
              />
            </div>
          </div>
          
          <!-- Validator Options (collapsible) -->
          <div v-if="nodeType === 'Validator'">
            <div @click="toggleValidatorOptions" class="flex items-center justify-between cursor-pointer text-md font-medium pl-2 py-2 bg-gray-50 rounded">
              <h4>Validator-specific Options</h4>
              <svg :class="{'transform rotate-180': showValidatorOptions}" class="h-4 w-4 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <div v-if="showValidatorOptions" class="mt-2 pl-4 border-l-2 border-gray-200">
              <config-option-item 
                v-for="option in validatorAdvancedOptions" 
                :key="option.id" 
                :option="option"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useConfigStore, ConfigOption } from '../stores/configStore';
import ConfigOptionItem from './ConfigOptionItem.vue';

const configStore = useConfigStore();

const nodeType = computed(() => {
  return configStore.nodeConfig.type === 'validator' ? 'Validator' : 'RPC';
});

const configByCategory = computed(() => {
  return configStore.getConfigByCategory;
});

// Filter out options that are handled at the network selection level
const filteredNetworkOptions = computed(() => {
  return configByCategory.value.network.filter(option => 
    !['entrypoint', 'knownValidator'].includes(option.id)
  );
});

const filteredSecurityOptions = computed(() => {
  return configByCategory.value.security.filter(option => 
    option.id !== 'expectedGenesisHash'
  );
});

// Advanced options toggles
const showAdvancedOptions = ref(false);
const showRpcOptions = ref(false);
const showSnapshotOptions = ref(false);
const showAccountOptions = ref(false);
const showValidatorOptions = ref(false);

// Toggle functions
const toggleAdvancedOptions = () => {
  showAdvancedOptions.value = !showAdvancedOptions.value;
};

const toggleRpcOptions = () => {
  showRpcOptions.value = !showRpcOptions.value;
};

const toggleSnapshotOptions = () => {
  showSnapshotOptions.value = !showSnapshotOptions.value;
};

const toggleAccountOptions = () => {
  showAccountOptions.value = !showAccountOptions.value;
};

const toggleValidatorOptions = () => {
  showValidatorOptions.value = !showValidatorOptions.value;
};

// Categorize advanced options into subcategories
const advancedOptions = computed(() => configByCategory.value.advanced);

const basicAdvancedOptions = computed(() => {
  return advancedOptions.value.filter(option => 
    ['noPortCheck', 'limitLedgerSize', 'skipStartupLedgerVerification', 'walRecoveryMode', 'waitForSupermajority'].includes(option.id)
  );
});

const rpcAdvancedOptions = computed(() => {
  return advancedOptions.value.filter(option => 
    ['rpcMaxMultipleAccounts', 'rpcMaxRequestBodySize', 'rpcThreads'].includes(option.id)
  );
});

const snapshotAdvancedOptions = computed(() => {
  return advancedOptions.value.filter(option => 
    ['snapshotArchiveFormat', 'snapshotIntervalSlots'].includes(option.id)
  );
});

const accountAdvancedOptions = computed(() => {
  return advancedOptions.value.filter(option => 
    ['accountIndexes', 'accountsIndexBins', 'accountsShrinkRatio'].includes(option.id)
  );
});

const validatorAdvancedOptions = computed(() => {
  return advancedOptions.value.filter(option => 
    ['authorizedVoter', 'gossipValidator'].includes(option.id)
  );
});
</script> 