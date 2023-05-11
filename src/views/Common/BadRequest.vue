<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <div style="border-radius: 56px; padding: 0.2rem; background: linear-gradient(180deg, var(--red-600) 10%, rgba(33, 150, 243, 0) 40%)">
        <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
          <span class="text-red-600 font-bold text-7xl">403</span>
          <h1 class="text-900 font-bold text-3xl lg:text-5xl mb-2">Access Denied</h1>
          <div class="text-600 mb-5">You are not authorized to access this page.</div>
          <router-link :to="{ name: 'home' }" class="flex align-items-center py-5 border-300">
            <span class="flex justify-content-center align-items-center bg-cyan-400 border-round" style="height: 3.5rem; width: 3.5rem">
              <i class="text-50 pi pi-home pi-table text-2xl"></i>
            </span>
            <span class="ml-4 flex flex-column">
              <span class="text-900 lg:text-xl font-medium">Go Home</span>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
