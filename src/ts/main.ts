import ready from 'document-ready';

import './domElements';
import {
  cameraSelectorElement,
  clearDeviceIdButton,
  videoElement,
  flipHElement,
  flipVElement,
  scaleElement,
  rotationElement,
  translationXElement,
  translationYElement,
  transformElements,
  accessCameraButton,
  clearTransformationButton,
  reloadTransformationButton,
  storeTransformationButton,
} from './domElements';

const videoConstraints = {
  width: { ideal: 1920 },
  height: { ideal: 1080 },
  frameRate: { ideal: 30.0 },
};

function clearDeviceIdAndReload() {
  localStorage.removeItem('deviceId');
  window.location.reload();
}

function storeCameraId(stream: MediaStream) {
  const deviceId = stream.getVideoTracks()[0].getSettings().deviceId;
  localStorage.setItem('deviceId', deviceId);
  return stream;
}

async function getCameraStreamForId(deviceId) {
  return await navigator.mediaDevices.getUserMedia({
    video: { ...videoConstraints, deviceId: { exact: deviceId } },
  });
}

async function getCameraStream() {
  const storedDeviceId = localStorage.getItem('deviceId');
  if (storedDeviceId !== null) {
    try {
      return await getCameraStreamForId(storedDeviceId);
    } catch (err) {
      if (err instanceof OverconstrainedError) {
        return await selectCamera();
      } else {
        throw err;
      }
    }
  } else {
    return await selectCamera();
  }
}

async function selectCamera() {
  const allDevices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = allDevices.filter((d) => d.kind === 'videoinput');
  while (cameraSelectorElement.children.length > 0) {
    cameraSelectorElement.removeChild(
      cameraSelectorElement.children[cameraSelectorElement.children.length]
    );
  }
  console.log(videoDevices);
  for (let videoDevice of videoDevices) {
    const option = document.createElement('option');
    option.value = videoDevice.deviceId;
    option.innerText = `${videoDevice.label} (${videoDevice.deviceId})`;
    cameraSelectorElement.appendChild(option);
  }
  accessCameraButton.disabled = false;

  return new Promise<MediaStream>((resolve, reject) => {
    accessCameraButton.onclick = async () => {
      try {
        const stream = await getCameraStreamForId(cameraSelectorElement.value);
        accessCameraButton.disabled = true;
        accessCameraButton.onclick = null;
        resolve(storeCameraId(stream));
      } catch (err) {
        alert(
          'Could acquire camera. Please check the console log for details.'
        );
        console.log(err);
        reject(err);
      }
    };
  });
}

function getAndApplyTransforms() {
  applyTransforms(getTransforms());
}

function applyTransforms(transforms: Transforms) {
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

function clearTransforms() {
  for (const transformElement of transformElements) {
    transformElement.value = transformElement.defaultValue;
    transformElement.checked = transformElement.defaultChecked;
  }
  applyTransforms(getTransforms());
}

function reloadTransforms() {
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

function setTransforms(transforms: Transforms) {
  const { translationX, translationY, rotation, scale, flipH, flipV } =
    transforms;
  translationXElement.valueAsNumber = translationX;
  translationYElement.valueAsNumber = translationY;
  rotationElement.valueAsNumber = rotation;
  scaleElement.valueAsNumber = scale;
  flipHElement.checked = flipH;
  flipVElement.checked = flipV;
}

function loadTransforms() {
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

function getAndStoreTransforms() {
  return storeTransforms(getTransforms());
}

async function buildConfigUI() {
  clearDeviceIdButton.onclick = clearDeviceIdAndReload;

  for (const transformElement of transformElements) {
    transformElement.onchange = getAndApplyTransforms;
    transformElement.oninput = getAndApplyTransforms;
  }

  clearTransformationButton.onclick = clearTransforms;
  reloadTransformationButton.onclick = reloadTransforms;
  storeTransformationButton.onclick = getAndStoreTransforms;
}

async function main() {
  await buildConfigUI();
  const transforms = loadTransforms();
  if (transforms !== null) {
    setTransforms(transforms);
    applyTransforms(transforms);
  }
  try {
    const stream = await getCameraStream();
    console.log(stream);
    videoElement.srcObject = stream;
    console.log('Camera access granted.');
  } catch (err) {
    console.log(err);
    console.log('Trying again in 10s.');
    setTimeout(() => window.location.reload(), 10 * 1000);
  }
}

ready(main);
