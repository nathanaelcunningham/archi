import type { Tool } from "src/stores/tool.store";
import { lineTool } from "./Line";
import { panTool } from "./Pan";
import { wallTool } from "./Wall";

export const tools: Record<string, Tool> = {
  lineTool,
  panTool,
  wallTool,
};
