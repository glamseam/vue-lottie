<template>
    <div ref="lottieEl" />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

import lottie, {
    type AnimationConfigWithData,
    type AnimationItem,
    type CanvasRendererConfig,
    type HTMLRendererConfig,
    type RendererType,
    type SVGRendererConfig
} from 'lottie-web'

const props = withDefaults(
    defineProps<{
        animationData: AnimationConfigWithData<RendererType>['animationData']
        rendererType: RendererType
        canvasConfig?: CanvasRendererConfig
        htmlConfig?: HTMLRendererConfig
        svgConfig?: SVGRendererConfig
        autoload?: boolean
        autoplay?: boolean
        loop?: boolean
    }>(),
    {
        rendererType: 'canvas',
        autoload: false,
        autoplay: false,
        loop: false
    }
)

const emit = defineEmits<{
    (e: 'complete'): void
    (e: 'loop-complete'): void
    // (e: 'enter-frame'): void
    // (e: 'segment-start'): void
    // (e: 'stopped'): void
}>()

const lottieEl = ref<HTMLDivElement>()
const animationItem = ref<AnimationItem>()

function getRendererSettings() {
    switch (props.rendererType) {
        case 'canvas':
            return props.canvasConfig
        case 'html':
            return props.htmlConfig
        case 'svg':
            return props.svgConfig
    }
}

function load() {
    if (lottieEl.value) {
        animationItem.value = lottie.loadAnimation({
            container: lottieEl.value,
            renderer: props.rendererType,
            animationData: props.animationData,
            autoplay: props.autoplay,
            loop: props.loop,
            rendererSettings: getRendererSettings()
        })

        if (!props.loop) {
            animationItem.value.addEventListener('complete', () => {
                emit('complete')
            })
        }

        if (props.loop) {
            animationItem.value.addEventListener('loopComplete', () => {
                emit('loop-complete')
            })
        }
    }
}

function play() {
    animationItem.value?.play()
}

function stop() {
    animationItem.value?.stop()
}

function pause() {
    animationItem.value?.pause()
}

function destroy() {
    animationItem.value?.destroy()
}

onMounted(() => {
    if (props.autoload) {
        load()
    }
})

onBeforeUnmount(() => {
    animationItem.value?.removeEventListener('complete')
    animationItem.value?.removeEventListener('loopComplete')
    animationItem.value?.destroy()
})

defineExpose<LottieExpose>({
    load,
    play,
    stop,
    pause,
    destroy
})
</script>

<script lang="ts">
export interface LottieExpose {
    load(): void
    play(): void
    stop(): void
    pause(): void
    destroy(): void
}
</script>
