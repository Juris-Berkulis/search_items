import { defineStore } from "pinia";
import { ref, type Ref } from "vue";


export const useSearchStore = defineStore('store', () => {
    const searchValue: Ref<string> = ref('');

    const changeSearchValue = (newValue: string): void => {
        searchValue.value = newValue;
    };

    return {
        searchValue,
        changeSearchValue,
    }
});
