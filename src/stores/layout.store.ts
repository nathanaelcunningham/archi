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
  start: Point;
  end: Point;
};

// type Walls = Map<WallId, Wall>;

type LayoutState = {
  lines: Line[];
  walls: Wall[];
};

type TempLayout = {
  line: Line | null;
  wall: Wall | null;
};

const initialState = {
  lines: [],
  walls: [],
};
const initialTempLayout = {
  line: null,
  wall: null,
};

export const layoutState = writable<LayoutState>(initialState);
export const tempLayoutState = writable<TempLayout>(initialTempLayout);
let layoutData: LayoutState;
layoutState.subscribe(($state) => (layoutData = $state));

function snapCheck(point: Point) {
  let maxDistance = 20;
  let closest: Wall | null = null;
  let closestDistance = 99999999;
  layoutData.walls.forEach((wall) => {
    const wallStartDist = distance(wall.start, point);
    const wallEndDist = distance(wall.start, point);
    if (wallStartDist <= maxDistance && wallStartDist < closestDistance) {
      closest = wall;
      closestDistance = wallStartDist;
    }
    if (wallEndDist <= maxDistance && wallEndDist < closestDistance) {
      closest = wall;
      closestDistance = wallEndDist;
    }
  });
  return closest;
}

function distance(p1: Point, p2: Point) {
  let dx = Math.abs(p1.x - p2.x);
  let dy = Math.abs(p1.y - p2.y);

  // d=√((x_2-x_1)²+(y_2-y_1)²)
  let dist = Math.sqrt(dx * dx + dy * dy);
  return dist;
}
