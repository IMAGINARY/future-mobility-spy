import {
  flipHElement,
  flipVElement,
  rotationElement,
  scaleElement,
  transformElements,
  translationXElement,
  translationYElement,
  videoElement,
} from './domElements';

export function getAndApplyTransforms() {
  applyTransforms(getTransforms());
}

export function applyTransforms(transforms: Transforms) {
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

  videoElement.style.transform = cssTransform;
}

export function clearTransforms() {
  for (const transformElement of transformElements) {
    transformElement.value = transformElement.defaultValue;
    transformElement.checked = transformElement.defaultChecked;
  }
  applyTransforms(getTransforms());
}

export function reloadTransforms() {
  const transforms = loadTransforms();
  if (transforms !== null) {
    applyTransforms(transforms);
  } else {
    clearTransforms();
  }
}

interface Transforms {
  translationX: number;
  translationY: number;
  rotation: number;
  scale: number;
  flipH: boolean;
  flipV: boolean;
}

function getTransforms(): Transforms {
  return {
    translationX: translationXElement.valueAsNumber,
    translationY: translationYElement.valueAsNumber,
    rotation: rotationElement.valueAsNumber,
    scale: scaleElement.valueAsNumber,
    flipH: flipHElement.checked,
    flipV: flipVElement.checked,
  };
}

export function setTransforms(transforms: Transforms) {
  const { translationX, translationY, rotation, scale, flipH, flipV } =
    transforms;
  translationXElement.valueAsNumber = translationX;
  translationYElement.valueAsNumber = translationY;
  rotationElement.valueAsNumber = rotation;
  scaleElement.valueAsNumber = scale;
  flipHElement.checked = flipH;
  flipVElement.checked = flipV;
}

export function loadTransforms() {
  const transformsString = localStorage.getItem('transforms');
  if (transformsString === null) {
    // could not load transform
    return null;
  } else {
    return JSON.parse(transformsString) as Transforms;
  }
}

function storeTransforms(transforms: Transforms) {
  localStorage.setItem('transforms', JSON.stringify(transforms));
  return transforms;
}

export function getAndStoreTransforms() {
  return storeTransforms(getTransforms());
}
