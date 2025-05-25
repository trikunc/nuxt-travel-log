<script setup lang="ts">
import { NuxtLink } from "#components";
</script>

<template>
  <div class="navbar bg-primary text-primary-content">
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-ghost text-xl">
        Travel Log
      </NuxtLink>
    </div>
    <div class="navbar-end">
      <button class="btn btn-accent">
        Sign In With Github
        <Icon name="tabler:brand-github" size="24px" />
      </button>
    </div>
  </div>
</template>
