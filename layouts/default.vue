<script lang="ts" setup>
const authStore = useAuthStore();

async function initAuthStore() {
  await authStore.init();
}

initAuthStore();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppNavBar />
    <main>
      <slot />
    </main>
  </div>
</template>
