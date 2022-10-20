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
            drawCircleOnMouse(relMouseCoords, ctx);
            timestep++;
        }
    }
}

const drawCircleOnMouse = (coords: Point, context: CanvasRenderingContext2D) => {
    const radius = 10;
    context.moveTo(coords.x, coords.y);
    context.beginPath();
    context.arc(coords.x, coords.y, radius, 0, 2 * Math.PI, false);
    context.strokeStyle = "white";
    context.stroke();
    context.closePath();
}

