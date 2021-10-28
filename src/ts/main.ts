import ready from 'document-ready';

const videoConstraints = {
  width: 1920,
  height: 1080,
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
  const selector = document.getElementById(
    'camera-selector'
  ) as HTMLSelectElement;
  while (selector.children.length > 0) {
    selector.removeChild(selector.children[selector.children.length]);
  }
  console.log(videoDevices);
  for (let videoDevice of videoDevices) {
    const option = document.createElement('option');
    option.value = videoDevice.deviceId;
    option.innerText = `${videoDevice.label} (${videoDevice.deviceId})`;
    selector.appendChild(option);
  }
  const accessCameraButton = document.getElementById(
    'access-camera-button'
  ) as HTMLButtonElement;
  accessCameraButton.disabled = false;

  return new Promise<MediaStream>((resolve, reject) => {
    accessCameraButton.onclick = async () => {
      try {
        const stream = await getCameraStreamForId(selector.value);
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

async function buildConfigUI() {
  const clearDeviceIdButton = document.getElementById('clear-device-id');
  clearDeviceIdButton.onclick = clearDeviceIdAndReload;
}

async function main() {
  await buildConfigUI();
  try {
    const stream = await getCameraStream();
    const videoTag = document.getElementById(
      'camera-video'
    ) as HTMLVideoElement;
    console.log(stream);
    videoTag.srcObject = stream;
    console.log('Camera access granted.');
  } catch (err) {
    console.log(err);
    console.log('Trying again in 10s.');
    setTimeout(() => window.location.reload(), 10 * 1000);
  }
}

ready(main);
