import font from "./font";
import { Message } from "./lsled";

export type TextMessage = {
  flash: boolean;
  marquee: boolean;
  mode?: number;
  speed?: number;
  text: string;
};

export const emptyTextMessage = (): TextMessage => ({
  flash: false,
  marquee: false,
  text: ""
});

export const toMessage = ({ text, ...rest }: TextMessage): Message => {
  const hexString = Array.from(text)
    .map((char: string): string => font[char] ?? "")
    .join("");

  // https://stackoverflow.com/a/50868276/448591
  const data = new Uint8Array(
    (hexString.match(/.{1,2}/g) ?? []).map(byte => parseInt(byte, 16))
  );

  return { ...rest, data };
};
