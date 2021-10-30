export interface Transforms {
  translationX: number;
  translationY: number;
  rotation: number;
  scale: number;
  flipH: boolean;
  flipV: boolean;
}

export function convertTransformsToCss(transforms: Transforms) {
  const { translationX, translationY, rotation, scale, flipH, flipV } =
    transforms;

  let cssTransform = '';
  cssTransform += ` translate(${translationX}px,${translationY}px)`;
  cssTransform += ` rotate(${rotation}deg)`;
  cssTransform += ` scale(${scale})`;
  const flipScaleH = flipH ? -1 : 1;
  const flipScaleV = flipV ? -1 : 1;
  cssTransform += ` scale(${flipScaleH},${flipScaleV})`;
  cssTransform = cssTransform.trim();

  return cssTransform;
}
