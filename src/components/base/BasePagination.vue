<script setup lang="ts">
interface Props {
    pagesCount: number,
    currentPage: number,
};

const props = defineProps<Props>();

const emit = defineEmits(['update:currentPage']);

const changePage = (newPageNumber: number): void => {
    emit('update:currentPage', newPageNumber);
};

const isShowPageBtn = (pageNumber: number): boolean => {
    return pageNumber === 1 
        || pageNumber === props.pagesCount 
        || props.currentPage === pageNumber 
        || pageNumber - props.currentPage === 1 
        || props.currentPage - pageNumber === 1
};

const isShowPlaceholderBetweenPages = (pageNumber: number): boolean => {
    return pageNumber - props.currentPage === 2 || props.currentPage - pageNumber === 2
};
</script>

<template>
<div class="pagination w-full flex justify-center gap-4">
    <template v-for="pageNumber of pagesCount" :key="pageNumber">
        <button 
            class="btn p-2"
            :class="{btn_active: currentPage === pageNumber}"
            v-if="isShowPageBtn(pageNumber)"
            @click="changePage(pageNumber)"
            :data-page="pageNumber"
            :disabled="currentPage === pageNumber"
        >{{ pageNumber }}</button>
        <span class="placeholder" v-else-if="isShowPlaceholderBetweenPages(pageNumber)">...</span>
    </template>
</div>
</template>

<style scoped lang="scss">
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
}

.btn {
    padding: 10px 20px;
    background-color: #87ceeb;
    color: $color-main;
    font-family: $ff-primary;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    border: none;
    box-shadow: $bsh-main;
    cursor: pointer;
    transition: all 0.4s linear;

    &:hover {
        background-color: #68a8c2;
        color: $color-light;
    }

    &_active:hover, 
    &_active {
        background-color: #656ec2;
        color: $color-light;
        cursor: default;
    }
}

.placeholder {
    color: $color-main;
    font-family: $ff-primary;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 0;
    box-shadow: $bsh-main;
}
</style>
