<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value: boolean) {
    colorMode.preference = value ? "dark" : "light";
  },
});
</script>

<template>
  <label class="swap swap-rotate mx-4">
    <input v-model="isDark" type="checkbox">

    <Icon
      class="swap-on"
      name="tabler:sun"
      size="24px"
    />

    <Icon
      class="swap-off"
      name="tabler:moon-filled"
      size="24px"
    />
  </label>
</template>
