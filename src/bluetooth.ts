export const hasBluetooth = (): boolean => {
  return navigator.bluetooth !== undefined;
};
