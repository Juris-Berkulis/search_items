<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/store/search';
import { onUnmounted, ref, type Ref } from 'vue';

const searchStore = useSearchStore();

const {
    searchValue,
} = storeToRefs(searchStore);

const {
    changeSearchValue,
} = searchStore;

const timerId: Ref<ReturnType<typeof setTimeout> | undefined> = ref();

const inputedValueDelay = (event: Event): void => {
    clearTimeout(Number(timerId.value));

    timerId.value = setTimeout(() => {
        changeSearchValue((event.target as HTMLInputElement).value);
    }, 1000);
};

onUnmounted(() => {
    clearTimeout(Number(timerId.value));
});
</script>

<template>
<input @input="inputedValueDelay" :value="searchValue" type="text" placeholder="Search jokes...">
</template>

<style scoped lang="scss">
</style>
