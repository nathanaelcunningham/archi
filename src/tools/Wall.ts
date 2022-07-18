import { layoutState, tempLayoutState } from "src/stores/layout.store";
import { type Tool, toolHelpers, toolData } from "src/stores/tool.store";
import { truePoint } from "src/stores/view.store";
import { get } from "svelte/store";

export function start(e: MouseEvent) {
  if (e.button === 2) {
    //cancel drawing
    toolHelpers.setDrawing(false);
    tempLayoutState.update((ts) => ({ ...ts, wall: null }));
    return;
  }
  if (toolData.isDrawing) {
    let wall = get(tempLayoutState).wall;
    layoutState.update((ls) => ({
      ...ls,
      walls: [...ls.walls, wall],
    }));
  }
  toolHelpers.setDrawing(true);
  const point = truePoint(e.clientX, e.clientY, true);
  tempLayoutState.update((prev) => ({
    ...prev,
    wall: {
      id: randomId(),
      start: point,
      end: point,
    },
  }));
}

export function move(e: MouseEvent) {
  if (toolData.isDrawing) {
    const point = truePoint(e.clientX, e.clientY, true);
    console.log(point);
    tempLayoutState.update((prev) => ({
      ...prev,
      wall: {
        ...prev.wall,
        end: point,
      },
    }));
  }
}

export function end(e: MouseEvent) {}
export const wallTool: Tool = {
  start,
  move,
  end,
};

const randomId = (length = 4) => {
  return Math.random().toString(16).substring(2, length);
};
