<template>
    <div ref="containerEl" />
</template>

<script lang="ts" setup>
import {
    onMounted,
    onBeforeUnmount,
    ref
} from 'vue'
import lottie, {
    type AnimationItem,
    type AnimationConfigWithData,
    type RendererType
} from 'lottie-web'

const props = withDefaults(defineProps<{
    animationData: AnimationConfigWithData<RendererType>['animationData']
    description?: string
    isAutoPlay?: boolean
    isLoop?: boolean
    title?: string
}>(), {
    isAutoPlay: true,
    isLoop: false
})

const emit = defineEmits<{
    (e: 'complete'): void
    (e: 'loop-complete'): void
    // (e: 'enter-frame'): void
    // (e: 'segment-start'): void
    // (e: 'stopped'): void
}>()

const containerEl = ref<HTMLDivElement>()
const animationItem = ref<AnimationItem>()

onMounted(() => {
    loadAnimation()
})

const loadAnimation = () => {
    if (containerEl.value) {
        animationItem.value = lottie.loadAnimation({
            container: containerEl.value,
            loop: props.isLoop,
            autoplay: props.isAutoPlay,
            animationData: props.animationData,
            rendererSettings: {
                title: props.title,
                description: props.description
            }
        })

        if (!props.isLoop) {
            animationItem.value.addEventListener(('complete'), () => {
                emit('complete')
            })
        }

        if (props.isLoop) {
            animationItem.value.addEventListener(('loopComplete'), () => {
                emit('loop-complete')
            })
        }
    }
}

onBeforeUnmount(() => {
    animationItem.value?.removeEventListener('complete')
    animationItem.value?.removeEventListener('loopComplete')
})
</script>
