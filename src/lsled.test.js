import fromUnixTime from "date-fns/fromUnixTime";
import {
  convertFlags,
  convertFlash,
  convertMarquee,
  getTimestamp,
  convertOptions,
  convertSizes
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

  describe("convertOptions()", () => {
    it("should convert options as expected", () => {
      const options = [
        { mode: 1 },
        { speed: 2 },
        { mode: 1, speed: 2 },
        { mode: 513 },
        { speed: 1026 }
      ];

      const expected = Uint8Array.of(1, 2, 3, 1, 2, 0, 0, 0);

      expect(convertOptions(options)).toEqual(expected);
    });
  });

  describe("convertSizes()", () => {
    it("should convert sizes as expected", () => {
      const sizes = [
        { data: new Uint8Array(5) },
        { data: new Uint8Array(1024 + 512) },
        { data: new Uint8Array(1024 + 5) }
      ];
      const expected = Uint8Array.of(
        0,
        5,
        6,
        0,
        4,
        5,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      );

      expect(convertSizes(sizes)).toEqual(expected);
    });
  });
});
