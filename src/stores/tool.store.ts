import { writable } from "svelte/store";
import { tools } from "../tools/tools";

export type Tool = {
  start: (e: MouseEvent) => void;
  move: (e: MouseEvent) => void;
  end: (e: MouseEvent) => void;
};
export type ToolState = {
  currentTool: Tool;
  prevTool: Tool | null;
  isDrawing: boolean;
};

const initialState = {
  currentTool: tools.lineTool,
  prevTool: null,
  isDrawing: false,
};

export const toolState = writable<ToolState>(initialState);

export let toolData: ToolState;
toolState.subscribe(($state) => (toolData = $state));

function setDrawing(drawing: boolean) {
  toolState.update((prev) => ({ ...prev, isDrawing: drawing }));
}

export const toolHelpers = {
  setDrawing,
};
