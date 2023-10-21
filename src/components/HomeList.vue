<script setup lang="ts">
import { watchEffect, type Ref, ref, type ComputedRef, computed } from 'vue';
import { storeToRefs } from 'pinia';
import HomeListItem from '@/components/HomeListItem.vue';
import BaseLoader from '@/components/base/BaseLoader.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import { urlForChuckNorrisQuery } from '@/data/variables';
import { useFetch } from '@/composables/fetch';
import { useSearchStore } from '@/store/search';
import { useJokesCountStore } from '@/store/jokesCount';
import type { Joke, FetchData } from '@/types/response';

const searchStore = useSearchStore();
const jokesCountStore = useJokesCountStore();

const {
    searchValue,
} = storeToRefs(searchStore);

const {
    jokesCount,
} = storeToRefs(jokesCountStore);

const pagesStep: number = 11;
const isLoading: Ref<boolean> = ref(false);
const jokesList: Ref<Joke[]> = ref([]);
const currentPage: Ref<number> = ref(1);

const pagesCount: ComputedRef<number> = computed(() => {
    return jokesCount.value ? Math.floor(jokesCount.value / pagesStep) + 1 : 0
});

const displayedJokesList: ComputedRef<Joke[]> = computed(() => {
    return jokesList.value.slice((currentPage.value - 1) * pagesStep, currentPage.value * pagesStep)
});

const getJokes = async (): Promise<void> => {
    isLoading.value = true;
    const { fetchData } = await useFetch<FetchData>(`${urlForChuckNorrisQuery}${searchValue.value}`);

    if (fetchData.value?.result.length) jokesList.value = fetchData.value.result;
    else jokesList.value = [];

    jokesCount.value = fetchData.value?.total;
    currentPage.value = 1;
    isLoading.value = false;
};

watchEffect(() => {
    if (searchValue.value.length > 3) {
        getJokes();
    }
});
</script>

<template>
<BaseLoader class="loader" v-if="isLoading" />
<div class="list" v-show="!isLoading">
    <HomeListItem v-for="joke of displayedJokesList" :key="joke.id" :joke="joke" />
</div>
<BasePagination 
    class="pagination" 
    v-if="!isLoading && pagesCount > 1" 
    v-model:currentPage="currentPage" 
    :pagesCount="pagesCount" 
/>
</template>

<style scoped lang="scss">
.list {
    margin-bottom: 50px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(6, 1fr);

    @media (max-width: $sp-l) {
        & {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: $sp-m) {
        & {
            grid-template-columns: repeat(1, 1fr);
        }
    }
}

.loader {
    height: 50px;
    color: $color-main;
}
</style>
