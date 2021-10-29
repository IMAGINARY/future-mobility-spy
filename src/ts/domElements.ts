const cameraSelectorElement = document.getElementById(
  'camera-selector'
) as HTMLSelectElement;
const clearDeviceIdButton = document.getElementById(
  'clear-device-id'
) as HTMLButtonElement;
const accessCameraButton = document.getElementById(
  'access-camera-button'
) as HTMLButtonElement;

const videoElement = document.getElementById(
  'camera-video'
) as HTMLVideoElement;

const flipHElement = document.getElementById('flip-h') as HTMLInputElement;
const flipVElement = document.getElementById('flip-v') as HTMLInputElement;
const scaleElement = document.getElementById('scale') as HTMLInputElement;
const rotationElement = document.getElementById('rotation') as HTMLInputElement;
const translationXElement = document.getElementById(
  'translation-x'
) as HTMLInputElement;
const translationYElement = document.getElementById(
  'translation-y'
) as HTMLInputElement;
const transformElements = [
  translationXElement,
  translationYElement,
  rotationElement,
  scaleElement,
  flipHElement,
  flipVElement,
];

const clearTransformationButton = document.getElementById(
  'clear-transformation'
) as HTMLButtonElement;
const reloadTransformationButton = document.getElementById(
  'reload-transformation'
) as HTMLButtonElement;
const storeTransformationButton = document.getElementById(
  'store-transformation'
) as HTMLButtonElement;

const contentElement = document.getElementById('content');
const configMenuElement = document.getElementById('config');
const hideConfigMenuButton = document.getElementById(
  'hide-config-ui'
) as HTMLButtonElement;

export {
  cameraSelectorElement,
  clearDeviceIdButton,
  accessCameraButton,
  videoElement,
  flipHElement,
  flipVElement,
  scaleElement,
  rotationElement,
  translationXElement,
  translationYElement,
  transformElements,
  clearTransformationButton,
  reloadTransformationButton,
  storeTransformationButton,
  contentElement,
  configMenuElement,
  hideConfigMenuButton,
};
