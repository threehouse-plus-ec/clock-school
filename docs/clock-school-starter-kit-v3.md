# Clock School Starter Kit

**Tier 1C Field Deployment · March 2026**

**Endorsement Marker:** Local candidate framework under local stewardship. Stability claims refer to the electrical output of GPS-disciplined oscillators, not to student apparatus or acoustic signals.

---

## Architecture

Three devices. One is GPS-disciplined (the atomic reference). One is a free-running crystal VCO that drifts (the physics). One is a 3-in-1 instrument that measures, generates, and displays (the laboratory). Together they cover all three frequency regimes — acoustic, ultrasonic, and RF — on a single bench.

| Device | Role | Stability | Cost |
|---|---|---|---|
| Leo Bodnar LBE-1420 GPSDO | Atomic reference | ~10⁻¹² (GPS-disciplined) | ~€170 |
| 10 MHz VCXO (breadboard kit) | Free-running VCO | ~10⁻⁴ to 10⁻³ (temperature-dependent) | ~€4 |
| FNIRSI 2C53P | Oscilloscope + multimeter + DDS generator | ~10⁻⁵ (crystal-referenced DDS) | ~€120 |

The three-way comparison — atomic reference vs crystal VCO vs DDS — forms a minimal clock network. Triangular closure (does the sum of pairwise differences equal zero?) is testable on this bench.

---

## 1. GPS-Disciplined Oscillator — Leo Bodnar LBE-1420

### Principle

A GPS-disciplined oscillator (GPSDO) locks a local oscillator to the timing signals broadcast by GPS satellites. Each GPS satellite carries caesium or rubidium atomic clocks; the GPSDO compares its internal oscillator to these references and corrects for drift continuously. The result is a frequency output with long-term stability approaching 1×10⁻¹², traceable to the SI second via the international network of atomic clocks that maintain GPS system time.

The LBE-1420 is programmable: any output frequency from 450 Hz to 800 MHz (and higher harmonics) can be set via a USB configuration utility. Once programmed, the setting is retained in non-volatile memory. The output is a 3.3V CMOS square wave on an SMA connector.

### Specifications

| Parameter | Value |
|---|---|
| Output frequency | Programmable, 450 Hz – 800 MHz |
| Frequency resolution | Sub-Hz steps |
| Long-term stability | ~1×10⁻¹² (after GPS lock) |
| Output level | 3.3V CMOS, 50Ω |
| Connector | SMA female |
| GPS antenna | Included (active patch, SMA) |
| Power | USB-C, 5V |
| Configuration | USB utility (Windows); settings retained |

### Product Link and Price

- Manufacturer: [Leo Bodnar Electronics](https://www.leobodnar.com)
- Product page: [LBE-1420 GPS Clock](https://www.leobodnar.com/shop/index.php?main_page=product_info&products_id=393)
- Datasheet: [LBE-1420 Datasheet PDF](https://leobodnar.com/files/datasheets/LBE-1420-Datasheet-DRAFT-17-01-2025.pdf)
- Price: ~£145 / ~€170 / ~$185 USD
- Ships from: UK

---

## 2. 10 MHz VCXO — Breadboard Kit

### Principle

A voltage-controlled crystal oscillator (VCXO) is a crystal oscillator whose frequency can be shifted slightly ("pulled") by applying a DC voltage to a varicap diode in the resonant circuit. The varicap's capacitance changes with applied voltage, which shifts the crystal's resonant frequency by a few parts per million.

Unlike the GPSDO, a VCXO has no external reference — it is free-running. Its frequency drifts with temperature, supply voltage, and ageing. This drift is exactly what makes it pedagogically valuable: the student sees the frequency wander on the oscilloscope and must compare it to a stable reference to quantify the instability.

The simplest VCXO uses a CMOS inverter gate (74HC04 or CD4069) as the active element, a 10 MHz quartz crystal as the resonator, and a varicap diode (BB112, BB156, or equivalent) as the voltage-tuneable element. A potentiometer sets the control voltage. The entire circuit fits on a small breadboard with fewer than ten components.

### How It Works

```
        +5V
         │
        [R_bias]
         │
  ┌──────┤
  │      ├──[varicap]──┤
  │      │              │
  │    [pot]          [crystal 10MHz]
  │      │              │
  │      ├──────────────┤
  │      │              │
  │    [C_load]       [C_load]
  │      │              │
  │     GND            GND
  │
  └──[74HC04 inverter]──┬── output (10 MHz square wave)
         │               │
        [R_feedback]   [buffer gate]
         │               │
         └───────────────┘
```

The 74HC04 provides the gain. The crystal sets the frequency. The two load capacitors (~22 pF) establish the operating point. The varicap, biased through a resistor from the potentiometer, adds a voltage-dependent capacitance that pulls the crystal frequency by tens of ppm. Turning the pot shifts the frequency; breathing on the crystal shifts it by temperature.

### Bill of Materials

| Component | Description | Qty | Approx. price | Source |
|---|---|---|---|---|
| 74HC04 | Hex inverter, DIP-14 | 1 | €0.20 | [AliExpress](https://www.aliexpress.com/w/wholesale-74HC04-DIP.html), [Mouser](https://www.mouser.com/c/?q=74HC04) |
| 10 MHz crystal | HC-49/S or HC-49/U, fundamental mode | 1 | €0.30 | [AliExpress](https://www.aliexpress.com/w/wholesale-10MHz-crystal-HC49.html) |
| BB112 varicap diode | Or BB156, BB131, MV2109 — any silicon varicap | 1 | €0.30 | [AliExpress](https://www.aliexpress.com/w/wholesale-BB112-varicap.html), [eBay](https://www.ebay.com/sch/i.html?_nkw=BB112+varicap) |
| 22 pF ceramic capacitors | C0G/NP0 preferred | 2 | €0.05 | Any electronics supplier |
| 1 MΩ resistor | Feedback bias for inverter | 1 | €0.02 | Any |
| 100 kΩ resistor | Varicap bias isolation | 1 | €0.02 | Any |
| 100 nF ceramic capacitor | Supply decoupling | 1 | €0.02 | Any |
| 10 kΩ potentiometer | Frequency adjust (varicap control voltage) | 1 | €0.20 | Any |
| Mini breadboard | 170 tie-points | 1 | €1.50 | [AliExpress](https://www.aliexpress.com/w/wholesale-mini-breadboard-170.html) |
| Jumper wire set | Male-to-male | 1 | €1.00 | Any |
| **Total** | | | **~€4** | |

Power: 5V from any USB source. The 74HC04 draws < 10 mA.

Output: 10 MHz square wave, ~3.3V amplitude (at 5V supply), taken from the output of the second inverter gate (used as a buffer). Connect to the oscilloscope via a short wire or BNC pigtail.

### Key Observation

No complete 10 MHz VCXO kit exists as a consumer product. This is assembled from standard components on a breadboard. Assembly takes approximately 15 minutes and requires no soldering. The circuit is well-documented in the literature; see the [ElecCircuit TTL crystal oscillator guide](https://www.eleccircuit.com/simple-crystal-oscillator-circuit/) and the [Circuit Cellar VCXO article](https://circuitcellar.com/research-design-hub/a-look-at-homemade-tcxos-crystal-crafting/) for detailed explanations and schematics.

---

## 3. Oscilloscope / Multimeter / Signal Generator — FNIRSI 2C53P

### Principle

The FNIRSI 2C53P is a handheld 3-in-1 instrument combining a dual-channel digital oscilloscope, a true RMS multimeter, and a DDS (direct digital synthesis) signal generator. In the Clock School context, it serves three roles simultaneously:

**As oscilloscope:** Captures the GPSDO output on Channel 1 and the VCXO output on Channel 2. The 50 MHz bandwidth and 250 MSa/s sampling rate are sufficient to display 10 MHz square waves cleanly (fundamental + first two harmonics). The built-in FFT function can extract the beat frequency directly from the captured waveforms.

**As multimeter:** Measures supply voltages, checks continuity during breadboard assembly, and verifies the varicap control voltage.

**As signal generator:** The built-in DDS outputs sine waves up to 10 MHz and other waveforms up to 5 MHz. This serves as a third oscillator — crystal-referenced, stable to ~10⁻⁵, intermediate between the GPSDO and the VCXO. With three oscillators, triangular closure becomes testable.

### Specifications

| Parameter | Value |
|---|---|
| Oscilloscope channels | 2 |
| Bandwidth | 50 MHz |
| Sampling rate | 250 MSa/s |
| Vertical sensitivity | 10 mV/div – 10 V/div |
| Max input voltage | ±400V peak |
| Math functions | +, −, ×, ÷, FFT |
| Display modes | YT, XY, scroll, persistence |
| Multimeter | 19999 counts, true RMS, AC/DC V/I, R, C, temp, diode, continuity |
| Signal generator | 12 waveforms, sine to 10 MHz, others to 5 MHz, 0.1–3.0 Vpp |
| Display | 4.3" IPS touchscreen, 480×272 |
| Battery | 4000 mAh Li-ion, ~4 h runtime |
| Charging | USB-C, 5V/2A |
| Included | 2× P6100 10:1 probes, croc clip probe, multimeter leads, USB-C cable, storage bag |

### Product Links and Price

- Manufacturer: [FNIRSI Technology](https://www.fnirsi.com)
- Product page: [FNIRSI 2C53P](https://www.fnirsi.com/products/2c53p)
- Elektor review (of 2C53T, same architecture): [Elektor Magazine](https://www.elektormagazine.com/review/fnirsi-2c53t-50-mhz-two-channel-oscilloscope-multimeter-generator-review)
- Price: ~$130 USD / ~€120 (FNIRSI official store, AliExpress, or eBay)
- Ships from: China (FNIRSI direct), or EU/US warehouse depending on seller

**Note:** The 2C53T (handheld, same oscilloscope specs) has only a 50 kHz signal generator — insufficient for Regime 3. The 2C53P's 10 MHz DDS is the reason to choose the P model.

---

## How They Work Together

### Regime 1 — Acoustic (440 Hz)

GPSDO programmed to 440.000 Hz → speaker (via SMA-to-croc adapter). VCXO not used (below crystal oscillator range). 2C53P DDS set to ~440 Hz → second speaker. Beat audible. Scope shows both waveforms.

For Regime 1, the 2C53P's DDS replaces the VCXO as the free-running source (the DDS is stable but can be deliberately offset). The VCXO enters at Regime 3.

### Regime 3 — RF (10 MHz)

GPSDO programmed to 10.000000 MHz → oscilloscope Channel 1 (via SMA-to-BNC adapter). VCXO output (~10 MHz, drifting) → oscilloscope Channel 2 (via wire or BNC pigtail). The scope triggers on Channel 1 and the VCXO waveform drifts across the screen — visible proof of frequency offset. The 2C53P's DDS at 10 MHz provides a third comparison point.

### Three-Clock Network

| Source | Connects to | Role |
|---|---|---|
| GPSDO (10 MHz) | Scope CH1 | Reference (atomic) |
| VCXO (10 MHz) | Scope CH2 | Free-running VCO (drifts) |
| 2C53P DDS (10 MHz) | BNC generator output | Stable secondary (crystal) |

Pairwise comparisons: GPSDO vs VCXO (large drift), GPSDO vs DDS (small drift), DDS vs VCXO (intermediate). If the three pairwise differences don't sum to zero, something is wrong — and the residual localises the fault. This is the seed of Tier 2.

---

## Accessories

| Item | Qty | Approx. price | Notes |
|---|---|---|---|
| SMA male to BNC female adapter | 1 | ~€2 | Connects GPSDO SMA to scope BNC input |
| BNC male-male cable (50 cm) | 1 | ~€3 | Or use included croc clip probes |
| Small speaker (4–8Ω, 40 mm) | 1 | ~€0.50 | Regime 1 audible demonstration |
| USB-C cable (spare) | 1 | ~€1 | Both devices are USB-C powered |
| **Total accessories** | | **~€7** | |

---

## Cost Summary

| Item | Price estimate |
|---|---|
| Leo Bodnar LBE-1420 GPSDO | ~€170 |
| FNIRSI 2C53P | ~€120 |
| 10 MHz VCXO breadboard kit | ~€4 |
| Accessories | ~€7 |
| **Subtotal** | **~€301** |

Shipping and import duties vary by destination. Budget 15–30% additional for customs in countries with significant import levies on electronics.

---

## What This Kit Enables

| Exercise | Setup | Measurement |
|---|---|---|
| 1.0 — Two Tones, One Beat | GPSDO 440 Hz + DDS ~440 Hz → speakers | Beat frequency by ear |
| 1.1 — Beat Lab (browser) | Same setup + laptop microphone | Beat frequency with uncertainty in software |
| VCXO assembly | Breadboard + components | Build a 10 MHz oscillator in 15 minutes |
| Oscilloscope training | Probes on GPSDO and VCXO | Waveform, frequency, amplitude, triggering |
| Stability measurement | GPSDO vs VCXO on scope, log over hours | Visible frequency drift of free-running crystal |
| Temperature sensitivity | Breathe on VCXO crystal, observe on scope | Thermal frequency coefficient, live |
| Manual discipline | Adjust VCXO pot to zero-beat against GPSDO | Student acts as the PLL |
| Three-clock closure | GPSDO + VCXO + DDS, pairwise comparison | Triangular closure residual |
| GPS-referenced tuning fork | GPSDO 440 Hz → speaker | Audible atomic-traceable concert pitch |

---

## References

1. W. J. Riley, *Handbook of Frequency Stability Analysis*, NIST SP 1065, 2008. [NIST](https://www.nist.gov/publications/handbook-frequency-stability-analysis)
2. D. W. Allan, N. Ashby, C. C. Hodge, *The Science of Timekeeping*, HP Application Note 1289, 1997. [PDF](https://www.allanstime.com/Publications/DWA/Science_Timekeeping.pdf)
3. Leo Bodnar Electronics, *LBE-1420 GPSDO Datasheet*, v1.1, 2025. [PDF](https://leobodnar.com/files/datasheets/LBE-1420-Datasheet-DRAFT-17-01-2025.pdf)
4. ElecCircuit, *Simple Crystal Oscillator Circuit Using TTL/CMOS*. [Article](https://www.eleccircuit.com/simple-crystal-oscillator-circuit/)
5. Circuit Cellar, *A Look at Homemade TCXOs — Crystal Crafting*. [Article](https://circuitcellar.com/research-design-hub/a-look-at-homemade-tcxos-crystal-crafting/)
6. Electronics Notes, *VCXO — Voltage Controlled Crystal Oscillator*. [Article](https://www.electronics-notes.com/articles/electronic_components/quartz-crystal-xtal/vcxo-voltage-controlled-crystal-xtal-oscillator.php)
7. FNIRSI, *2C53P Product Page*. [fnirsi.com](https://www.fnirsi.com/products/2c53p)

---

*Clock School — What Is a Clock?*
*Starter Kit Specification v3 · March 2026*
*CC BY-SA 4.0*
