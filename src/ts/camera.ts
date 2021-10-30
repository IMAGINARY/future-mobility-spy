import {
  accessCameraButton,
  cameraSelectorElement,
  videoElement,
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
      const stream = await getCameraStreamForId(storedDeviceId);
      await fillCameraSelector();
      return stream;
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

async function fillCameraSelector(
  defaultDeviceId: string = undefined
): Promise<void> {
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
  if (typeof defaultDeviceId !== 'undefined') {
    cameraSelectorElement.value = defaultDeviceId;
  }
}

async function selectCamera() {
  await fillCameraSelector();

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

function applyVideoStream(stream: MediaStream) {
  videoElement.srcObject = stream;
  const { width, height } = stream.getVideoTracks()[0].getSettings();
  videoElement.width = width;
  videoElement.height = height;
}

export { clearDeviceIdAndReload, getCameraStream, applyVideoStream };
