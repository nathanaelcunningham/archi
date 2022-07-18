import { toolData, toolState } from "../stores/tool.store";
import { tools } from "../tools/tools";

function handleMouseDown(e: MouseEvent) {
  toolData.currentTool.start(e);
}

function handleMouseMove(e: MouseEvent) {
  toolData.currentTool.move(e);
}

function handleMouseUp(e: MouseEvent) {
  toolData.currentTool.end(e);
}

function handleKeyup(e: KeyboardEvent) {
  if (e.key === "Control") {
    toolState.update((ts) => ({ ...ts, currentTool: ts.prevTool }));
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Control" && !e.repeat) {
    toolState.update((ts) => ({
      ...ts,
      prevTool: ts.currentTool,
      currentTool: tools.panTool,
    }));
  }
}

export {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleKeydown,
  handleKeyup,
};
