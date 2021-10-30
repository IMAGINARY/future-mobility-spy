import { videoElement } from './domElements';
import { convertTransformsToCss, Transforms } from './transforms';

const videoConstraints = {
  width: { ideal: 1920 },
  height: { ideal: 1080 },
  frameRate: { ideal: 30.0 },
};

const reconnectionDelay = 10 * 1000;
const defaultDeviceId = '';

export class Camera {
  private deviceId: string;
  private stream: MediaStream;
  private reconnectionTimeout: number;

  public static ondevicechange: Function = undefined;

  protected static lastVideoDeviceInfos: MediaDeviceInfo[] = [];
  private static staticInitializer = () => {
    navigator.mediaDevices.addEventListener('devicechange', () =>
      Camera.handleDeviceChange()
    );
  };

  constructor() {
    this.deviceId = defaultDeviceId;
    this.reconnectionTimeout = 0;
    this.stream = null;

    navigator.mediaDevices.addEventListener('devicechange', async () => {
      if (this.reconnectionTimeout !== 0) {
        await this.tryReconnect();
      }
    });
  }

  static async enumerate(): Promise<MediaDeviceInfo[]> {
    const mediaDeviceInfos = await navigator.mediaDevices.enumerateDevices();
    const videoDeviceInfos = mediaDeviceInfos.filter(
      (d) => d.kind === 'videoinput'
    );
    this.lastVideoDeviceInfos = videoDeviceInfos;
    return videoDeviceInfos;
  }

  getDeviceId(): string {
    return this.deviceId;
  }

  protected getStreamDeviceId() {
    return this.stream !== null
      ? this.stream.getVideoTracks()[0].getSettings().deviceId
      : defaultDeviceId;
  }

  disconnectStream() {
    if (this.stream !== null) {
      this.stream.getVideoTracks()[0].onended = undefined;
      this.stream = null;
      videoElement.src = null;
      videoElement.srcObject = null;
    }
  }

  disconnect() {
    if (this.stream !== null) {
      console.info('Disconnecting camera:', this.getStreamDeviceId());
      this.disconnectStream();
    }
  }

  connectTo(deviceId: string) {
    this.deviceId = deviceId;
    this.disconnect();
    this.tryReconnect().then();
  }

  async tryReconnect() {
    window.clearTimeout(this.reconnectionTimeout);
    this.reconnectionTimeout = 0;
    const deviceId = this.deviceId;
    console.info('Connecting to camera:', deviceId);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { ...videoConstraints, deviceId: { exact: deviceId } },
      });
      if (this.deviceId === deviceId) {
        this.handleConnected(stream);
      }
    } catch (err) {
      console.warn(`Unable to connect to camera (${this.deviceId})`, err);
      console.info(`Attempting reconnecting in ${reconnectionDelay}ms`);
      this.reconnectionTimeout = window.setTimeout(
        () => this.tryReconnect(),
        reconnectionDelay
      );
    }
  }

  protected static async handleDeviceChange() {
    const lastVideoDeviceInfos = this.lastVideoDeviceInfos;
    const videoDeviceInfos = await this.enumerate();
    console.info('Device list changed:', videoDeviceInfos);
    if (typeof this.ondevicechange === 'function') {
      if (lastVideoDeviceInfos.length !== videoDeviceInfos.length) {
        this.ondevicechange();
      } else {
        for (const videoDeviceInfo of videoDeviceInfos) {
          const idx = lastVideoDeviceInfos.findIndex(
            (i) => i.deviceId === videoDeviceInfo.deviceId
          );
          if (idx === -1) {
            // an element changed in the list
            this.ondevicechange();
            return;
          }
        }
      }
    }
  }

  protected handleConnected(stream: MediaStream) {
    if (this.stream !== null) {
      this.stream.getVideoTracks()[0].onended = undefined;
    }
    this.stream = stream;
    console.info('Camera connected:', this.deviceId);
    const { width, height } = stream.getVideoTracks()[0].getSettings();
    videoElement.srcObject = stream;
    videoElement.width = width;
    videoElement.height = height;
    stream.getVideoTracks()[0].onended = () => this.handleDisconnected();
  }

  protected handleDisconnected() {
    console.warn('Camera disconnected:', this.deviceId);
    this.disconnectStream();
    this.tryReconnect().then();
  }

  applyTransforms(transforms: Transforms) {
    videoElement.style.transform = convertTransformsToCss(transforms);
  }
}
