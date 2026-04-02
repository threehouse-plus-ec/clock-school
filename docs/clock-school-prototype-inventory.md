# Clock School (Prototype v0.3) — Equipment Inventory

**Programme:** [Clock School — What Is a Clock?](https://threehouse-plus-ec.github.io/clock-school/)
**Last updated:** 2 April 2026

---

## What is in the kit?

This page lists all the equipment for the Clock School teaching lab at AIMS-Cameroon. The kit lets you compare different types of clocks and measure how stable they are. You will use a GPS-locked clock as your reference and compare it to free-running oscillators using an oscilloscope.

**How this document relates to other hardware specifications:**

- This inventory describes the **AIMS-Cameroon Tier 1C (RF) deployment** — a research-grade kit that compares 10 MHz signals from OCXOs against a GPSDO using an oscilloscope.
- The [Starter Kit](clock-school-starter-kit-concept.md) describes a **general-purpose Tier 1C field deployment** — a lighter kit using a breadboard VCXO instead of pre-built OCXOs, covering acoustic through RF regimes.
- The [Tier 1 Hardware Specification](../hardware/bom/tier-1-hardware-spec.md) describes the **minimal audio-band Tier 1B/1C** — an XR2206 function generator compared via laptop sound card and Beat Lab, with no oscilloscope required.

**A note for students:** This inventory tells you *what* each device does, not *how* it works. Understanding the principles behind each piece of equipment is part of your learning. Read the datasheets, search online, ask questions, experiment. The links and keywords here are starting points — dig deeper.

---

## The GPS Clock (Reference)

**Leo Bodnar LBE-1420 GPSDO**

This is a GPS-disciplined oscillator — a small box that outputs a very precise 10 MHz signal. It locks its internal oscillator to GPS satellites, which carry atomic (caesium) clocks. The result is a frequency reference stable to about 1 part in 10¹² (0.000001 ppm).

- Output: 10 MHz square wave, SMA connector, 50Ω
- Power: 5V via USB-A cable
- Comes with: active GPS antenna (magnetic base, 5 m cable, SMA connector)
- Setup: place the antenna near a window with sky view, connect USB for power, wait ~30 seconds for GPS lock

**Keywords to explore:** GPSDO, GPS disciplined oscillator, caesium frequency standard, phase-locked loop (PLL), frequency stability, Allan deviation.

| Item | Qty |
|---|---|
| LBE-1420 GPSDO unit | 1 |
| GPS antenna (active, magnetic base, 5 m cable) | 1 |
| USB-A cable | 1 |

---

## The Free-Running Oscillators

**10 MHz OCXO modules (oven-controlled crystal oscillators)**

These are crystal oscillators with a built-in heater (oven) that keeps the crystal at a constant temperature. This makes them much more stable than a bare crystal, but they still drift slowly compared to the GPS clock. Typical stability: ~10⁻⁸ to 10⁻⁹.

When you power on an OCXO, the oven needs a few minutes to warm up. During warm-up, the frequency drifts noticeably — you can watch this happen on the oscilloscope. After stabilisation, the drift becomes very slow.

Three modules from two different suppliers are included. This lets you compare unit-to-unit variation and pick the best one.

- Output: 10 MHz, SMA connector
- Power: DC, supplied through LM2596 step-down converter from 12V power supply

**Keywords to explore:** OCXO, oven-controlled crystal oscillator, quartz crystal resonator, temperature coefficient of frequency, warm-up drift.

| Item | Qty |
|---|---|
| 10 MHz OCXO reference module (SMA output) | 3 (from two suppliers) |
| LM2596 DC-DC step-down converter | 2 |
| 12V 3A power supply with DC connectors | 2 |

---

## The Oscilloscope

**FNIRSI 2C53P — 3-in-1 instrument**

This is your main measurement tool. It combines three instruments in one:

1. **Oscilloscope** — shows voltage signals over time. Two channels, 50 MHz bandwidth, 250 MSa/s sampling rate. Use this to display and compare the 10 MHz signals from the GPSDO and the OCXO simultaneously.
2. **Multimeter** — measures voltage, current, resistance, capacitance, temperature, and more. 4.5-digit display (19999 counts).
3. **Signal generator** — produces test signals (sine, square, triangle, etc.) up to 25 MHz. Useful for testing and calibration.

- Display: 4.3" touchscreen
- Battery: 4000 mAh Li-ion, rechargeable via USB-C
- Oscilloscope inputs: 2× BNC
- Multimeter inputs: banana plugs

**Keywords to explore:** oscilloscope, time base, trigger, sampling rate, bandwidth, Nyquist theorem, BNC connector, impedance matching.

| Item | Qty |
|---|---|
| FNIRSI 2C53P oscilloscope/multimeter/generator | 1 |

---

## The RF Cables and Adapters

These cables connect the oscillators (SMA output) to the oscilloscope (BNC input). Getting the connectors and impedance right matters — a wrong cable can distort or block the signal entirely.

**SMA Male to BNC Male cable, RG316, 50Ω, 1 m**

- SMA end connects to the GPSDO or OCXO output
- BNC end connects to the oscilloscope input
- RG316 is a thin, flexible 50Ω coaxial cable
- Two cables included — one for each oscilloscope channel

**How to verify the cable is correct:**
- SMA end: small threaded connector with a pin sticking out (male)
- BNC end: larger bayonet connector with a pin sticking out (male)
- Cable or packaging says 50Ω (not 75Ω — that is for video, not RF)

**Keywords to explore:** coaxial cable, characteristic impedance, 50Ω vs 75Ω, SMA connector, BNC connector, signal reflection, impedance mismatch.

| Item | Qty |
|---|---|
| SMA male → BNC male cable, RG316, 50Ω, 1 m | 2 |
| BNC male → BNC male cable, 50Ω, 2 m | 2 |

The BNC-to-BNC cables are from our lab in Freiburg. They connect directly to the oscilloscope inputs and are useful for signal routing, testing, and future extensions.

---

## The Temperature Sensors

**NTC 10K 1% 3950 thermistor, waterproof probe, 2 m cable**

A thermistor is a resistor whose resistance changes with temperature. "NTC" means negative temperature coefficient — resistance goes down as temperature goes up. This one reads about 10 kΩ at 25°C.

You use it by measuring the resistance with the multimeter (2C53P or a separate one), then converting to temperature using the datasheet formula or a lookup table.

Why is this in a clock kit? Because oscillator frequency depends on temperature. If you tape this sensor to the OCXO body and record resistance over time while simultaneously recording the frequency on the oscilloscope, you can directly measure the correlation between temperature and frequency drift. This is how real clock engineers build noise budgets.

**Keywords to explore:** NTC thermistor, Steinhart-Hart equation, B-value (3950), temperature coefficient, noise budget, environmental sensitivity.

| Item | Qty |
|---|---|
| NTC 10K 1% 3950 thermistor, waterproof, 2 m cable | 5 |

---

## How it all connects

```
                   ┌─────────────┐
                   │  GPS Antenna │  (near window, sky view)
                   └──────┬──────┘
                          │ SMA
                   ┌──────┴──────┐
  USB-A (5V) ────→│  LBE-1420   │ GPS-disciplined oscillator
                   │   GPSDO     │ Stability: ~10⁻¹²
                   └──────┬──────┘
                          │ SMA (10 MHz out)
                          │
              BNC-SMA cable (RG316, 50Ω)
                          │
                   ┌──────┴──────┐
                   │  FNIRSI     │
                   │  2C53P      │ Channel 1: GPSDO
                   │  Oscilloscope│ Channel 2: OCXO
                   └──────┬──────┘
                          │ BNC
              BNC-SMA cable (RG316, 50Ω)
                          │
                   ┌──────┴──────┐
  12V PSU → LM2596│  10 MHz     │ Free-running OCXO
   (step-down)  → │  OCXO       │ Stability: ~10⁻⁸–10⁻⁹
                   └─────────────┘

  NTC Thermistor ──→ Multimeter
  (on OCXO body)     → Resistance → Temperature
```

**What you will see:**

Put both 10 MHz signals on the oscilloscope — GPSDO on channel 1, OCXO on channel 2. At first they look identical. But over minutes, you will see the OCXO signal slowly drifting in phase relative to the GPSDO. That drift is the frequency difference between a GPS-locked atomic reference and a free-running crystal.

During OCXO warm-up, the drift is fast and dramatic. After the oven stabilises, it becomes very slow. If you open a window or turn on the air conditioning, you may see the drift speed change — that is the environment affecting the crystal. The NTC thermistor lets you measure this correlation directly.

This is the core Clock School experiment: making stability visible.

---

## Full parts list

| # | Item | Qty |
|---|---|---|
| 1 | Leo Bodnar LBE-1420 GPSDO | 1 |
| 2 | GPS antenna (active, magnetic base, 5 m, SMA) | 1 |
| 3 | USB-A cable | 1 |
| 4 | 10 MHz OCXO reference module (SMA out) | 3 |
| 5 | LM2596 DC-DC step-down converter | 2 |
| 6 | 12V 3A power supply with DC connectors | 2 |
| 7 | FNIRSI 2C53P oscilloscope/multimeter/generator | 1 |
| 8 | SMA male → BNC male cable, RG316, 50Ω, 1 m | 2 |
| 9 | BNC male → BNC male cable, 50Ω, 2 m | 2 |
| 10 | NTC 10K 1% 3950 thermistor, waterproof, 2 m | 5 |

---

*[Clock School — What Is a Clock?](https://threehouse-plus-ec.github.io/clock-school/) · Equipment Inventory · April 2026*
