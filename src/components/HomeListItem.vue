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

    return `${utcDayNumber < 10 ? `0${utcDayNumber}` : utcDayNumber}.${utcMonth < 10 ? `0${utcMonth}` : utcMonth}.${utcYear}`
});
</script>

<template>
<div class="joke">
    <p class="description">{{ joke.value }}</p>
    <div class="down">
        <a class="link" :href="joke.url" target="_blank">{{ joke.id }}</a>
        <time class="time" :datetime="joke.created_at">{{ createDate }}</time>
    </div>
</div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.joke {
    grid-column: auto/span 2;
    min-height: 150px;
    padding: 30px 30px 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: $bg-main;
    box-shadow: $bsh-main;
    color: $color-main;
    font-family: $ff-primary;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;

    & .description {
        margin-bottom: 30px;
    }

    & .down {
        display: flex;
        justify-content: space-between;
        color: #767676;
        font-family: $ff-second;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    & .link {
        position: relative;

        &::before, 
        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            height: 1px;
        }

        &::before {
            left: 100%;
            width: 0;
            background-color: transparent;
        }

        &::after {
            right: 0;
            width: 0;
            background-color: $color-main;
        }

        &:hover {
            color: $color-main;

            &::before {
                width: 0;
            }

            &::after {
                width: 100%;
            }
        }
    }

    &:first-child, 
    &:nth-child(2) {
        grid-column: auto/span 3;
        min-height: 262px;
        padding: 40px 40px 25px;
        font-size: 20px;
        line-height: 30px;

        & .description {
            margin-bottom: 60px;
        }
    }
}
</style>
