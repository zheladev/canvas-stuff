import { Point } from "@/interfaces/Point";
import { VariadicPartialCanvasHandler } from "@/types/PartialCanvasHandler";
import { Ref, UnwrapNestedRefs } from "vue";
import { drawBG } from "./BG";

type BasicCanvasHandler = VariadicPartialCanvasHandler<[Ref<number>, UnwrapNestedRefs<{ mouseX: number, mouseY: number }>]>;

export const handleCanvas : BasicCanvasHandler = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, canvasWidth: Ref<number>, canvasHeight: Ref<number>, gridStep: Ref<number>, mouseCoords: UnwrapNestedRefs<{ mouseX: number, mouseY: number }>) => {
    const mouseEvents : Array<{ handler: (e: Event) => void, eventName: string }> = [];
    let timestep = 0;
    return {
        events: mouseEvents,
        handler: () => {
            const { x, y } = canvas.getBoundingClientRect();
            const relMouseCoords = {
                x: mouseCoords.mouseX - x,
                y: mouseCoords.mouseY - y,
            }
            drawBG(canvas.width, canvas.height, ctx);
            timestep++;
        }
    }
}

const step = (step: number, width: number, height: number) => {
    const iter = [...Array(step).keys()];
    iter.map(i => {
        
    })
}
