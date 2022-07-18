import { get } from "svelte/store";
import { toolState, type Tool } from "../stores/tool.store";
import { viewState } from "../stores/view.store";
import { pointCtm } from "../helpers/pointConversion";

let svg: SVGSVGElement;
viewState.subscribe(($state) => (svg = $state.svg));

export function start(e: MouseEvent) {
  toolState.update((prev) => ({ ...prev, isDrawing: true }));
  let point = pointCtm(svg, e.clientX, e.clientY);
  viewState.update((vs) => ({ ...vs, prevPoint: point }));
}

export function move(e: MouseEvent) {
  if (get(toolState).isDrawing) {
    let point = pointCtm(svg, e.clientX, e.clientY);
    viewState.update((vs) => ({
      ...vs,
      prevPoint: point,
      translate: {
        x: vs.translate.x + (point.x - vs.prevPoint.x),
        y: vs.translate.y + (point.y - vs.prevPoint.y),
      },
    }));
  }
}

export function end(e: MouseEvent) {
  if (get(toolState).isDrawing) {
    toolState.update((prev) => ({ ...prev, isDrawing: false }));
  }
}

export const panTool: Tool = {
  start: start,
  move: move,
  end: end,
};
