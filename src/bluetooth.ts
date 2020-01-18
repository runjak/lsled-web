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

export const connect = async () => {
  const device = await navigator.bluetooth.requestDevice({ filters });

  console.log("found Device:", device.name, device.id, device.gatt?.connected);

  const connection = await device.gatt?.connect();

  if (!connection) {
    console.log("could not connect :(");
    return;
  }

  const service = await connection.getPrimaryService(serviceUUID);

  console.log("got service:", service.uuid, service.isPrimary);

  const characteristic = await service.getCharacteristic(characteristicUUID);

  console.log("got characteristic:", characteristic.uuid);

  connection.disconnect();
};

export const write = async (
  characteristic: BluetoothRemoteGATTCharacteristic,
  data: ArrayBuffer,
  chunkSize: number
) => {
  for (let offset = 0; offset <= data.byteLength; offset += chunkSize) {
    await characteristic.writeValue(data.slice(offset, offset + chunkSize));
  }
};
