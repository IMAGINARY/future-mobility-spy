function qs<T extends Element>(selectors: string): T {
  return document.querySelector(selectors) as T;
}

export const contentElement = qs<HTMLElement>('#content');

export const configMenuElement = qs<HTMLElement>('#config');

export const videoElement = qs<HTMLVideoElement>('#camera-video');
export const cameraSelectorElement = qs<HTMLSelectElement>('#camera-selector');

export const scaleElement = qs<HTMLInputElement>('#scale');
export const rotationElement = qs<HTMLInputElement>('#rotation');
export const translationXElement = qs<HTMLInputElement>('#translation-x');
export const translationYElement = qs<HTMLInputElement>('#translation-y');
export const flipHElement = qs<HTMLInputElement>('#flip-h');
export const flipVElement = qs<HTMLInputElement>('#flip-v');
export const transformElements = [
  translationXElement,
  translationYElement,
  rotationElement,
  scaleElement,
  flipHElement,
  flipVElement,
];

export const storeCameraCheckbox = qs<HTMLInputElement>('#storage-camera');
export const storeTransformsCheckbox = qs<HTMLInputElement>(
  '#storage-transforms'
);
export const loadButton = qs<HTMLButtonElement>('#load-button');
export const storeButton = qs<HTMLButtonElement>('#store-button');
export const loadDefaultsButton = qs<HTMLButtonElement>(
  '#load-defaults-button'
);

export const hideConfigMenuButton = qs<HTMLButtonElement>(
  '#hide-config-ui-button'
);
export const reloadPageMenuButton = qs<HTMLButtonElement>(
  '#reload-page-button'
);
