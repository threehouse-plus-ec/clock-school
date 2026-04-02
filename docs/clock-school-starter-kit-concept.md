# Clock School Starter Kit

**Tier 1C Field Deployment · March 2026**

**Endorsement Marker:** Local candidate framework under local stewardship. Stability claims refer to the electrical output of GPS-disciplined oscillators, not to student apparatus or acoustic signals.

**Companion document:** Before connecting instruments, characterise the local noise environment — temperature, magnetic field, pressure. See the [Local Data Collection Guide](local-data-collection-guide.md), which uses open-access databases and smartphone sensors (phyphox) to build a noise budget for the deployment site.

**Related hardware specifications:**

- The [Equipment Inventory](clock-school-prototype-inventory.md) describes the **AIMS-Cameroon Tier 1C (RF) deployment** — a research-grade kit using pre-built OCXOs and an oscilloscope for direct 10 MHz comparison.
- The [Tier 1 Hardware Specification](../hardware/bom/tier-1-hardware-spec.md) describes the **minimal audio-band Tier 1B/1C** — an XR2206 function generator compared via laptop sound card and Beat Lab, with no oscilloscope required.

---

## Architecture

Three devices. One is GPS-disciplined (the atomic reference). One is a free-running crystal VCO that drifts (the physics). One is a 3-in-1 instrument that measures, generates, and displays (the laboratory). Together they cover all three frequency regimes — acoustic, ultrasonic, and RF — on a single bench.

| Device | Role | Stability | Cost |
|---|---|---|---|
| Leo Bodnar LBE-1420 GPSDO | Atomic reference | ~10⁻¹² (GPS-disciplined) | ~€170 |
| 10 MHz VCXO (breadboard kit) | Free-running VCO | ~10⁻⁴ to 10⁻³ (temperature-dependent) | ~€4 |
| FNIRSI 1014D (default) | Oscilloscope + DDS generator | ~10⁻⁵ (crystal-referenced DDS) | ~€145 |
| FNIRSI 2C53P (portable alt.) | Oscilloscope + multimeter + DDS generator | ~10⁻⁵ (crystal-referenced DDS) | ~€120 |

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
| GPS antenna | **Included** (active patch, magnetic base, 5 m cable, SMA male) |
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

## 3. Oscilloscope / Signal Generator

Two options are presented. The FNIRSI 1014D is the recommended default for bench use. The FNIRSI 2C53P is the portable alternative for field deployments and demonstrations.

### Option A (Default) — FNIRSI 1014D

#### Principle

The FNIRSI 1014D is a benchtop 2-in-1 instrument combining a dual-channel digital oscilloscope with a DDS signal generator. Its 100 MHz bandwidth and 1 GSa/s sampling rate capture 10 MHz square waves with harmonics up to the 5th, providing rich waveform detail for Regime 3. The 7" display is large enough for teaching demonstrations to small groups. The built-in 1 GB storage holds up to 1000 waveform captures, exportable via USB — useful for documenting measurements and building Allan deviation datasets in Tier 2.

**As oscilloscope:** Captures the GPSDO output on Channel 1 and the VCXO output on Channel 2. The 100 MHz bandwidth displays 10 MHz signals cleanly with visible harmonic structure. The math functions (CH1−CH2, FFT) can extract beat frequency directly.

**As signal generator:** The built-in DDS outputs 14 waveforms. It serves as a third oscillator — crystal-referenced, stable to ~10⁻⁵, intermediate between the GPSDO and the VCXO. With three oscillators, triangular closure becomes testable. The unique "chopping" feature can capture and replay arbitrary waveform segments.

**No built-in multimeter.** A separate multimeter (~€10–20) is needed for voltage checks and continuity testing during breadboard assembly.

**No built-in battery.** The 1014D is powered via USB 5V/2A. A USB power bank (already in the accessories list) provides portable operation for ~5 hours.

#### Specifications

| Parameter | Value |
|---|---|
| Oscilloscope channels | 2 |
| Bandwidth | 100 MHz × 2 |
| Sampling rate | 1 GSa/s |
| Vertical sensitivity | 50 mV/div – 100 V/div |
| Max input voltage | ±400V peak |
| Math functions | +, −, ×, ÷, FFT |
| Trigger modes | Auto, normal, single |
| Display | 7" TFT LCD, 800×480, high contrast |
| Storage | 1 GB (1000 screenshots + 1000 waveform sets) |
| Signal generator | 14 waveforms + chopping, 2.5 Vpp, frequency step 1 Hz |
| Data export | USB to PC |
| Power | USB 5V/2A (adapter included) |
| Dimensions | 310 × 145 × 70 mm, fold-out stand |
| Included | 2× 100 MHz probes (1×/10× switchable), 1× P4100 100:1 HV probe, croc clip, USB cable, 5V/2A power adapter, manual |

#### Product Links and Price

- Manufacturer: [FNIRSI Technology](https://www.fnirsi.com)
- Product page: [FNIRSI 1014D](https://www.fnirsi.com/products/1014d)
- Elektor review: [Elektor Magazine](https://www.elektormagazine.com/review/fnirsi-1014d-digital-storage-oscilloscope-review)
- Price: ~$159 USD / ~€145 (FNIRSI official store, AliExpress, or eBay)
- Ships from: China (FNIRSI direct), or EU/US warehouse depending on seller

**Note on claimed specifications:** Independent reviews (EEVBlog, Kerry Wong) have found that the 1014D's true ADC clock rate may be ~200 MHz rather than 1 GHz, with interpolation filling the gap. The effective bandwidth is closer to 30–50 MHz for clean square wave reproduction. For Clock School's 10 MHz Regime 3 work, this is adequate — the fundamental and first several harmonics are captured cleanly. The 1014D should not be treated as a calibration-grade instrument.

### Option B (Portable Alternative) — FNIRSI 2C53P

#### Principle

The FNIRSI 2C53P is a handheld 3-in-1 instrument combining a dual-channel digital oscilloscope, a true RMS multimeter, and a DDS signal generator. It is battery-powered (4000 mAh, ~4 h runtime), fits in a bag, and integrates a multimeter — making it the better choice for field demonstrations, conference presentations, or deployments where no bench is available.

The tradeoff: smaller screen (4.3" vs 7"), lower bandwidth (50 MHz vs 100 MHz), lower sampling rate (250 MSa/s vs 1 GSa/s). For Regime 3 at 10 MHz, 50 MHz bandwidth captures the fundamental cleanly but shows fewer harmonics than the 1014D.

#### Specifications

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

#### Product Links and Price

- Product page: [FNIRSI 2C53P](https://www.fnirsi.com/products/2c53p)
- Elektor review (of 2C53T, same architecture): [Elektor Magazine](https://www.elektormagazine.com/review/fnirsi-2c53t-50-mhz-two-channel-oscilloscope-multimeter-generator-review)
- Price: ~$130 USD / ~€120 (FNIRSI official store, AliExpress, or eBay)

**Note:** The 2C53T (same form factor) has only a 50 kHz signal generator — insufficient for Regime 3. The 2C53P's 10 MHz DDS is the reason to choose the P model.

### Comparison Summary

| Feature | 1014D (default) | 2C53P (portable) |
|---|---|---|
| Bandwidth | 100 MHz | 50 MHz |
| Sampling rate | 1 GSa/s | 250 MSa/s |
| Display | 7" LCD | 4.3" touchscreen |
| Multimeter | No (separate required) | Yes (built-in) |
| Battery | No (USB powered) | Yes (4 h) |
| Signal gen. max freq | ~10 MHz | 10 MHz (sine) |
| Storage | 1 GB, 1000 waveforms | Screenshots, USB export |
| Probes included | 2× 100 MHz + 1× HV | 2× P6100 + croc + DMM leads |
| Price | ~€145 | ~€120 |
| Best for | Bench, teaching, detailed analysis | Field, demos, portability |

---

## Connectors: SMA and BNC — A Short Primer

This kit uses two types of RF connectors. Understanding them prevents confusion during setup.

**BNC (Bayonet Neill–Concelman)** is the standard connector on oscilloscope inputs and probes. It is a push-and-twist bayonet lock, roughly 15 mm in diameter. All oscilloscope channels and the signal generator output use BNC.

**SMA (SubMiniature version A)** is a smaller, threaded connector used on the GPSDO output and its GPS antenna port. It is roughly 6 mm in diameter and mates by screwing (do not over-tighten — finger-tight is sufficient for these signal levels).

The kit requires one **SMA-to-BNC cable** to connect the GPSDO to the oscilloscope. This is the single most important accessory cable — without it, the atomic reference cannot reach the scope. When ordering, verify the gender: the GPSDO has SMA female outputs, so the cable needs an **SMA male** plug on that end; oscilloscope inputs are BNC female, so the cable needs a **BNC male** plug on the other end.

> **Quick reference:**
> - GPSDO output → **SMA female** socket → needs **SMA male** plug
> - GPSDO antenna port → **SMA female** socket → antenna cable has **SMA male** plug (included)
> - Oscilloscope input → **BNC female** socket → needs **BNC male** plug
> - Key cable: **SMA male ↔ BNC male**, 50 cm, 50Ω (RG316 or RG58)

**Impedance:** All cables in this kit should be 50Ω. This is the standard for RF test equipment. Do not use 75Ω cables (commonly sold for TV/video applications) — they will work electrically at these power levels, but may cause reflections that distort waveform shape at 10 MHz.

---

## How They Work Together

### Regime 1 — Acoustic (440 Hz)

GPSDO programmed to 440.000 Hz → speaker (via SMA-to-croc adapter). VCXO not used (below crystal oscillator range). Scope DDS set to ~440 Hz → second speaker. Beat audible. Scope shows both waveforms.

For Regime 1, the scope's DDS replaces the VCXO as the free-running source (the DDS is stable but can be deliberately offset). The VCXO enters at Regime 3.

### Regime 3 — RF (10 MHz)

GPSDO programmed to 10.000000 MHz → oscilloscope Channel 1 (via SMA-to-BNC cable). VCXO output (~10 MHz, drifting) → oscilloscope Channel 2 (via wire or BNC pigtail). The scope triggers on Channel 1 and the VCXO waveform drifts across the screen — visible proof of frequency offset. The scope's DDS at 10 MHz provides a third comparison point.

With the 1014D, the 100 MHz bandwidth shows the 10 MHz fundamental and harmonics up to the 5th; with the 2C53P, the 50 MHz bandwidth captures the fundamental cleanly with fewer harmonics visible.

### Three-Clock Network

| Source | Connects to | Role |
|---|---|---|
| GPSDO (10 MHz) | Scope CH1 | Reference (atomic) |
| VCXO (10 MHz) | Scope CH2 | Free-running VCO (drifts) |
| Scope DDS (10 MHz) | BNC generator output | Stable secondary (crystal) |

Pairwise comparisons: GPSDO vs VCXO (large drift), GPSDO vs DDS (small drift), DDS vs VCXO (intermediate). If the three pairwise differences don't sum to zero, something is wrong — and the residual localises the fault. This is the seed of Tier 2.

---

## Included with Each Device

### LBE-1420 (ships from Leo Bodnar, UK)

- LBE-1420 GPSDO unit (SMA female output, SMA female antenna port)
- **Active GPS antenna with magnetic base, 5 m cable, SMA male connector — included in the box, no separate purchase required**
- USB-C cable (power and configuration)
- Pre-configured to 10 MHz output (reconfigurable via Windows utility)

### FNIRSI 1014D (default — ships from FNIRSI or AliExpress, China)

- 1014D oscilloscope/signal generator unit
- 2× 100 MHz oscilloscope probes (1×/10× switchable, BNC male)
- 1× P4100 100:1 high-voltage probe
- 1× crocodile clip cable (BNC)
- USB cable (data export)
- 5V/2A USB power adapter
- User manual

### FNIRSI 2C53P (portable alternative — ships from FNIRSI or AliExpress, China)

- 2C53P instrument unit
- 2× P6100 10:1 oscilloscope probes (BNC male)
- 1× crocodile clip probe (BNC male)
- 1× multimeter probe set (banana plugs)
- USB-C cable (charging and data export)
- Storage bag
- User manual

### 10 MHz VCXO (self-sourced components)

- See BOM in Section 2 above. No pre-packaged kit exists.

---

## Additional Accessories Required

These items are not included with any device and must be ordered separately.

### Cables and Adapters

| Item | Purpose | Qty | Approx. price | Source |
|---|---|---|---|---|
| SMA male to BNC male cable (50 cm, 50Ω, RG58 or RG316) | Connects GPSDO SMA output to oscilloscope BNC input — **the single most important accessory cable** | 1 | ~€3 | [AliExpress](https://www.aliexpress.com/w/wholesale-SMA-male-BNC-male-cable-RG316.html), [eBay](https://www.ebay.com/sch/i.html?_nkw=SMA+male+BNC+male+cable+50cm) |
| SMA male to croc clip cable (or SMA male to bare wire pigtail) | Connects GPSDO output to breadboard or speaker for Regime 1 | 1 | ~€2 | [AliExpress](https://www.aliexpress.com/w/wholesale-SMA-male-crocodile-clip-cable.html) |
| BNC male to croc clip cable | Connects oscilloscope signal generator BNC output to breadboard or speaker | 1 | incl. | Included with both 1014D and 2C53P (croc clip probe/cable) |

See the [Connectors: SMA and BNC](#connectors-sma-and-bnc--a-short-primer) section above for gender and impedance details.

### Attenuation

| Item | Purpose | Qty | Approx. price | Source |
|---|---|---|---|---|
| SMA 20 dB attenuator (50Ω, inline) | Reduces GPSDO 3.3V CMOS output (+11 dBm) to safe oscilloscope input level when using 1× probe setting | 1 | ~€3 | [AliExpress](https://www.aliexpress.com/w/wholesale-SMA-attenuator-20dB.html), [eBay](https://www.ebay.com/sch/i.html?_nkw=SMA+20dB+attenuator+50+ohm) |

**Note:** Both oscilloscopes accept up to ±400V peak, and the GPSDO output is only 3.3V, so direct connection is safe electrically. However, at 1× probe ratio the 3.3V signal may overdrive the ADC at sensitive vertical settings. Using the 10:1 probe (included with both models) avoids this entirely. The attenuator is optional but recommended for clean waveforms when connecting via SMA-to-BNC cable rather than probe.

### Audio Output (Regime 1 — Speaker Driver)

| Item | Purpose | Qty | Approx. price | Source |
|---|---|---|---|---|
| PAM8403 stereo class-D amplifier module | Drives two small speakers from oscillator outputs | 1 | ~€1.50 | [AliExpress](https://www.aliexpress.com/w/wholesale-PAM8403-amplifier-module.html) |
| Small speakers, 4–8Ω, 28–40 mm | Audible beat note output | 2 | ~€0.50 each | [AliExpress](https://www.aliexpress.com/w/wholesale-small-speaker-8ohm-40mm.html) |
| 3.5 mm audio cable, male-male (30 cm) | Signal input to PAM8403 (if using its 3.5 mm jack input) | 1 | ~€0.50 | Any |

### Power

| Item | Purpose | Qty | Approx. price | Source |
|---|---|---|---|---|
| USB-C power adapter (5V, 2A or higher) | Mains power for both devices (both are USB-C) | 1 | ~€3 | Any; locally available |
| Solar power bank (20000 mAh+, USB-C output, 5V/2A+) | Field use without mains; solar top-up during extended outdoor sessions | 1 | ~€15–25 | [AliExpress](https://www.aliexpress.com/w/wholesale-solar-power-bank-20000mAh-USB-C.html), locally available |
| Portable power station (300W, LiFePO4, AC+USB-C output, solar input) | Full power independence — runs oscilloscope, GPSDO, soldering iron, and laptop from battery; recharges via mains, car, or solar panel | 0–1 | ~€200–250 | [AliExpress](https://www.aliexpress.com/w/wholesale-portable-power-station-300W-LiFePO4.html) |
| USB-C to USB-C cable (1 m) | Spare / second device power | 1 | ~€2 | Any |

> **Why a solar power bank?** In locations with unreliable mains power or where outdoor GPS antenna placement requires working away from wall sockets, a solar-equipped power bank provides resilience. The built-in solar panel is best understood as a top-up feature — it extends runtime on sunny days but is too slow to serve as the primary charging method. Always charge the bank fully from mains or a USB adapter before a measurement session.
>
> **What to look for:** 20000 mAh or larger capacity; at least one USB-C output port rated at 5V/2A (required for the oscilloscope); dual USB outputs (to power GPSDO and oscilloscope simultaneously); IP65 or higher waterproof rating if the bank will be used outdoors. Foldable-panel models (3 panels, ~6W total) charge faster via solar than single-panel models (~2W) but are bulkier.

> **Full power independence (optional).** For deployment sites with unreliable or absent mains power, a portable power station with AC output replaces the wall socket entirely. A 300W / ~300 Wh LiFePO4 unit provides approximately 6–8 hours of continuous operation for the GPSDO + oscilloscope (~15 W combined), with USB-C and 220V AC outlets. It recharges from mains, a car cigarette lighter, or a solar panel (100W panel recommended, sold separately). This is a larger investment (~€200–250) but converts the entire kit into a self-contained, mains-independent laboratory. LiFePO4 chemistry is preferred over lithium-ion for safety, thermal stability, and cycle life (~3000 cycles).

**Note:** The LBE-1420 (250 mA) is USB-C powered. The 1014D is USB powered (5V/2A adapter included). The 2C53P is USB-C powered (charging at 5V/2A). A dual-port USB power adapter or a power bank with two USB outputs can run the GPSDO and either oscilloscope simultaneously.

### Soldering Iron (optional)

Not required for breadboard assembly of the VCXO (no soldering needed). Recommended if the VCXO circuit will be moved to a permanent perfboard, or if the kit will serve as a general-purpose electronics workstation.

| Item | Purpose | Qty | Approx. price | Source |
|---|---|---|---|---|
| FNIRSI HS-02B soldering iron (standard package, 1 tip, without adapter) | USB-C powered, 100W, 2s heat-up, 100–450°C, 0.96" display, sleep/auto-off | 1 | ~€27 | [FNIRSI official](https://www.fnirsi.com/products/hs-02), [AliExpress](https://www.aliexpress.com/item/1005006655028971.html), [Amazon](https://www.amazon.com/dp/B0DYXN6X62) |
| Solder wire (0.8 mm, 63/37 Sn-Pb, rosin core, 50 g) | Leaded solder — easier to work with for beginners | 1 | ~€3 | [AliExpress](https://www.aliexpress.com/w/wholesale-solder-wire-0.8mm-63-37.html) |
| Solder wick (2.5 mm desoldering braid) | For correcting mistakes | 1 | ~€1 | Any |
| **Subtotal (soldering option)** | | | **~€31** | |

**Why the HS-02B:** It is USB-C powered (PD/QC protocol) — the same power bank and cables that power the GPSDO and oscilloscope also power the soldering iron. No separate mains-voltage soldering station needed. The iron heats to working temperature in 2–3 seconds, has preset temperature groups, and fits in a small tool bag. The 100W adapter included with the 1014D can also power the iron directly. Tom's Hardware rated it "solid hardware, good software, and a low price" ([review](https://www.tomshardware.com/maker-stem/fnirsi-hs-02-review)).

**HS-02A vs HS-02B:** The HS-02A uses longer tips (9 cm, F245 series) and has 6 tips included in the full kit. The HS-02B uses shorter tips (210 series) and includes 3 tips. For through-hole breadboard-to-perfboard work, either is adequate. The HS-02B is slightly cheaper and heats ~1 second faster.

**If a soldering iron is already available** at the host institution, this item can be skipped entirely.

### GPS Antenna Placement

The LBE-1420 **ships with** a magnetic-base active GPS antenna and 5 m cable (SMA male) — no separate antenna purchase is needed. For reliable GPS lock:

- Place the antenna on a metal surface (e.g. window frame, filing cabinet, metal roof edge) near a window with clear sky view, or outdoors. In tropical climates with open corridors or covered walkways, placing the antenna just outside under open sky usually gives fast acquisition.
- GPS acquisition takes ~30 seconds with a clear view, longer indoors or with obstructed sky.
- If the included 5 m cable is too short to reach a window or outdoor placement, a longer replacement antenna cable is available: [SDR-Kits replacement antenna](https://www.sdr-kits.net/LBE-1420-GPS-Clock) or any active GPS antenna with SMA male connector and 3.3V–5V power compatibility.

| Item | Purpose | Qty | Approx. price | Source |
|---|---|---|---|---|
| GPS antenna extension (SMA male-female, 5–10 m, RG58) | Only if the included 5 m antenna cable is insufficient | 0–1 | ~€5 | [AliExpress](https://www.aliexpress.com/w/wholesale-SMA-extension-cable-GPS-RG58.html) |

### Breadboard and Prototyping (for VCXO)

| Item | Purpose | Qty | Approx. price | Source |
|---|---|---|---|---|
| Mini breadboard, 170 tie-points | VCXO circuit assembly | 1 | €1.50 | [AliExpress](https://www.aliexpress.com/w/wholesale-mini-breadboard-170.html) |
| Jumper wire set, male-to-male, 20+ pcs | Breadboard wiring | 1 | €1.00 | Any |
| Wire strippers / side cutters (small) | Component lead trimming | 1 | ~€3 | Any; likely available at host institution |

---

## Cost Summary

### Option A — With FNIRSI 1014D (default, benchtop)

| Category | Items | Approx. cost |
|---|---|---|
| **Leo Bodnar LBE-1420 GPSDO** | Unit + **included antenna** + USB-C cable | ~€170 |
| **FNIRSI 1014D** | Unit + 2 probes + HV probe + croc clip + USB + 5V adapter | ~€145 |
| **Basic multimeter** | Required (1014D has no DMM); any 2000+ counts unit | ~€10–20 |
| **10 MHz VCXO components** | 74HC04 + crystal + varicap + caps + resistors + pot | ~€1.50 |
| **Cables and adapters** | SMA-BNC cable, SMA-croc cable, SMA attenuator | ~€8 |
| **Audio output** | PAM8403 + 2 speakers + audio cable | ~€3 |
| **Power** | Solar power bank + spare cable (mains adapter included with 1014D) | ~€17–27 |
| **Breadboard and prototyping** | Breadboard + jumper wires + cutters | ~€5.50 |
| **GPS antenna extension** | Only if 5 m cable insufficient | €0–5 |
| **Soldering iron (optional)** | FNIRSI HS-02B + solder + wick | ~€31 |
| **Portable power station (optional)** | 300W LiFePO4, AC+USB-C output, solar-rechargeable | ~€200–250 |
| | | |
| **Subtotal (without options)** | | **~€362–390** |
| **Subtotal (with soldering iron)** | | **~€393–421** |
| **Subtotal (with power station)** | | **~€562–640** |
| **Subtotal (with both options)** | | **~€593–671** |
| **Shipping estimate** | UK + China to destination | ~€15–30 |
| **Customs estimate (varies by country)** | 15–30% on declared value | ~€55–200 |
| **Total landed estimate** | Base: **~€435–530** / Full: **~€670–900** | |

### Option B — With FNIRSI 2C53P (portable alternative)

| Category | Items | Approx. cost |
|---|---|---|
| **Leo Bodnar LBE-1420 GPSDO** | Unit + **included antenna** + USB-C cable | ~€170 |
| **FNIRSI 2C53P** | Unit + 2 probes + croc clip + multimeter leads + USB-C + bag | ~€120 |
| **10 MHz VCXO components** | 74HC04 + crystal + varicap + caps + resistors + pot | ~€1.50 |
| **Cables and adapters** | SMA-BNC cable, SMA-croc cable, SMA attenuator | ~€8 |
| **Audio output** | PAM8403 + 2 speakers + audio cable | ~€3 |
| **Power** | USB-C adapter + solar power bank + spare cable | ~€20–30 |
| **Breadboard and prototyping** | Breadboard + jumper wires + cutters | ~€5.50 |
| **GPS antenna extension** | Only if 5 m cable insufficient | €0–5 |
| **Soldering iron (optional)** | FNIRSI HS-02B + solder + wick | ~€31 |
| **Portable power station (optional)** | 300W LiFePO4, AC+USB-C output, solar-rechargeable | ~€200–250 |
| | | |
| **Subtotal (without options)** | | **~€329–363** |
| **Subtotal (with soldering iron)** | | **~€360–394** |
| **Subtotal (with power station)** | | **~€529–613** |
| **Subtotal (with both options)** | | **~€560–644** |
| **Shipping estimate** | UK + China to destination | ~€15–30 |
| **Customs estimate (varies by country)** | 15–30% on declared value | ~€50–195 |
| **Total landed estimate** | Base: **~€395–500** / Full: **~€635–870** | |

---

## What This Kit Enables

| Exercise | Setup | Measurement |
|---|---|---|
| Environmental characterisation | Smartphone + phyphox app + open data | Local noise budget (see [Local Data Collection Guide](local-data-collection-guide.md)) |
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
7. FNIRSI, *1014D Product Page*. [fnirsi.com](https://www.fnirsi.com/products/1014d)
8. FNIRSI, *2C53P Product Page*. [fnirsi.com](https://www.fnirsi.com/products/2c53p)
9. Elektor Magazine, *FNIRSI 1014D Digital Storage Oscilloscope Review*. [Elektor](https://www.elektormagazine.com/review/fnirsi-1014d-digital-storage-oscilloscope-review)
10. Tom's Hardware, *FNIRSI HS-02 Review: Keep Soldering On!* [Tom's Hardware](https://www.tomshardware.com/maker-stem/fnirsi-hs-02-review)

---

**See also:**

- [Local Data Collection Guide](local-data-collection-guide.md) — Environmental noise characterisation with open data and smartphone sensors
- [Clock School Blueprint](blueprint.md) — Full programme design (v0.3)
- [Clock School README](../README.md) — Programme overview and entry points

---

*Clock School — What Is a Clock?*
*Starter Kit Specification v0.3 · March 2026*
*CC BY-SA 4.0*
