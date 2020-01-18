// UUIDs copied from https://github.com/fossasia/badge-magic-android
export const serviceUUID = "0000fee0-0000-1000-8000-00805f9b34fb";
export const characteristicUUID = "0000fee1-0000-1000-8000-00805f9b34fb";

export const getAvailability = async (): Promise<boolean> => {
  const bluetooth = navigator.bluetooth;

  if (!bluetooth) {
    return false;
  }

  return bluetooth.getAvailability();
};

export const filters = [{ services: [serviceUUID] }];

export type ConnectionInfo = {
  server: BluetoothRemoteGATTServer;
  service: BluetoothRemoteGATTService;
  characteristic: BluetoothRemoteGATTCharacteristic;
};

export const connect = async (): Promise<ConnectionInfo | undefined> => {
  const device = await navigator.bluetooth.requestDevice({ filters });
  const server = await device.gatt?.connect();

  if (!server) {
    return;
  }

  const service = await server.getPrimaryService(serviceUUID);
  const characteristic = await service.getCharacteristic(characteristicUUID);

  return { server, service, characteristic };
};

export const write = async (
  { characteristic }: ConnectionInfo,
  data: ArrayBuffer,
  chunkSize: number
) => {
  for (let offset = 0; offset <= data.byteLength; offset += chunkSize) {
    await characteristic.writeValue(data.slice(offset, offset + chunkSize));
  }
};

export const disconnect = ({ server }: ConnectionInfo) => {
  server.disconnect();
};
