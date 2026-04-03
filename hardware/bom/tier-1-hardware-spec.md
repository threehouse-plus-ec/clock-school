# Tier 1 — Hardware Oscillator Comparison

**Two-Box Architecture: XR2206 + Reference**

**Endorsement Marker:** Local candidate framework under local stewardship. Stability claims refer to the compared electrical signals and software-derived beat measurements, not to an externally certified metrological standard.

Specification v0.3 · March 2026

---

## Purpose

This specification defines the hardware for Tier 1 of the Clock School programme. The student compares a free-running oscillator with a reference oscillator, observes the beat note, and measures drift over time — the same comparison logic as Tier 0 (Sun vs pendulum vs household clock), now implemented with electronics.

The architecture uses two off-the-shelf modules and a laptop. No breadboard wiring. No soldering. No mixer hardware. The comparison is performed in software by the Beat Lab browser interface.

**Related hardware specifications:**

- The [Starter Kit](../../docs/clock-school-starter-kit-concept.md) describes a **general-purpose Tier 1C field deployment** — a GPSDO + breadboard VCXO + oscilloscope kit covering acoustic through RF regimes.
- The [10-MHz Demonstrator Lab Guide](../../docs/clock-school-demonstrator-guide.md) describes the **AIMS-Cameroon Tier 1C (RF) deployment** — a research-grade kit using pre-built OCXOs and an oscilloscope for direct 10 MHz comparison, with a digital twin notebook and curated references.

---

## Architecture

Two signal sources, both operating in the audio band (~5 kHz), connected to a laptop sound card via audio cables. Beat Lab analyses the combined signal and extracts the beat frequency.

```
┌──────────────────┐          ┌──────────────────────────┐
│   Reference       │          │   Free-running oscillator │
│                   │          │                           │
│  Tier 1B: AD9833  │          │  XR2206 function          │
│  (crystal DDS)    │          │  generator kit             │
│                   │          │  (assembled, ~€4)          │
│  Tier 1C: LBE-1420│          │                           │
│  (GPS atomic ref) │          │  Frequency set by          │
│                   │          │  potentiometer — drifts    │
└────────┬──────────┘          └────────────┬──────────────┘
         │ audio cable                      │ audio cable
         │                                  │
    ┌────▼──────────────────────────────────▼────┐
    │        Laptop sound card                    │
    │        (stereo: left = ref, right = VCO)    │
    │                                             │
    │   Beat Lab (browser) performs:              │
    │   • FFT of combined signal                  │
    │   • beat frequency extraction               │
    │   • measurement logging + CSV export        │
    └─────────────────────────────────────────────┘
```

No physical mixer is required. Both signals are audio-frequency. The sound card captures them; Beat Lab does the comparison digitally. This eliminates the most failure-prone component in the previous design.

---

## Design Constraints

| Constraint | Tier 1B (crystal ref) | Tier 1C (GPS ref) |
|---|---|---|
| Total kit cost | ~€10–15 | ~€180–190 |
| Oscilloscope required | No | No |
| Soldering required | No (assembled XR2206) | No |
| Breadboard wiring | No | No |
| RF alignment | No (audio band) | No (audio band) |
| Power | USB + 9V battery or USB-to-9V | USB-C + 9V |
| Assembly time | < 10 min (connect cables) | < 10 min |
| Parts sourcing | AliExpress / global | leobodnar.com + AliExpress |
| Host device | Laptop with sound card | Laptop with sound card |
| Beat frequency range | 100 Hz – 10 kHz | 100 Hz – 10 kHz |

---

## Two Tiers, Same Exercise

### Tier 1B — Crystal Reference (self-sourced, ~€10–15)

The reference oscillator is an AD9833 DDS module driven by an Arduino. The DDS is crystal-referenced (25 MHz crystal on the module), stable to ~ppm level. The student programmes it to 5000 Hz. It does not drift measurably within a lab session.

This is the entry-level hardware tier: cheap, globally shippable, adequate for learning comparison, drift, and beat-note analysis. The reference is "good enough" but not traceable to atomic time.

### Tier 1C — GPS Atomic Reference (donation-funded, ~€180)

The reference oscillator is a Leo Bodnar LBE-1420 GPSDO, programmed to output 5000 Hz. Its long-term stability is defined by GPS caesium references and approaches 1×10⁻¹². It comes with an active GPS antenna and is powered via USB-C.

This is the research-grade reference. The student is now comparing a free-running oscillator against atomic time — the same kind of measurement a national metrology institute performs, at a fraction of the cost. One LBE-1420 per school or institution, shared by students.

### In both cases

The free-running oscillator is the same: an XR2206 function generator kit. The cables, the sound card, and the Beat Lab interface are the same. The exercises are the same. The only difference is the quality of the reference — and understanding that difference is itself a lesson.

---

## Bill of Materials

### Free-Running Oscillator (both tiers)

| # | Component | Description | Est. Price | Source |
|---|---|---|---|---|
| 1 | XR2206 function generator kit (assembled) | Pre-assembled PCB with potentiometers for frequency and waveform control. Sine/triangle/square output. 1 Hz – 1 MHz. | €3–5 | AliExpress, eBay, Banggood |
| 2 | 9V battery + clip, or USB-to-9V boost cable | Power for XR2206 (requires 9–12V DC). USB-to-9V cable recommended for sustained use. | €2–3 | AliExpress |
| 3 | 3.5 mm audio cable (mono or stereo) | Signal output from XR2206 to sound card. May need a simple voltage divider (two resistors) if output is too hot for mic input. | €1 | AliExpress, local |

### Reference Oscillator — Tier 1B

| # | Component | Description | Est. Price | Source |
|---|---|---|---|---|
| 4a | AD9833 DDS module (CJMCU-9833) | Crystal-referenced DDS. SPI-programmable. 0–12.5 MHz. | €3–4 | AliExpress |
| 5a | Arduino Nano (or any SPI-capable board) | Programmes the DDS frequency. Upload sketch once. | €2–4 | AliExpress |
| 6a | USB cable for Arduino | Power and programming. | €0.50 | Often included |
| 7a | 3.5 mm audio cable | DDS output to sound card (second channel). | €1 | AliExpress, local |

**Tier 1B total: ~€12–18**

### Reference Oscillator — Tier 1C

| # | Component | Description | Est. Price | Source |
|---|---|---|---|---|
| 4b | Leo Bodnar LBE-1420 GPSDO | GPS-locked clock source. 1 Hz – 1.1 GHz programmable output. 3.3V CMOS square wave, 50Ω. Includes active GPS antenna. USB-C powered. | ~€170 | leobodnar.com |
| 5b | SMA-to-3.5mm adapter cable | Connects LBE-1420 SMA output to sound card. May need a resistive attenuator (the GPSDO outputs 3.3V logic levels; the sound card expects millivolts). | €3–5 | AliExpress |

**Tier 1C total: ~€180–190**

### Signal Conditioning Note

Both the XR2206 and the LBE-1420 output signals at levels that may be too high for a laptop microphone input (which expects millivolts). A simple resistive voltage divider — two resistors forming a 100:1 or 1000:1 attenuator — may be needed between each source and the sound card. The exact ratio depends on the sound card's input sensitivity.

The assembly guide will include instructions for building a simple attenuator from two resistors and testing whether the signal clips in Beat Lab. This is itself a measurement lesson: understanding input dynamic range and signal conditioning.

Alternatively, a laptop line-in input (if available) typically accepts higher levels and may not require attenuation.

---

## Frequency Plan

Both oscillators operate near 5000 Hz. The student adjusts the XR2206 potentiometer to bring its frequency close to the reference. The beat note — the frequency difference — falls in the audio band.

| Parameter | Value | Notes |
|---|---|---|
| Reference frequency | 5000 Hz | Set by Arduino sketch (1B) or LBE-1420 config (1C) |
| XR2206 target frequency | ~5000 Hz | Set by potentiometer |
| Beat frequency | 0–500 Hz (adjustable) | Determined by |f_ref − f_XR2206| |

**Why 5 kHz?** Both signals are comfortably in the audio band. The beat is audible. The sound card captures it cleanly. The FFT in Beat Lab resolves both peaks easily. No RF considerations.

**Why not lower?** Beat frequencies below ~50 Hz may be attenuated by the sound card's DC-blocking capacitors. Keeping the reference at 5 kHz and the XR2206 close to it ensures beats stay well above this cutoff.

---

## Exercise Sequence

### Exercise 1.1 — First Beat

**Goal:** Observe a beat note between the reference and the XR2206.

1. Power the reference oscillator (upload Arduino sketch for Tier 1B, or plug in the LBE-1420 for Tier 1C and wait for GPS lock).
2. Power the XR2206 (9V battery or USB-to-9V cable).
3. Connect both outputs to the laptop sound card (one per stereo channel, or both into a Y-adapter for mono input).
4. Open Beat Lab in the browser. Switch to Microphone mode.
5. Turn the XR2206 frequency potentiometer slowly until you hear a pulsing beat.
6. Record the beat frequency in Beat Lab.

**Notebook question:** What happens to the beat frequency as you turn the potentiometer? Can you make the beat very slow? What does a 1 Hz beat sound like? What does a 500 Hz beat sound like?

### Exercise 1.2 — Measuring Drift

**Goal:** Observe that the XR2206 drifts over time without intervention.

1. Set the XR2206 so the beat is approximately 200 Hz. Do not touch it again.
2. Record the beat frequency every 30 seconds for 10 minutes using Beat Lab's Record button.
3. Export the log as CSV.
4. Plot beat frequency vs time.

**Notebook questions:** Does the beat frequency stay constant? Does it drift? Which direction? How fast? What could cause the drift — temperature, battery voltage, component ageing? How does this compare to the equation-of-time drift you observed in Experiment 0.1?

### Exercise 1.3 — Temperature Sensitivity

**Goal:** Measure how temperature affects the XR2206's frequency.

1. Set the beat to approximately 200 Hz at room temperature.
2. Gently warm the XR2206 board by placing your hand on it (or placing it near a warm lamp). Record the beat frequency.
3. Cool it by moving it near an open window or placing a cool object nearby. Record.
4. Compare: how many Hz did the frequency shift per degree of temperature change?

**Notebook questions:** Which component is temperature-sensitive — the XR2206 IC, the timing capacitor, or the timing resistor? How would you design an oscillator that is less sensitive to temperature? (This is the problem that oven-controlled crystal oscillators solve.)

### Exercise 1.4 — Manual Discipline

**Goal:** Experience what it means to discipline an oscillator.

1. Set the beat to approximately 500 Hz.
2. Try to keep it at exactly 500 Hz by adjusting the potentiometer in real time for 5 minutes, correcting for drift.
3. Record the beat frequency every 15 seconds.
4. Compare to the free-running drift data from Exercise 1.2.

**Notebook questions:** How well could you stabilise the beat? What limited you — reaction time, potentiometer resolution, or something else? This is exactly what a phase-locked loop does automatically. You have been the feedback controller.

### Exercise 1.5 — Reference Quality (Tier 1C only)

**Goal:** Compare the crystal reference (Tier 1B) with the GPS reference (Tier 1C).

1. First, run Exercise 1.2 using the AD9833 DDS as the reference. Record the drift.
2. Then replace the DDS with the LBE-1420 GPSDO (set to 5000 Hz, GPS locked). Repeat Exercise 1.2.
3. Compare the two datasets.

**Notebook questions:** Does the beat drift differently with the two references? If the XR2206 drift looks the same in both cases, what does that tell you about which oscillator is the dominant source of instability? If it looks different, what changed? What does "atomic reference" actually mean for your measurement?

### Exercise 1.6 — Export to Tier 2

**Goal:** Bridge hardware measurement to numerical analysis.

1. Take the CSV data from Exercise 1.2 (10 minutes of beat frequency measurements).
2. Open a Tier 2 Jupyter notebook.
3. Convert beat frequency time series to fractional frequency deviation.
4. Compute the Allan deviation.
5. Compare to the simulated noise models from Tier 2.

**Notebook question:** What noise type best describes your XR2206? White frequency? Flicker? Random walk? Does the Allan deviation slope match any of the canonical power-law models?

---

## Forward Compatibility

The architecture is designed so upgrades require no changes to the analysis chain:

| Upgrade | What changes | What stays the same |
|---|---|---|
| Tier 1B → Tier 1C | Replace DDS with LBE-1420 GPSDO | XR2206, cables, sound card, Beat Lab |
| Add second XR2206 | Two free-running oscillators + one reference | Sound card, Beat Lab, exercises |
| Add USB oscilloscope | Direct waveform observation | Everything else |
| Tier 1 → Tier 2 | Export CSV into Jupyter notebook | Data format, analysis concepts |

---

## Deployment Model

**Tier 1B (self-sourced):** Any student can buy the components for ~€15. The XR2206 and AD9833 are globally available. No institutional support needed.

**Tier 1C (donation-funded):** One LBE-1420 GPSDO per school, club, or partner institution. The GPSDO stays at the institution; students rotate through it. Cost per unit: ~€180. A donation campaign framed as "give a school an atomic clock" is compelling for fundraising.

**AIMS Cameroon pilot:** One LBE-1420 shipped to AIMS Limbe serves Jonas Wangnamou's essay work (caesium time standard for Central Africa) and remains as a permanent teaching instrument for future AIMS cohorts.

---

## Known Limitations

**The XR2206 is not a precision oscillator.** Its frequency tolerance is poor and it drifts with temperature. This is a feature: it drifts enough to observe within minutes, making it ideal as the "clock under test."

**Sound card input sensitivity varies.** Some laptops have aggressive AGC or noise suppression on the microphone input that distorts the signal. Beat Lab's microphone mode requests these features to be disabled, but not all browsers or devices honour the request. A line-in input (if available) is more reliable. The assembly guide will include a signal-level test procedure.

**The LBE-1420 outputs a 3.3V CMOS square wave.** This is far too high for a microphone input. Attenuation is mandatory for Tier 1C. The spec includes instructions for a two-resistor voltage divider.

**Beat frequencies below ~50 Hz may be attenuated by the sound card.** Exercises are designed to keep beats above 100 Hz for reliable measurement.

**Browser audio timing is not metrology-grade.** Beat Lab uses the Web Audio API, which introduces millisecond-level jitter. This does not affect spectral analysis but should not be confused with precision timestamping.

---

## Safety

Both modules operate at low DC voltages (5V USB, 9V battery). No hazardous voltages, no laser sources, no significant RF emissions. Standard electronics handling applies: do not short battery terminals; disconnect power before changing connections.

---

## Bill of Materials Summary

### Minimum Kit (Tier 1B — crystal reference)

| Item | Est. Price |
|---|---|
| XR2206 function generator (assembled) | €4 |
| AD9833 DDS module | €3 |
| Arduino Nano | €3 |
| USB-to-9V boost cable | €2 |
| 2× audio cables | €2 |
| 4× resistors (voltage divider) | €0.10 |
| **Total** | **~€14** |

### Full Kit (Tier 1C — GPS atomic reference)

| Item | Est. Price |
|---|---|
| XR2206 function generator (assembled) | €4 |
| Leo Bodnar LBE-1420 GPSDO | €170 |
| SMA-to-3.5mm adapter + attenuator | €5 |
| USB-to-9V boost cable | €2 |
| Audio cable | €1 |
| **Total** | **~€182** |

---

## Speaker Driver (standard component)

Both oscillators should drive speakers or piezoelectric elements so the beat is audible before it is measured digitally. See the [speaker driver concept note](../../docs/speaker-driver-concept.md) for details, safety notes, and the three-regime frequency progression.

**Recommended:** PAM8403 stereo class-D amplifier module (~€1.50) + two small speakers (~€0.50 each). USB 5V powered. One channel per oscillator. Volume control on board.

**Fallback:** Two piezoelectric discs (27 mm, ~€0.30 each), wired directly to oscillator outputs.

---

## References

1. W. J. Riley, *Handbook of Frequency Stability Analysis*, NIST SP 1065, 2008. [NIST](https://www.nist.gov/publications/handbook-frequency-stability-analysis)
2. D. W. Allan, N. Ashby, C. C. Hodge, *The Science of Timekeeping*, HP Application Note 1289, 1997. [PDF](https://www.allanstime.com/Publications/DWA/Science_Timekeeping.pdf)
3. Leo Bodnar Electronics, *LBE-1420 GPSDO Datasheet*, v1.1, 2025. [PDF](https://leobodnar.com/files/datasheets/LBE-1420-Datasheet-DRAFT-17-01-2025.pdf)
4. Exar Corporation, *XR2206 Monolithic Function Generator Datasheet*. [Datasheet](https://www.alldatasheet.com/datasheet-pdf/view/48088/EXAR/XR2206.html)
5. Analog Devices, *AD9833 Programmable Waveform Generator Datasheet*, Rev. E. [Product page](https://www.analog.com/en/products/ad9833.html)
6. U. Warring, *Causal Clock Unification Framework*, Zenodo v1.0.0. [DOI: 10.5281/zenodo.17948436](https://doi.org/10.5281/zenodo.17948436)

---

*Clock School — What Is a Clock? · Tier 1 Hardware Specification · v0.3*
*CC BY-NC-SA 4.0 · Ulrich Warring and contributors*
