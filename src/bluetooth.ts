import { Message, PACKET_BYTE_SIZE, convert } from "./lsled";

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

const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

export const write = async (
  { characteristic }: ConnectionInfo,
  data: ArrayBuffer,
  chunkSize: number
) => {
  for (let offset = 0; offset <= data.byteLength; offset += chunkSize) {
    await characteristic.writeValue(data.slice(offset, offset + chunkSize));
    await sleep(100);
  }
};

export const disconnect = ({ server }: ConnectionInfo) => {
  server.disconnect();
};

export const uploadMessages = async (
  messages: Array<Message>
): Promise<string | undefined> => {
  try {
    const connection = await connect();

    if (connection) {
      await write(connection, convert(messages), PACKET_BYTE_SIZE);

      disconnect(connection);
    }
  } catch (error) {
    console.error("uploadMessages", error);
  }

  return "Connection failed.";
};
