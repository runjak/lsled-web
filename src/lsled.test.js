import { convertFlags, convertFlash, convertMarquee } from "./lsled";

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
});
