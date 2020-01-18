import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getDay from "date-fns/getDay";
import getHour from "date-fns/getHours";
import getMinute from "date-fns/getMinutes";
import getSeconds from "date-fns/getSeconds";

// Heavily inspired by [DataToByteArrayConverter.kt](https://github.com/fossasia/badge-magic-android/blob/master/app/src/main/java/org/fossasia/badgemagic/data/device/DataToByteArrayConverter.kt)

export type Message = {
  flash: boolean;
  marquee: boolean;
};

export type MessageConverter = (messages: Array<Message>) => Uint8Array;

export const MAX_MESSAGES = 8;
export const PACKET_BYTE_SIZE = 16;

export const convertFlags = (flags: Array<boolean>): Uint8Array => {
  const ret = new Uint8Array(1);

  flags.forEach((value, index) => {
    ret[0] |= Number(value) << index;
  });

  return ret;
};

export const convertFlash: MessageConverter = messages =>
  convertFlags(messages.map(({ flash }) => flash));

export const convertMarquee: MessageConverter = messages =>
  convertFlags(messages.map(({ marquee }) => marquee));

const getDate = (): Date => new Date();

export const getTimestamp = (createDate = getDate): Uint8Array => {
  const date = createDate();

  return Uint8Array.of(
    getYear(date) & 0xff,
    getMonth(date) & 0xff,
    getDay(date) & 0xff,
    getHour(date) & 0xff,
    getMinute(date) & 0xff,
    getSeconds(date) & 0xff
  );
};

/*
export const convertOptions: MessageConverter = messages => {};
export const convertSizes: MessageConverter = messages => {};
export const convertMessages: MessageConverter = messages => {};
*/

const packetStart = [0x77, 0x61, 0x6e, 0x67, 0x00, 0x00];

export const convert: MessageConverter = messages => {
  if (messages.length > MAX_MESSAGES) {
    throw new Error(`messages.length (${messages.length}) > ${MAX_MESSAGES}`);
  }

  const ret = new Uint8Array(4 * 16);

  ret.fill(0);

  for (let i = 0; i < packetStart.length; i++) {
    ret[i] = packetStart[i];
  }

  /**
  proto_header = (
  0x77, 0x61, 0x6e, 0x67, 0x00, 0x00, 0x00, 0x00, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  )
  */

  return ret;
};
