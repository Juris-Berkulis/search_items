import type { FetchData } from '@/types/response';
import { ref, type Ref } from 'vue';

export const useFetch = async <T extends FetchData>(url: string): Promise<{ fetchData: Ref<T | null> }> => {
    const fetchData: Ref<T | null> = ref(null);

    try {
        const response: Response = await fetch(url);

        if (response.ok) {
            fetchData.value = await response.json();
        } else {
            throw `Ошибка при запросе!`
        }
    } catch (error: unknown) {
        console.warn(error)
    }

    return {
        fetchData,
    }
};
