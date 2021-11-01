import {
  cameraSelectorElement,
  configMenuElement,
  contentElement,
  flipHElement,
  flipVElement,
  hideConfigMenuButton,
  loadButton,
  loadDefaultsButton,
  reloadPageMenuButton,
  requestCameraPermissionButton,
  rotationElement,
  scaleElement,
  storeButton,
  storeCameraCheckbox,
  storeTransformsCheckbox,
  transformElements,
  translationXElement,
  translationYElement,
} from './domElements';
import { Camera } from './camera';
import { Transforms } from './transforms';
import {
  Idler,
  KeyboardInterrupter,
  PointerInterrupter,
} from '@imaginary-maths/idler';
import { Storage } from './storage';

interface StorageFlags {
  camera: boolean;
  transforms: boolean;
}

export class ConfigMenu {
  private static instancePromise: Promise<ConfigMenu> = null;
  protected idler: Idler;
  protected camera: Camera;

  protected deviceId: string;
  protected transforms: Transforms;

  protected constructor() {
    Camera.ondevicechange = () => this.onDeviceChange();
    this.camera = new Camera();

    this.loadTransforms();
    this.loadDeviceId();

    const onTransformsChangedCb = () => this.handleTransformsChanged();
    for (const transformElement of transformElements) {
      transformElement.onchange = onTransformsChangedCb;
      transformElement.oninput = onTransformsChangedCb;
    }

    contentElement.onclick = () => this.toggle();
    hideConfigMenuButton.onclick = () => this.show(false);
    reloadPageMenuButton.onclick = () => location.reload();

    loadButton.onclick = () => this.load();
    storeButton.onclick = () => this.store();
    loadDefaultsButton.onclick = () => this.loadDefaults();

    cameraSelectorElement.onchange = () => this.handleCameraSelected();
    requestCameraPermissionButton.onclick = async () =>
      this.handleRequestCameraPermission();

    // Hide config menu after hideDelay ms
    const hideDelay = 20 * 1000;
    this.idler = new Idler(
      new PointerInterrupter(configMenuElement),
      new KeyboardInterrupter()
    );
    this.idler.addCallback({
      delay: hideDelay,
      onBegin: () => this.show(false),
    });
  }

  getDeviceId(): string {
    return this.deviceId;
  }

  setDeviceId<T extends string | MediaStream>(
    deviceIdOrStream: T
  ): T extends string ? string : MediaStream {
    const deviceId =
      typeof deviceIdOrStream === 'string'
        ? deviceIdOrStream
        : deviceIdOrStream.getVideoTracks()[0].getSettings().deviceId;
    cameraSelectorElement.value = deviceId;
    this.deviceId = deviceId;
    this.camera.connectTo(deviceId);
    return deviceIdOrStream as T extends string ? string : MediaStream;
  }

  loadDefaultDeviceId() {
    const defaultDeviceId = Storage.getDefaultDeviceId();
    this.setDeviceId(defaultDeviceId);
    return defaultDeviceId;
  }

  loadDeviceId() {
    const deviceId = Storage.loadDeviceId();
    this.setDeviceId(deviceId);
    return deviceId;
  }

  storeDeviceId() {
    Storage.storeDeviceId(this.getDeviceId());
  }

  getTransforms(): Transforms {
    return { ...this.transforms };
  }

  setTransforms(transforms: Transforms): Transforms {
    const { translationX, translationY, rotation, scale, flipH, flipV } =
      transforms;
    translationXElement.valueAsNumber = translationX;
    translationYElement.valueAsNumber = translationY;
    rotationElement.valueAsNumber = rotation;
    scaleElement.valueAsNumber = scale;
    flipHElement.checked = flipH;
    flipVElement.checked = flipV;
    this.transforms = transforms;
    this.camera.applyTransforms(transforms);
    return transforms;
  }

  loadDefaultTransforms(): Transforms {
    const defaultTransforms = Storage.getDefaultTransforms();
    this.setTransforms(defaultTransforms);
    return defaultTransforms;
  }

  loadTransforms(): Transforms {
    const transforms = Storage.loadTransforms();
    this.setTransforms(transforms);
    return transforms;
  }

  storeTransforms() {
    Storage.storeTransforms(this.getTransforms());
  }

  async updateCameraSelector(
    videoDeviceInfos: MediaDeviceInfo[]
  ): Promise<void> {
    while (cameraSelectorElement.children.length > 0) {
      cameraSelectorElement.removeChild(
        cameraSelectorElement.children[
          cameraSelectorElement.children.length - 1
        ]
      );
    }

    function createOption(deviceId, label) {
      const option = document.createElement('option');
      option.value = deviceId;
      option.innerText = `${label}`;
      if (deviceId !== '') {
        option.innerText += `(${deviceId})`;
      }
      return option;
    }

    const myDeviceId = this.getDeviceId();
    let hasMyDeviceId = false;
    for (let videoDeviceInfo of videoDeviceInfos) {
      hasMyDeviceId = hasMyDeviceId || videoDeviceInfo.deviceId === myDeviceId;
      const option = createOption(
        videoDeviceInfo.deviceId,
        videoDeviceInfo.label
      );
      cameraSelectorElement.appendChild(option);
    }
    if (!hasMyDeviceId) {
      const label =
        myDeviceId === Storage.getDefaultDeviceId()
          ? '--- please select ---'
          : '--- selected, but unavailable ---';
      const option = createOption(myDeviceId, label);
      cameraSelectorElement.appendChild(option);
    }
    cameraSelectorElement.value = myDeviceId;
  }

  getStorageFlags(): StorageFlags {
    return {
      camera: storeCameraCheckbox.checked,
      transforms: storeTransformsCheckbox.checked,
    };
  }

  loadDefaults() {
    const { camera, transforms } = this.getStorageFlags();
    if (camera) {
      this.loadDefaultDeviceId();
    }
    if (transforms) {
      this.loadDefaultTransforms();
    }
  }

  load() {
    const { camera, transforms } = this.getStorageFlags();
    if (camera) {
      this.loadDeviceId();
    }
    if (transforms) {
      this.loadTransforms();
    }
  }

  store() {
    const { camera, transforms } = this.getStorageFlags();
    if (camera) {
      this.storeDeviceId();
    }
    if (transforms) {
      this.storeTransforms();
    }
  }

  async onDeviceChange() {
    await this.updateCameraSelector(await Camera.enumerate());
  }

  async handleCameraSelected() {
    this.setDeviceId(cameraSelectorElement.value);
  }

  handleTransformsChanged() {
    const transforms = {
      translationX: translationXElement.valueAsNumber,
      translationY: translationYElement.valueAsNumber,
      rotation: rotationElement.valueAsNumber,
      scale: scaleElement.valueAsNumber,
      flipH: flipHElement.checked,
      flipV: flipVElement.checked,
    };
    this.setTransforms(transforms);
  }

  async handleRequestCameraPermission() {
    requestCameraPermissionButton.disabled = true;
    requestCameraPermissionButton.classList.remove('failed', 'succeeded');
    const granted = await Camera.requestPermission();
    const cssClass = granted ? 'succeeded' : 'failed';
    requestCameraPermissionButton.classList.add(cssClass);
    if (granted) {
      await this.updateCameraSelector(await Camera.enumerate());
    }
    requestCameraPermissionButton.disabled = false;
  }

  isVisible(): boolean {
    return configMenuElement.style.display === 'block';
  }

  show(visible: boolean) {
    this.idler.interrupt();
    configMenuElement.style.display = visible ? 'block' : 'none';
  }

  toggle() {
    this.show(!this.isVisible());
  }

  static async getInstance(): Promise<ConfigMenu> {
    if (!this.instancePromise) {
      this.instancePromise = new Promise<ConfigMenu>(
        async (resolve, reject) => {
          const instance = new ConfigMenu();
          await instance.updateCameraSelector(await Camera.enumerate());
          resolve(instance);
        }
      );
    }
    return await this.instancePromise;
  }
}
