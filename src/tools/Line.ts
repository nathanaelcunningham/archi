import { get } from "svelte/store";
import { type Tool, toolData, toolHelpers } from "../stores/tool.store";
import { tempLayoutState, layoutState } from "../stores/layout.store";
import { truePoint } from "../stores/view.store";

export function start(e: MouseEvent) {
  toolHelpers.setDrawing(true);
  const point = truePoint(e.clientX, e.clientY, true);
  tempLayoutState.update((prev) => ({
    ...prev,
    line: {
      start: point,
      end: point,
    },
  }));
}

export function move(e: MouseEvent) {
  if (toolData.isDrawing) {
    const point = truePoint(e.clientX, e.clientY, true);
    tempLayoutState.update((prev) => ({
      ...prev,
      line: {
        ...prev.line,
        end: point,
      },
    }));
  }
}

export function end(e: MouseEvent) {
  if (toolData.isDrawing) {
    toolHelpers.setDrawing(false);
    let templine = get(tempLayoutState).line;
    const point = truePoint(e.clientX, e.clientY, true);

    layoutState.update((prev) => ({
      ...prev,
      lines: [
        ...prev.lines,
        {
          ...templine,
          end: point,
        },
      ],
    }));
  }
}

export const lineTool: Tool = {
  start: start,
  move: move,
  end: end,
};
