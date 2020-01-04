export const hasBluetooth = (): boolean => {
  return navigator.bluetooth !== undefined;
};

export const filters = [{ name: "LSLED" }];

export const connect = async () => {
  const device = await navigator.bluetooth.requestDevice({ filters });

  console.log("found Device:", device.name, device.id, device.gatt?.connected);
};
