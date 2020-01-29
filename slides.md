---
title: WebBluetooth - a quick overview
separator: ---
verticalSeparator: -v-
revealOptions:
  transition: "slide"
---

# WebBluetooth

… a quick overview

-v-

Latest draft:

- [Draft Community Group Report, 2019-11-04](https://webbluetoothcg.github.io/web-bluetooth/)
- [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
- [caniuse](https://caniuse.com/#search=web%20bluetooth)

-v-

## Nomenclature

[§ 5.1. GATT Information Model](https://webbluetoothcg.github.io/web-bluetooth/#information-model)

- <b>G</b>eneric <b>ATT</b>ribute profile (GATT)
- Profile: Services, Characteristics, Descriptors
- Client & Server (who's who?)
- Service discovery (Privacy considerations)
- UUIDs

---

## The hardware

- 11 * 44 LEDs
- Micro USB
- Bluetooth
- Two buttons

-v-

### Related links

- [fossasia](https://fossasia.org/)
- [A tweet on it](https://twitter.com/sicarius/status/1219007839575969793)
- [AliExpress](https://www.aliexpress.com/i/4000156728938.html)
- [Datenblatt, Reichelt](https://cdn-reichelt.de/documents/datenblatt/A500/125904.pdf)

---

## Heavily inspired

On cherry-picking parts

-v-

### Python code

[led-name-badge-ls32 … led-badge-11x44.py](https://github.com/fossasia/led-name-badge-ls32/blob/master/led-badge-11x44.py)

### Kotlin code

[badge-magic-android … DataToByteArrayConverter.kt](https://github.com/fossasia/badge-magic-android/blob/development/BadgeMagicModule/src/commonMain/kotlin/org/fossasia/badgemagic/device/DataToByteArrayConverter.kt)

-v-

### Data format

- Header
- Body

Bluetooth:

- Transfer in 16 byte chunks
- Sleep `~100ms` between chunks

-v-

#### Header format

- Packet start (6 byte)
- Flash flags (1 byte)
- Marquee flags (1 byte)
- Message Options (8 byte)
- Message sizes (8 * 2 byte)
- Padding (6 byte)
- Timestamp (6 byte)
- Padding (4 + 16 byte)

-v-

#### Body format

- Up to 8 Messages (max 2^16 bytes each)
- Rounded up to 16 bytes

-v-

### Text format

- [src/font.ts](https://github.com/runjak/lsled-web/blob/master/src/font.ts)

-v-

#### Text format: A

```javascript
// A: "00386CC6C6FEC6C6C6C600",
const A = [0x00,0x38,0x6C,0xC6,0xC6,0xFE,0xC6,0xC6,0xC6,0xC6,0x00];
// A.map(n => n.toString(2));
// 00000000
// 00111000
// 01101100
// 11000110
// 11000110
// 11111110
// 11000110
// 11000110
// 11000110
// 11000110
// 00000000
```

---

## Code samples

- [src/bluetooth.ts](https://github.com/runjak/lsled-web/blob/master/src/bluetooth.ts)
- [src/lsled.ts](https://github.com/runjak/lsled-web/blob/master/src/lsled.ts)

---

## Demo

---

## Sources

- source: [github.com/runjak/lsled-web](https://github.com/runjak/lsled-web)
- [fossasia](https://fossasia.org/) github
  - [badge-magic-android](https://github.com/fossasia/badge-magic-android)
  - [led-name-badge-ls32](https://github.com/fossasia/led-name-badge-ls32)
