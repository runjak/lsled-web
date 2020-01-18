import fromUnixTime from "date-fns/fromUnixTime";
import {
  convertFlags,
  convertFlash,
  convertMarquee,
  getTimestamp
} from "./lsled";

describe("lsled", () => {
  describe("convertFlags()", () => {
    it("should return [0] given no flags", () => {
      expect(convertFlags([])).toEqual(Uint8Array.of(0));
    });

    it("should return [0] given all false flags", () => {
      expect(
        convertFlags([false, false, false, false, false, false, false, false])
      ).toEqual(Uint8Array.of(0));
    });

    it("should return [5] given flags with that binary representation", () => {
      expect(
        convertFlags([true, false, true, false, false, false, false, false])
      ).toEqual(Uint8Array.of(5));
    });
  });

  describe("convertFlash()", () => {
    it("should convert flash flags as expected", () => {
      expect(
        convertFlash([{ flash: true }, { flash: false }, { flash: true }])
      ).toEqual(Uint8Array.of(5));
    });
  });

  describe("convertMarquee()", () => {
    it("should convert marquee flags as expected", () => {
      expect(convertMarquee([{ marquee: false }, { marquee: true }])).toEqual(
        Uint8Array.of(2)
      );
    });
  });

  describe("getTimestamp()", () => {
    it("should compute the expected timestamp", () => {
      const date = fromUnixTime(1579357722805);

      expect(getTimestamp(() => date)).toEqual(
        Uint8Array.of(49, 10, 3, 7, 33, 25)
      );
    });
  });
});
