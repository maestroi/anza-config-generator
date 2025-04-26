<template>
  <div class="min-h-screen bg-gray-100 w-full">
    <header class="bg-gray-800 shadow-md w-full">
      <div class="w-full px-4 py-4">
        <h1 class="text-2xl font-bold text-white">Anza Solana Config Generator</h1>
        <p class="text-gray-300 text-sm">
          Build and configure your Solana validator or RPC node
        </p>
      </div>
    </header>
    
    <main class="w-full p-4">
      <slot></slot>
    </main>
    
    <footer class="bg-gray-800 text-white p-4 mt-10 w-full">
      <div class="w-full text-center text-sm">
        <p>© 2025 Anza Solana Config Generator</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Layout component doesn't need additional setup
</script> 