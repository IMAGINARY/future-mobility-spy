function qs<T extends Element>(selectors: string): T {
  return document.querySelector(selectors) as T;
}

export const cameraSelectorElement = qs<HTMLSelectElement>('#camera-selector');
export const clearDeviceIdButton = qs<HTMLButtonElement>('#clear-device-id');
export const accessCameraButton = qs<HTMLButtonElement>(
  '#access-camera-button'
);

export const videoElement = qs<HTMLVideoElement>('#camera-video');

export const flipHElement = qs<HTMLInputElement>('#flip-h');
export const flipVElement = qs<HTMLInputElement>('#flip-v');
export const scaleElement = qs<HTMLInputElement>('#scale');
export const rotationElement = qs<HTMLInputElement>('#rotation');
export const translationXElement = qs<HTMLInputElement>('#translation-x');
export const translationYElement = qs<HTMLInputElement>('#translation-y');
export const transformElements = [
  translationXElement,
  translationYElement,
  rotationElement,
  scaleElement,
  flipHElement,
  flipVElement,
];

export const clearTransformationButton = qs<HTMLButtonElement>(
  '#clear-transformation'
);
export const reloadTransformationButton = qs<HTMLButtonElement>(
  '#reload-transformation'
);
export const storeTransformationButton = qs<HTMLButtonElement>(
  '#store-transformation'
);

export const contentElement = qs<HTMLElement>('#content');
export const configMenuElement = qs<HTMLElement>('#config');
export const hideConfigMenuButton = qs<HTMLButtonElement>(
  '#hide-config-ui-button'
);
export const clearButton = qs<HTMLButtonElement>('#clear-button');
