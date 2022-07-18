import { tempLayoutState } from "src/stores/layout.store";
import { type Tool, toolHelpers, toolData } from "src/stores/tool.store";
import { truePoint } from "src/stores/view.store";

export function start(e: MouseEvent) {
  toolHelpers.setDrawing(true);
  tempLayoutState.update((prev) => ({
    ...prev,
    wall: createWall(e),
  }));
}

export function move(e: MouseEvent) {
  if (toolData.isDrawing) {
    const point = truePoint(e.clientX, e.clientY, true);
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

function createWall(e: MouseEvent) {
  const point = truePoint(e.clientX, e.clientY, true);
  const id = randomId();

  return {
    id: id,
    start: point,
    end: point,
  };
}
const randomId = (length = 4) => {
  return Math.random().toString(16).substring(2, length);
};
