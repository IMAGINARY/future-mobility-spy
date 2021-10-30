import { Transforms } from './transforms';

export class Storage {
  static getDefaultDeviceId(): string {
    return '';
  }

  static loadDeviceId(): string {
    return localStorage.getItem('deviceId') ?? this.getDefaultDeviceId();
  }

  static storeDeviceId<T extends string | MediaStream>(
    deviceIdOrStream: T
  ): T extends string ? string : MediaStream {
    const deviceId =
      typeof deviceIdOrStream === 'string'
        ? deviceIdOrStream
        : deviceIdOrStream.getVideoTracks()[0].getSettings().deviceId;
    localStorage.setItem('deviceId', deviceId);
    return deviceIdOrStream as T extends string ? string : MediaStream;
  }

  static resetDeviceId() {
    this.storeDeviceId(this.getDefaultDeviceId());
  }

  static getDefaultTransforms(): Transforms {
    return {
      translationX: 0.0,
      translationY: 0.0,
      rotation: 0.0,
      scale: 1.0,
      flipH: false,
      flipV: false,
    };
  }

  static loadTransforms() {
    try {
      const transformsString = localStorage.getItem('transforms');
      const transforms = JSON.parse(transformsString) as Transforms;
      return { ...this.getDefaultTransforms(), ...transforms };
    } catch (e) {
      console.log(e);
      return this.getDefaultTransforms();
    }
  }

  static storeTransforms(transforms: Transforms) {
    localStorage.setItem('transforms', JSON.stringify(transforms));
    return transforms;
  }

  static resetTransforms() {
    this.storeTransforms(this.getDefaultTransforms());
  }

  static reset(what?: { deviceId?: boolean; transforms?: boolean }) {
    const resetAll = { deviceId: true, transforms: true };
    what = { ...resetAll, ...what };
    if (what.deviceId) Storage.resetDeviceId();
    if (what.transforms) Storage.resetTransforms();
  }
}
