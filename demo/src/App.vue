<template>
    <Lottie
        ref="lottieComp"
        class="lottie"
        :animation-data="lottieLikeButton"
        :canvas-config="{
            preserveAspectRatio: 'xMinYMid slice'
        }"
        :autoload="true"
        :autoplay="true"
        :loop="true"
    />
    <button
        type="button"
        @click="lottieComp?.load"
    >
        Load
    </button>
    <button
        type="button"
        @click="lottieComp?.play"
    >
        Play
    </button>
    <button
        type="button"
        @click="lottieComp?.stop"
    >
        Stop
    </button>
    <button
        type="button"
        @click="lottieComp?.pause"
    >
        Pause
    </button>
    <button
        type="button"
        @click="lottieComp?.destroy"
    >
        Destroy
    </button>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'

import lottieLikeButton from '@/assets/data/lottie-json/38920-like-button.json'

import type { LottieExpose } from '@d-gs/vue-lottie'

const Lottie = defineAsyncComponent(() => import('@d-gs/vue-lottie'))

const lottieComp = ref<LottieExpose>()
</script>

<style scoped>
.lottie {
    aspect-ratio: 1 / 1;
    width: 400px;
}
</style>
