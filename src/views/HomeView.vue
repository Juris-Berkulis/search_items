<script setup lang="ts">
import HomeSearch from '@/components/HomeSearch.vue';
import HomeList from '@/components/HomeList.vue';

</script>

<template>
<HomeSearch class="search" />
<HomeList />
</template>

<style scoped lang="scss">
.search {
    margin-bottom: 60px;
}
</style>
