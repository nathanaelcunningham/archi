import { writable } from "svelte/store";
import type { Point } from "./layout.store";

type ViewState = {
  isPanning: boolean;
  scale: number;
  translate: Point;
  pan: Point;
  prevPoint: Point;
  svg: SVGSVGElement | null;
};

const intitialViewState = {
  isPanning: false,
  scale: 1,
  translate: {
    x: 0,
    y: 0,
  },
  pan: {
    x: 10,
    y: 10,
  },
  prevPoint: {
    x: 0,
    y: 0,
  },
  svg: null,
};

export const viewState = writable<ViewState>(intitialViewState);
export let viewData: ViewState;
viewState.subscribe(($state) => (viewData = $state));

export function truePoint(x: number, y: number, translate?: boolean) {
  let point = viewData.svg.createSVGPoint();
  point.x = x;
  point.y = y;
  point = point.matrixTransform(viewData.svg.getScreenCTM()?.inverse());

  if (translate) {
    return {
      x: point.x - viewData.translate.x,
      y: point.y - viewData.translate.y,
    };
  } else {
    return {
      x: point.x,
      y: point.y,
    };
  }
}
