import { Ref } from "vue";


export interface HandleFuncOutputStruc {
    events: Array<{ handler: (e: Event) => void, eventName: string }>,
    handler: () => void,
}

export type VariadicPartialCanvasHandler<T extends any[]> = (...args: [canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, canvasWidth: Ref<number>, canvasHeight: Ref<number>, ...t: T]) => HandleFuncOutputStruc;