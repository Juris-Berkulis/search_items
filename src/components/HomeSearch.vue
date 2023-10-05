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
<div class="search">
    <input class="input" @input="inputedValueDelay" :value="searchValue" type="text" placeholder="Search jokes...">
    <p class="additionally" v-if="jokesCount">Found jokes: {{ jokesCount }}</p>
</div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

$indentation: 36px;
$color: #656ec2;

.search {
    width: 100%;
    max-width: 626px;
    margin: 0 auto;
}

.input {
    width: 100%;
    margin: 0 auto 20px;
    padding: 20px $indentation;
    background-color: $bg-main;
    box-shadow: $bsh-main;
    color: $color;
    font-family: $ff-primary;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    &::placeholder {
        color: $color;
    }
}

.additionally {
    margin-left: $indentation;
    color: $color-main;
    font-family: $ff-second;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>
