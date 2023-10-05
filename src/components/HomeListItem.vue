<script setup lang="ts">
import type { Joke } from '@/types/response';
import { computed, type ComputedRef } from 'vue';

interface Props {
    joke: Joke,
};

const props = defineProps<Props>();

const createDate: ComputedRef<string> = computed(() => {
    const date: Date = new Date(props.joke.created_at)

    const utcYear: number = date.getUTCFullYear();
    const utcMonth: number = date.getUTCMonth() + 1;
    const utcDayNumber: number = date.getUTCDate();

    return `
        ${utcDayNumber < 10 ? `0${utcDayNumber}` : utcDayNumber}.
        ${utcMonth < 10 ? `0${utcMonth}` : utcMonth}.
        ${utcYear}
    `
});
</script>

<template>
<div>
    <p>{{ joke.value }}</p>
    <div>
        <a :href="joke.url" target="_blank">{{ joke.id }}</a>
        <time :datetime="joke.created_at">{{ createDate }}</time>
    </div>
</div>
</template>

<style scoped lang="scss">
</style>
