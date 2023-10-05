<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/store/search';
import { useJokesCountStore } from '@/store/jokesCount';
import { onUnmounted, ref, type Ref } from 'vue';

const searchStore = useSearchStore();
const jokesCountStore = useJokesCountStore();

const {
    searchValue,
} = storeToRefs(searchStore);

const {
    jokesCount,
} = storeToRefs(jokesCountStore);

const timerId: Ref<ReturnType<typeof setTimeout> | undefined> = ref();

const inputedValueDelay = (event: Event): void => {
    clearTimeout(Number(timerId.value));

    timerId.value = setTimeout(() => {
        searchValue.value = (event.target as HTMLInputElement).value;
    }, 1000);
};

onUnmounted(() => {
    clearTimeout(Number(timerId.value));
});
</script>

<template>
<input @input="inputedValueDelay" :value="searchValue" type="text" placeholder="Search jokes...">
<p v-if="jokesCount">Found jokes: {{ jokesCount }}</p>
</template>

<style scoped lang="scss">
</style>
