import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getDay from "date-fns/getDay";
import getHour from "date-fns/getHours";
import getMinute from "date-fns/getMinutes";
import getSeconds from "date-fns/getSeconds";

import sum from "lodash/sum";

// Heavily inspired by [DataToByteArrayConverter.kt](https://github.com/fossasia/badge-magic-android/blob/master/app/src/main/java/org/fossasia/badgemagic/data/device/DataToByteArrayConverter.kt)

export type Message = {
  flash: boolean;
  marquee: boolean;
  mode?: number;
  speed?: number;
  data: Uint8Array;
};

export type MessageConverter = (messages: Array<Message>) => Uint8Array;

export const MAX_MESSAGES = 8;
export const PACKET_BYTE_SIZE = 16;
export const MAX_MESSAGE_SIZE = 2 ** 16;

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

export const convertOptions: MessageConverter = messages => {
  const ret = new Uint8Array(MAX_MESSAGES);

  messages.forEach(({ mode = 0, speed = 0 }, index) => {
    ret[index] = (mode & 0xff) | (speed & 0xff);
  });

  return ret;
};

export const convertSizes: MessageConverter = messages => {
  const ret = new Uint8Array(MAX_MESSAGES * 2);

  messages.forEach(({ data }, i) => {
    const index = i * 2;
    const size = data.length;

    ret[index] = (size >> 8) & 0xff;
    ret[index + 1] = size & 0xff;
  });

  return ret;
};

export const concat = (...slices: Array<Uint8Array>): Uint8Array => {
  const ret = new Uint8Array(sum(slices.map(x => x.length)));

  let offset = 0;
  slices.forEach(slice => {
    ret.set(slice, offset);
    offset += slice.length;
  });

  return ret;
};

export const convertMessages: MessageConverter = messages =>
  concat(...messages.map(({ data }) => data));

const packetStart = Uint8Array.of(0x77, 0x61, 0x6e, 0x67, 0x00, 0x00);

export const convertHeader: MessageConverter = messages =>
  concat(
    packetStart,
    convertFlash(messages),
    convertMarquee(messages),
    convertOptions(messages),
    convertSizes(messages),
    new Uint8Array(6),
    getTimestamp(),
    new Uint8Array(4),
    new Uint8Array(16)
  );

export const convert: MessageConverter = messages => {
  if (messages.length > MAX_MESSAGES) {
    throw new Error(
      `messages.length (${messages.length}) > MAX_MESSAGES (${MAX_MESSAGES})`
    );
  }
  messages.forEach(({ data }, i) => {
    if (data.length > MAX_MESSAGE_SIZE) {
      throw new Error(
        `messages[${i}].length (${data.length}) > MAX_MESSAGE_SIZE (${MAX_MESSAGE_SIZE})`
      );
    }
  });

  const header = convertHeader(messages);
  const body = convertMessages(messages);

  const currentLength = header.length + body.length;
  const additionalLength =
    (currentLength / (PACKET_BYTE_SIZE * 2) + 1) * PACKET_BYTE_SIZE * 2 -
    currentLength;

  const converted = new Uint8Array(currentLength + additionalLength);
  converted.set(header, 0);
  converted.set(body, header.length);

  return converted;
};
