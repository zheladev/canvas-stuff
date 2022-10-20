<template>
    <canvas @mousemove="getMouseCoords" id="component-canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
</template>

<script setup lang="ts">
import { ComponentInternalInstance, Ref } from 'vue';
import { handleCanvas } from './logic';

const internalInstance = getCurrentInstance() as ComponentInternalInstance;
const loopHookId = ref(-1);
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

const mouseCoords = reactive({
    mouseX: 0,
    mouseY: 0
});

const getMouseCoords = (e: MouseEvent) => {
    mouseCoords.mouseX = e.pageX;
    mouseCoords.mouseY = e.pageY;
}

const canvasEvents: Ref<Array<{ handler: (e: Event) => void, eventName: string }>> = ref([]);
const canvasWidth = ref(1000);
const canvasHeight = ref(600);
const gridStep = computed(() => {
    const base = 100;
    return Math.max(Math.round(base / 1), 1)
})

const canvasVisibilityEventHandler = () => {
    console.log(document.hidden)
    if (document.hidden) {
        unhookCanvas();
    } else {
        hookCanvas();
    }
}

const hookCanvas = () => {
    if (loopHookId.value < 0) {
        canvas = document.getElementById("component-canvas") as HTMLCanvasElement;
        ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        const { events, handler } = handleCanvas(canvas, ctx, canvasWidth, canvasHeight, gridStep, mouseCoords);
        canvasEvents.value = events;
        loopHookId.value = internalInstance.appContext.config.globalProperties.$gameLoop.addUpdateHook(handler);
    }
}

onBeforeUnmount(() => {
    canvasEvents.value.forEach(e => window.removeEventListener(e.eventName, e.handler));
    canvasEvents.value = [];
    window.removeEventListener('visibilitychange', canvasVisibilityEventHandler);
    unhookCanvas();
})

onMounted(() => {
    hookCanvas();
    window.addEventListener('visibilitychange', canvasVisibilityEventHandler);
})

const unhookCanvas = () => {
    const unhooked = internalInstance.appContext.config.globalProperties.$gameLoop.removeUpdateHook(loopHookId.value);
    if (unhooked) {
        loopHookId.value = -1;
    }
}
</script>