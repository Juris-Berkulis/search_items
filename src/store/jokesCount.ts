import { ref, type Ref } from 'vue';
import { defineStore } from "pinia";

export const useJokesCountStore = defineStore('jokesCount', () => {
    const jokesCount: Ref<number | undefined> = ref();

    return {
        jokesCount,
    }
});
