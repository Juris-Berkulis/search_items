<script setup lang="ts">
import { watchEffect, type Ref, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/store/search';
import { urlForChuckNorrisQuery } from '@/data/variables';
import { useFetch } from '@/composables/fetch';
import type { Joke, FetchData } from '@/types/response';

const searchStore = useSearchStore();

const {
    searchValue,
} = storeToRefs(searchStore);

const jokesList: Ref<Joke[]> = ref([]);

const getJokes = async (): Promise<void> => {
    const { fetchData } = await useFetch<FetchData>(`${urlForChuckNorrisQuery}${searchValue.value}`);

    if (fetchData.value?.result.length) jokesList.value = fetchData.value.result;
    else jokesList.value = [];
};

watchEffect(() => {
    if (searchValue.value.length > 3) {
        getJokes();
    }
});
</script>

<template>

</template>

<style scoped lang="scss">
</style>
