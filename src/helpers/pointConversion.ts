export function pointCtm(elem: SVGSVGElement, x: number, y: number) {
  let point = elem.createSVGPoint();
  point.x = x;
  point.y = y;
  point = point.matrixTransform(elem.getScreenCTM()?.inverse());

  return point;
}
