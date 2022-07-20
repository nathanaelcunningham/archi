import {
  layoutState,
  tempLayoutState,
  type Wall,
} from "src/stores/layout.store";
import { type Tool, toolHelpers, toolData } from "src/stores/tool.store";
import { truePoint } from "src/stores/view.store";
import { get } from "svelte/store";

function start(e: MouseEvent) {
  if (e.button === 2) {
    //cancel drawing
    toolHelpers.setDrawing(false);
    tempLayoutState.update((ts) => ({ ...ts, wall: null }));
    return;
  }

  const point = truePoint(e.clientX, e.clientY, true);
  if (toolData.isDrawing) {
    let wall = get(tempLayoutState).wall;
    layoutState.update((ls) => ({
      ...ls,
      walls: [...ls.walls, wall],
    }));
  }
  toolHelpers.setDrawing(true);
  tempLayoutState.update((prev) => ({
    ...prev,
    wall: {
      id: randomId(),
      start: point,
      end: point,
    },
  }));
}

function move(e: MouseEvent) {
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

function end(e: MouseEvent) {}

export const wallTool: Tool = {
  start,
  move,
  end,
};

const randomId = (length = 4) => {
  return Math.random().toString(16).substring(2, length);
};

export function renderWall(wall: Wall) {
  let path = "";
  let vec = {
    x: wall.end.x - wall.start.x,
    y: wall.end.y - wall.start.y,
  };
  let perp = {
    x: vec.y,
    y: -vec.x,
  };
  let length = Math.sqrt(perp.x * perp.x + perp.y * perp.y);
  if (length === 0) return ``;
  let norm = {
    x: perp.x / length,
    y: perp.y / length,
  };
  let width = 20;

  let p1 = {
    x: wall.start.x + (norm.x * width) / 2,
    y: wall.start.y + (norm.y * width) / 2,
  };
  let p2 = {
    x: wall.start.x - (norm.x * width) / 2,
    y: wall.start.y - (norm.y * width) / 2,
  };
  let p3 = {
    x: wall.end.x + (norm.x * width) / 2,
    y: wall.end.y + (norm.y * width) / 2,
  };
  let p4 = {
    x: wall.end.x - (norm.x * width) / 2,
    y: wall.end.y - (norm.y * width) / 2,
  };

  path = `
    M ${p1.x} ${p1.y}
    L ${p2.x} ${p2.y}
    L ${p4.x} ${p4.y}
    L ${p3.x} ${p3.y}
    Z
  `;
  return `<path stroke-width="2" fill="none" stroke="black" d="${path}" />`;
}

export function renderWall2(wall: Wall) {
  let path = "";

  let width = wall.end.x - wall.start.x;
  let height = wall.end.y - wall.start.y;
  let thickness = 20;
  let length = Math.sqrt(width * width + height * height);

  let xShift = (thickness * height) / length / 2;
  let yShift = (thickness * width) / length / 2;

  let p1 = {
    x: wall.start.x - xShift,
    y: wall.start.y + yShift,
  };
  let p2 = {
    x: wall.start.x + xShift,
    y: wall.start.y - yShift,
  };
  let p3 = {
    x: wall.end.x + xShift,
    y: wall.end.y - yShift,
  };
  let p4 = {
    x: wall.end.x - xShift,
    y: wall.end.y + yShift,
  };

  path = `
    M ${p1.x} ${p1.y}
    L ${p2.x} ${p2.y}
    L ${p3.x} ${p3.y}
    L ${p4.x} ${p4.y}
    Z
  `;
  return `<path stroke-width="2" fill="grey" stroke="black" d="${path}" />`;
}
export function drawCorners(wall: Wall) {
  let width = wall.end.x - wall.start.x;
  let height = wall.end.y - wall.start.y;
  let thickness = 10;
  let length = Math.sqrt(width * width + height * height);

  let xShift = (thickness * height) / length / 2;
  let yShift = (thickness * width) / length / 2;

  let p1 = {
    x: wall.start.x - xShift,
    y: wall.start.y + yShift,
  };
  let p2 = {
    x: wall.start.x + xShift,
    y: wall.start.y - yShift,
  };
  let p3 = {
    x: wall.end.x + xShift,
    y: wall.end.y - yShift,
  };
  let p4 = {
    x: wall.end.x - xShift,
    y: wall.end.y + yShift,
  };
  return `
    <circle cx=${p1.x} cy=${p1.y} r="6" fill="blue" />
    <circle cx=${p2.x} cy=${p2.y} r="6" fill="red" />
    <circle cx=${p3.x} cy=${p3.y} r="6" fill="green" />
    <circle cx=${p4.x} cy=${p4.y} r="6" fill="yellow" />
  `;
}
export function drawPoints(wall: Wall) {
  return `
    <circle cx=${wall.start.x} cy=${wall.start.y} r="6" fill="blue" />
    <circle cx=${wall.end.x} cy=${wall.end.y} r="6" fill="red" />
  `;
}
