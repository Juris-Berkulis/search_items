<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
<main class="main">
    <RouterView />
</main>
</template>

<style scoped lang="scss">
.main {
    flex-grow: 1;
    width: 100%;
    max-width: 1626px;
    margin: 0 auto;
    padding: 128px 30px;
}
</style>
