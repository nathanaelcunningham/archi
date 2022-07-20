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
  let vec = {
    x: wall.end.x - wall.start.x,
    y: wall.end.y - wall.start.y,
  };
  let perp = {
    x: vec.y,
    y: -vec.x,
  };
  let length = Math.sqrt(perp.x * perp.x + perp.y * perp.y);
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

  let path = `
    M ${p1.x} ${p1.y}
    L ${p2.x} ${p2.y}
    L ${p4.x} ${p4.y}
    L ${p3.x} ${p3.y}
    Z
  `;
  return `<path stroke-width="2" fill="none" stroke="black" d="${path}" />`;
}

export function drawPoints() {
  let wall = {
    start: {
      x: 300,
      y: 300,
    },
    end: {
      x: 400,
      y: 400,
    },
  };
  let vec = {
    x: wall.end.x - wall.start.x,
    y: wall.end.y - wall.start.y,
  };
  let perp = {
    x: vec.y,
    y: -vec.x,
  };
  let length = Math.sqrt(perp.x * perp.x + perp.y * perp.y);
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

  return `
    <circle cx=${p1.x} cy=${p1.y} r="4" fill="blue" />
    <circle cx=${p2.x} cy=${p2.y} r="4" fill="red" />
    <circle cx=${p3.x} cy=${p3.y} r="4" fill="green" />
    <circle cx=${p4.x} cy=${p4.y} r="4" fill="yellow" />
  `;
}
