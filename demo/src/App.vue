<template>
    <HelloVue3 />
    <Lottie
        :animation-data="lottieLikeButton"
        description=""
        :is-auto-play="true"
        :is-loop="true"
        title=""
    />
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import lottieLikeButton from '@/assets/data/lottie-json/38920-like-button.json'
import HelloVue3 from '@/components/HelloVue3.vue'

const Lottie = defineAsyncComponent(() =>
    import('@d-gs/vue-lottie'))
</script>
