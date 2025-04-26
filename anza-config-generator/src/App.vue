<script setup lang="ts">
import AppLayout from './components/AppLayout.vue';
import NodeTypeSelector from './components/NodeTypeSelector.vue';
import NetworkSelector from './components/NetworkSelector.vue';
import PresetSelector from './components/PresetSelector.vue';
import ConfigPanel from './components/ConfigPanel.vue';
import ConfigOutput from './components/ConfigOutput.vue';
</script>

<template>
  <AppLayout>
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-4 w-full">
      <div class="xl:col-span-8 w-full">
        <NodeTypeSelector />
        <NetworkSelector />
        <PresetSelector />
        <ConfigPanel />
      </div>
      <div class="xl:col-span-4 xl:sticky xl:top-4 self-start w-full">
        <ConfigOutput />
      </div>
    </div>
  </AppLayout>
</template>

<style>
/* Remove any potential width limitations from components */
.grid,
.grid > div {
  max-width: 100%;
  width: 100%;
}
</style>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
