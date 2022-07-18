import { get } from "svelte/store";
import { toolHelpers, toolState, type Tool } from "../stores/tool.store";
import { truePoint, viewState } from "../stores/view.store";

export function start(e: MouseEvent) {
  toolHelpers.setDrawing(true);
  let point = truePoint(e.clientX, e.clientY);
  viewState.update((vs) => ({ ...vs, prevPoint: point }));
}

export function move(e: MouseEvent) {
  if (get(toolState).isDrawing) {
    let point = truePoint(e.clientX, e.clientY);
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
    toolHelpers.setDrawing(false);
  }
}

export const panTool: Tool = {
  start: start,
  move: move,
  end: end,
};
