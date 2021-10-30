import ready from 'document-ready';

import { applyVideoStream, getCameraStream } from './camera';
import { applyTransforms, loadTransforms, setTransforms } from './transforms';
import { buildConfigMenu } from './config';

async function main() {
  alert(`TODO:
- hide config UI when settings could be loaded from localStorage
- rethink whole camera selection flow
  - what happens if a deviceId has been stored but the device is not available (-> show centered message in dim gray: "Camera connection error", reload after timeout,)
`);

  await buildConfigMenu();
  const transforms = loadTransforms();
  if (transforms !== null) {
    setTransforms(transforms);
    applyTransforms(transforms);
  }
  try {
    const stream = await getCameraStream();
    console.log(stream);
    applyVideoStream(stream);
    console.log('Camera access granted.');
  } catch (err) {
    console.log(err);
    console.log('Trying again in 10s.');
    setTimeout(() => window.location.reload(), 10 * 1000);
  }
}

ready(main);
