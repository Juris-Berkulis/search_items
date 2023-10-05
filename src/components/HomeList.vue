<script setup lang="ts">
import { watchEffect, type Ref, ref } from 'vue';
import { storeToRefs } from 'pinia';
import HomeListItem from '@/components/HomeListItem.vue';
import { useSearchStore } from '@/store/search';
import { useJokesCountStore } from '@/store/jokesCount';
import { urlForChuckNorrisQuery } from '@/data/variables';
import { useFetch } from '@/composables/fetch';
import type { Joke, FetchData } from '@/types/response';

const searchStore = useSearchStore();
const jokesCountStore = useJokesCountStore();

const {
    searchValue,
} = storeToRefs(searchStore);

const {
    jokesCount,
} = storeToRefs(jokesCountStore);

const jokesList: Ref<Joke[]> = ref([]);

const getJokes = async (): Promise<void> => {
    const { fetchData } = await useFetch<FetchData>(`${urlForChuckNorrisQuery}${searchValue.value}`);

    if (fetchData.value?.result.length) jokesList.value = fetchData.value.result;
    else jokesList.value = [];

    jokesCount.value = fetchData.value?.total;
};

watchEffect(() => {
    if (searchValue.value.length > 3) {
        getJokes();
    }
});
</script>

<template>
<div class="list">
    <HomeListItem v-for="joke of jokesList" :key="joke.id" :joke="joke" />
</div>
</template>

<style scoped lang="scss">
.list {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(6, 1fr);
}
</style>
