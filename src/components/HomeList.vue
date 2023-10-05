<script setup lang="ts">
import { watchEffect, type Ref, ref } from 'vue';
import { storeToRefs } from 'pinia';
import HomeListItem from '@/components/HomeListItem.vue';
import BaseLoader from '@/components/base/BaseLoader.vue';
import { useSearchStore } from '@/store/search';
import { useJokesCountStore } from '@/store/jokesCount';
import { useFetch } from '@/composables/fetch';
import { urlForChuckNorrisQuery } from '@/data/variables';
import type { Joke, FetchData } from '@/types/response';

const searchStore = useSearchStore();
const jokesCountStore = useJokesCountStore();

const {
    searchValue,
} = storeToRefs(searchStore);

const {
    jokesCount,
} = storeToRefs(jokesCountStore);

const isLoading: Ref<boolean> = ref(false);
const jokesList: Ref<Joke[]> = ref([]);

const getJokes = async (): Promise<void> => {
    isLoading.value = true;
    const { fetchData } = await useFetch<FetchData>(`${urlForChuckNorrisQuery}${searchValue.value}`);

    if (fetchData.value?.result.length) jokesList.value = fetchData.value.result;
    else jokesList.value = [];

    jokesCount.value = fetchData.value?.total;
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
    <HomeListItem v-for="joke of jokesList" :key="joke.id" :joke="joke" />
</div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.list {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(6, 1fr);
}

.loader {
    height: 50px;
    color: $color-main;
}
</style>
