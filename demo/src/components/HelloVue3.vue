<template>
    <h1>
        {{ props.title }}
    </h1>
    <button @click="inc">
        Clicked {{ count }} times.
    </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = withDefaults(defineProps<{
    title?: string
}>(), {
    title: 'Vue 3.2'
})

const count = ref(0)

const inc = () => {
    count.value++
}
</script>

<style scoped>
h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 36px;
}
</style>
