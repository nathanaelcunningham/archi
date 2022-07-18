import { writable } from "svelte/store";

export type Point = {
  x: number;
  y: number;
};

type Line = {
  start: Point;
  end: Point;
};

type WallId = string;

type Wall = {
  id: WallId;
  start: Point | WallId;
  end: Point | WallId;
};

type Walls = Map<WallId, Wall>;

type LayoutState = {
  lines: Line[];
  walls: Walls | null;
};

type TempLayout = {
  line: Line | null;
  wall: Wall | null;
};

const initialState = {
  lines: [],
  walls: null,
};
const initialTempLayout = {
  line: null,
  wall: null,
};

export const layoutState = writable<LayoutState>(initialState);
export const tempLayoutState = writable<TempLayout>(initialTempLayout);
