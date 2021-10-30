import {
  clearButton,
  clearDeviceIdButton,
  clearTransformationButton,
  configMenuElement,
  contentElement,
  hideConfigMenuButton,
  reloadTransformationButton,
  storeTransformationButton,
  transformElements,
} from './domElements';
import { clearDeviceIdAndReload } from './camera';
import {
  clearTransforms,
  getAndApplyTransforms,
  getAndStoreTransforms,
  reloadTransforms,
} from './transforms';
import {
  Idler,
  KeyboardInterrupter,
  PointerInterrupter,
} from '@imaginary-maths/idler';

// Hide config menu after hideDelay ms
const hideDelay = 20 * 1000;
const idler = new Idler(
  new PointerInterrupter(configMenuElement),
  new KeyboardInterrupter()
);
idler.addCallback({ delay: hideDelay, onBegin: () => showConfigMenu(false) });

export function clearConfig() {
  localStorage.clear();
  location.reload();
}

export function showConfigMenu(visible: boolean) {
  idler.interrupt();
  configMenuElement.style.display = visible ? 'unset' : 'none';
}

function toggleConfigMenu() {
  showConfigMenu(configMenuElement.style.display === 'none');
}

export async function buildConfigMenu() {
  clearDeviceIdButton.onclick = clearDeviceIdAndReload;

  for (const transformElement of transformElements) {
    transformElement.onchange = getAndApplyTransforms;
    transformElement.oninput = getAndApplyTransforms;
  }

  clearTransformationButton.onclick = clearTransforms;
  reloadTransformationButton.onclick = reloadTransforms;
  storeTransformationButton.onclick = getAndStoreTransforms;

  contentElement.onclick = toggleConfigMenu;
  hideConfigMenuButton.onclick = () => showConfigMenu(false);
  clearButton.onclick = () => clearConfig();
}
