# Speaker Driver and Three Frequency Regimes

**Concept Note — Council-Amended**

Clock School · March 2026 · v0.2

**Endorsement Marker:** Local candidate framework under local stewardship. No parity implied with externally validated metrological standards. Stability claims refer to the electrical output of GPS-disciplined oscillators, not to acoustic signals, student measurements, or pedagogical apparatus.

---

## 1. Proposal

Add speaker output to the Tier 1 hardware kit. Both the reference oscillator (DDS or GPSDO) and the free-running oscillator (XR2206) drive small speakers or piezoelectric elements. The student hears the beat note directly — before any software, any screen, any FFT.

Extend this into a three-regime frequency progression: acoustic (audible carriers), ultrasonic (inaudible carriers, potentially audible beat), and RF (fully instrument-mediated). The progression teaches instrument trust through graduated withdrawal of direct perception.

When the GPSDO is set to 440.000 Hz and connected to a speaker, the result is a GPS-disciplined acoustic oscillator: the electrical signal is traceable to caesium atomic time; the acoustic output is a demonstration of that signal, not a precision reference in itself.

---

## 2. Invariant

What persists across all three regimes is not the sensory form of the signal but the logic of comparison: two oscillators, one difference, one inferred relation.

The sentence for the coastline:

> "In Tier 1, the comparison is first directly heard, then conditionally inferred beyond direct perception, and finally measured by instrumented conversion; the order is intentional."

---

## 3. Three Regimes

### Regime 1 — Acoustic (canonical)

| Parameter | Value |
|---|---|
| Reference frequency | 440 Hz (default), 1000 Hz (scientific), 256 Hz (binary) |
| VCO frequency | ~matching reference |
| Beat frequency | 0.5–10 Hz (countable by ear) |
| Output | Speakers or piezo elements |
| Detector | Ear |
| Status | **Canonical. Load-bearing element of Tier 1.** |

**What it teaches:** Comparison as rhythm. Zero-beat. The ear as measurement instrument. The GPS-disciplined acoustic oscillator (Tier 1C). Cultural connection to music and historical frequency standards.

**Epistemic status:** Both the carriers and the beat are directly perceptible. The student's body is the entire measurement chain.

**Perception limits (refined per Council review):** Counting beats is reliable below approximately 5 Hz. Above approximately 10 Hz, the perception shifts from countable pulses to roughness and flutter. Above approximately 30 Hz, the ear perceives a difference tone rather than a modulated envelope. The exercises should exploit the countable regime (0.5–5 Hz) for quantitative work and note the transition to roughness as the frequency difference increases.

**Harmonics note:** Most low-cost setups (GPSDO CMOS output, XR2206 default square wave) produce non-sinusoidal signals with strong harmonic content. Students may hear timbre and roughness from harmonics; the key observable is the slow envelope modulation associated with the frequency difference of the fundamentals. The exercises should state this explicitly. An optional RC low-pass filter (single resistor + capacitor, cutoff ~1–10 kHz) can reduce harmonic content if desired.

### Regime 2 — Ultrasonic (provisional, prototype-gated)

| Parameter | Value |
|---|---|
| Reference frequency | 25–40 kHz (to be determined by prototype) |
| VCO frequency | ~matching reference |
| Beat frequency | Audio band (if nonlinear mixing succeeds) |
| Output | Speakers (ultrasonic, inaudible directly) |
| Detector | Ear or microphone, if nonlinear mixing in the acoustic or electronic chain renders the comparison audible |
| Status | **Provisional. Enters the canonical sequence only after prototype confirmation on representative hardware.** |

**What it teaches (if confirmed):** The beat note may be perceptible even when the individual oscillators are not. The comparison separates from the source. This is the first moment where instrument-mediated measurement becomes necessary for the carriers, while the comparison itself may still be directly accessible.

**Empirical condition:** In the ultrasonic regime, the comparison may become perceptible through nonlinear mixing in the transducer, microphone, or signal chain. This is a prototype question, not a guaranteed property of the regime. Laptop microphones typically roll off above 20 kHz, and linear acoustic superposition does not produce audible difference frequencies. For the beat to appear in the audio band, effective nonlinearity is required somewhere in the chain — speaker distortion, air nonlinearity at high SPL, or microphone front-end nonlinearity.

**Two sub-cases:**

**Regime 2a — Acoustic (exploratory):** Both ultrasonic signals played through speakers; mic captures whatever nonlinear products appear. Pedagogical value is high if it works — the student hears a beat from inaudible sources. Status: exploratory, prototype-dependent, not required for baseline deployment.

**Regime 2b — Electrical (robust):** Both ultrasonic signals routed electrically into the sound card; Beat Lab performs the digital comparison. The carriers are above audibility but the analysis chain produces a visible and audible beat in software. This is electrically identical to Regime 1 (same sound card, same Beat Lab) but the student cannot hear the carriers directly. Status: robust, works on any hardware.

**Prototype question:** Test on three to five representative laptops whether a ~25 kHz beat is detectable through speaker/mic nonlinearity. If yes, Regime 2a is promoted to canonical. If no, Regime 2b becomes the standard, and the conceptual pivot is delivered through the electrical path with explicit teaching about why the carriers are inaudible.

### Regime 3 — RF (canonical, Tier 1C+ advanced)

| Parameter | Value |
|---|---|
| Reference frequency | 10 000 000 Hz (10 MHz) |
| VCO or second reference | ~10 MHz crystal oscillator module |
| Beat frequency | Audio band after mixing |
| Output | Electrical only |
| Detector | Diode mixer → sound card → Beat Lab |
| Status | **Canonical as advanced endpoint.** |

**What it teaches:** This is the logical structure of real frequency metrology. The carriers are far above audibility. The comparison requires a physical mixer to bring the beat down to the audio band. The student performs the same logical operation (heterodyning) that a frequency laboratory performs — at vastly lower fidelity, but with the same signal chain topology.

**Epistemic precision (per Council review):** The student's mixer setup performs the same logical operation as professional metrology (two frequencies → nonlinear element → difference frequency). It does not perform the same measurement. Professional frequency laboratories use double-balanced mixers with 60+ dB isolation, temperature-controlled enclosures, calibrated LO power, and uncertainty budgets many orders of magnitude tighter. The value of Regime 3 is understanding the principle, not claiming equivalence to national metrology institute operations.

**Hardware:** The XR2206 cannot reach 10 MHz. The VCO for Regime 3 is a crystal oscillator module (e.g. 10 MHz DIP-14 can, ~€1, globally available, no programming required). The GPSDO (LBE-1420) provides the reference at 10.000000 MHz. The mixer is a diode ring (four Schottky diodes) for the recommended configuration, or a single-diode detector for the minimal classroom version. The distinction between these two should be noted in the teaching materials: a single diode produces useful difference terms but has poor isolation and carrier leakage; a diode ring provides cleaner output at the cost of four additional components.

**Tier access:** Regime 3 is reserved for Tier 1C because it relies on a GPS-disciplined 10 MHz reference. While low-cost DDS or crystal sources can generate signals near 10 MHz, Tier 1B does not provide the reference quality or comparison architecture intended for this regime. Tier 1B students experience Regime 1 fully and receive Regimes 2–3 as described concepts with the invitation to access them when a GPSDO becomes available.

---

## 4. The Pedagogical Arc

| Stage | Access to carriers | Access to comparison | Primary mode |
|---|---|---|---|
| Regime 1 | Direct (heard) | Direct (heard) | Ear |
| Regime 2a | Indirect (inaudible) | Partial (heard if nonlinearity permits) | Ear + instrument |
| Regime 2b | Indirect (inaudible) | Instrument-mediated (screen) | Sound card + Beat Lab |
| Regime 3 | Inaccessible without conversion | Accessible only after mixing | Mixer + sound card + Beat Lab |

The arc teaches instrument trust through graduated withdrawal of direct perception. The student does not begin by trusting instruments. The student begins by trusting their ear, then watches the same measurement migrate into instruments as the frequency rises beyond perception.

The three-layer measurement ontology:

| Layer | Carrier | Precision | Role |
|---|---|---|---|
| Acoustic | Air pressure | Low | Perception and intuition |
| Electrical | Voltage | High | Reference and measurement |
| Digital | Sampled data | Derived | Analysis and logging |

---

## 5. Hardware

### Speaker Driver Options

**Option A — Piezoelectric disc (no amplifier, minimum cost)**

Two piezoelectric discs (27 mm), driven directly from oscillator outputs. Cost: ~€0.60 total. No amplifier, no power, no additional components. Sound is thin and harsh. Recommended as fallback for minimum-cost environments.

**Option C — PAM8403 class-D amplifier module (recommended)**

One PAM8403 stereo amplifier board (~€1), two small speakers (4–8Ω, 40 mm, ~€0.50 each), powered from USB 5V. Stereo: one channel per oscillator. Volume control via onboard potentiometer. Clean audio output. Recommended as the default configuration.

**Option B — Single transistor buffer + speaker**

Two BC547 or 2N2222 transistors, two base resistors, two speakers. Cost: ~€1.50 total. Adequate but intermediate — less clean than PAM8403, more components than piezo.

### Signal Routing

Both paths are active simultaneously:

```
  Reference ────┬──▶ Speaker 1 ──▶ audible tone
  oscillator    └──▶ Sound card (L) ──▶ Beat Lab

  XR2206 VCO ──┬──▶ Speaker 2 ──▶ audible tone
                └──▶ Sound card (R) ──▶ Beat Lab
```

Alternatively, in microphone mode: speakers play both tones into the room; the laptop mic captures the combined sound. No wired connection to the sound card needed. Speakers should be separated by 50–100 cm to minimise acoustic crosstalk, or one channel delivered via headphones for cleaner isolation.

### Regime 3 Additional Components

| Component | Qty | Cost |
|---|---|---|
| 10 MHz crystal oscillator module (DIP-14) | 1 | ~€1 |
| 1N5819 Schottky diodes | 4 | ~€0.40 |
| 10 kΩ load resistors | 2 | ~€0.10 |
| 10 µF coupling capacitor | 1 | ~€0.05 |

Total added for Regime 3: ~€2.

---

## 6. Safety

**Sound pressure levels:** The PAM8403 amplifier can deliver up to 3W per channel. At close range with small speakers, SPL can exceed 85 dB(A).

**Required instructions in teaching materials:**

1. Set the amplifier volume to a comfortable level before powering on the oscillators.
2. Place speakers at arm's length (50 cm minimum), not next to the ear.
3. If the beat or tone is uncomfortably loud, reduce volume immediately.
4. For extended listening sessions (> 15 minutes), keep levels below conversational volume (~60–65 dB).
5. In classroom settings with multiple simultaneous kits, the teacher should monitor cumulative noise levels. If conversation becomes difficult, overall levels are too high.

**Reference:** EU Physical Agents Directive 2003/10/EC specifies 85 dB(A) as the upper exposure action value for 8-hour TWA. Brief demonstration listening at arm's length from a small speaker is well below this threshold, but the amplifier's capability should be noted and the volume control should always be set to minimum before starting.

**Ultrasonic safety:** At the low acoustic powers produced by the small transducers envisaged here, no additional precautions beyond standard electronics handling are expected to be necessary; nevertheless, the ultrasonic regime remains prototype-gated.

---

## 7. Exercise Design

### Exercise 1.0 — Two Speakers, One Beat (laptop-free)

**Goal:** Hear the beat note directly. Use the ear as the measurement instrument. No laptop, no screen.

**Setup:** Reference oscillator → Speaker 1. XR2206 → Speaker 2. Both set to approximately 440 Hz. Speakers placed 50–100 cm apart, facing the student.

**Procedure:**

1. Power both oscillators. Listen. If both frequencies are identical, you hear a steady tone. If they differ slightly, you hear a pulsing — the beat.
2. Count the pulses in 10 seconds. Divide by 10. This is the beat frequency in Hz.
3. Slowly adjust the XR2206 frequency potentiometer. The beat slows as the frequencies converge. Can you reach zero-beat — a steady, unmodulated tone?
4. Sweep the XR2206 slowly past zero-beat. The beat disappears and reappears. At the zero-beat crossing, the frequencies were equal.
5. Set the beat to approximately 2 Hz. Hold the potentiometer still for one minute. Does the beat rate stay constant, or does it drift?
6. Try increasing the frequency difference until you can no longer count individual pulses. What do you hear instead? (Roughness, then a distinct low tone.)

**Notebook questions:**

- How precisely can your ear determine the beat frequency? Estimate your uncertainty in Hz.
- At what beat frequency does counting become unreliable? What replaces counting as the perceptual mode?
- How does the precision of your ear compare to what Beat Lab measures in Exercise 1.1? (You will answer this after completing 1.1.)

### GPS-Disciplined Acoustic Oscillator (Tier 1C)

**Setup:** LBE-1420 programmed to 440.000 Hz → speaker.

**Procedure:**

1. Listen to the 440 Hz tone. The electrical signal driving this speaker is stable to parts in 10¹². The acoustic output is a demonstration of that signal — the frequency of the oscillation is set by the electrical reference, but the acoustic field in the room is a spatial interference pattern that does not represent a single pure tone everywhere.
2. Tune an instrument against this speaker if available.
3. Change the GPSDO to 432.000 Hz. Listen to the difference.
4. Change to 1000.000 Hz. This is the standard scientific test tone.
5. Change to 1.000 Hz. The speaker cone moves once per second. Can you see or feel it?

**Notebook question:** The electrical signal from the GPSDO is stable to parts in 10¹². The sound you hear is not equally stable. What factors degrade the acoustic output? (Speaker resonance, room modes, air temperature, your hearing threshold, spatial position relative to standing waves.)

---

## 8. Naming

**Public-facing:** GPS-disciplined acoustic oscillator. For outreach and donations: "Atomic A" (informal, with the understanding that this refers to the electrical signal's traceability, not the acoustic output's precision).

**Technical:** GPS-disciplined electrical reference with audible output.

**Teaching materials:** Use both names, with the distinction made explicit: "We call this 'Atomic A' because the electrical signal is locked to GPS caesium time. The sound you hear is not atomic-precision — it is a demonstration of that signal through a speaker, which introduces its own distortions."

---

## 9. Tier Integration

| Sub-tier | Regime | Carrier | Beat | Detector | Status |
|---|---|---|---|---|---|
| Tier 1.0 | 1 (acoustic) | Audible | Audible | Ear | Canonical |
| Tier 1.0+ | 2 (ultrasonic) | Inaudible | Conditional | Ear or mic (if nonlinear mixing) | Provisional |
| Tier 1A | — (browser) | Synthetic | Synthetic | Beat Lab | Canonical |
| Tier 1B | 1 (acoustic, DDS ref) | Audio-band | Audio-band | Sound card + Beat Lab | Canonical |
| Tier 1C | 1 (acoustic, GPS ref) | Audio-band | Audio-band | Sound card + Beat Lab | Canonical |
| Tier 1C+ | 3 (RF) | 10 MHz | Audio (after mixer) | Mixer + sound card | Canonical (advanced) |

Tier 1.0 is laptop-free. Tier 1.0+ is prototype-gated. Tiers 1A through 1C+ require a laptop.

Regimes 2 and 3 are Tier 1C features. Tier 1B students experience Regime 1 fully and receive Regimes 2–3 as described concepts, with the invitation to access them when a GPSDO becomes available. This economic bifurcation is acknowledged, not hidden.

---

## 10. Cost Summary

| Configuration | Speaker cost | Regime 3 cost | Total kit |
|---|---|---|---|
| Tier 1B + piezo | +€0.60 | — | ~€15 |
| Tier 1B + PAM8403 | +€2.50 | — | ~€17 |
| Tier 1C + PAM8403 | +€2.50 | — | ~€185 |
| Tier 1C + PAM8403 + Regime 3 | +€2.50 | +€2 | ~€187 |

Regimes 1 and 2 use the same hardware at different frequency settings — zero additional cost beyond the speaker driver.

---

## 11. Council Resolution

**Accepted:**

1. The three-regime progression (acoustic → ultrasonic → RF) is adopted as the canonical Tier 1 frequency architecture.
2. Regime 1 (acoustic) is fixed as baseline and load-bearing.
3. Regime 3 (RF) is fixed as the advanced canonical endpoint.
4. Regime 2 (ultrasonic) is provisional, entering the canonical sequence only after prototype confirmation on representative hardware (three to five laptops, testing 25 kHz acoustic beat detection via mic).
5. Exercise 1.0 is laptop-free. Beat Lab enters at Exercise 1.1 as quantitative verification of what the ear detected.
6. The hardware spec is updated to include the PAM8403 speaker amplifier as the recommended default and the piezo as the minimum-cost fallback.
7. The crystal oscillator module (10 MHz DIP-14) is the standard VCO component for Regime 3.
8. The endorsement marker is applied to all documents describing the GPS-disciplined acoustic oscillator.
9. Safety instructions (SPL limits, volume control, speaker distance) are included in all teaching materials.
10. The economic bifurcation between Tier 1B (Regime 1 only) and Tier 1C (all regimes) is explicitly acknowledged in the site and blueprint.

---

## 12. Next Actions

1. **Prototype Regime 1:** Build the PAM8403 + two speakers configuration. Verify beat audibility at 440 Hz with both GPSDO and DDS references. Measure SPL at 50 cm.
2. **Prototype Regime 2:** Test 25 kHz acoustic beat on representative laptops. Report pass/fail per device.
3. **Update hardware spec** (tier-1-hardware-spec.md) to include speaker driver and Regime 3 components.
4. **Draft Exercise 1.0** as a standalone handbook page for the site.
5. **Update the coastline** with the sentence: "In Tier 1, the comparison is first directly heard, then conditionally inferred beyond direct perception, and finally measured by instrumented conversion; the order is intentional."

---

## 13. References

### Frequency Standards and Metrology

1. W. J. Riley, *Handbook of Frequency Stability Analysis*, NIST Special Publication 1065, 2008. Available: [https://www.nist.gov/publications/handbook-frequency-stability-analysis](https://www.nist.gov/publications/handbook-frequency-stability-analysis)

2. D. W. Allan, N. Ashby, C. C. Hodge, *The Science of Timekeeping*, Hewlett-Packard Application Note 1289, 1997. Available: [https://www.allanstime.com/Publications/DWA/Science_Timekeeping.pdf](https://www.allanstime.com/Publications/DWA/Science_Timekeeping.pdf)

3. J. Levine, "Introduction to time and frequency metrology," *Review of Scientific Instruments* **70**, 2567–2596 (1999). DOI: [10.1063/1.1149844](https://doi.org/10.1063/1.1149844)

4. F. Riehle, *Frequency Standards: Basics and Applications*, Wiley-VCH, 2004. (Textbook; institutional access.)

### GPS and Atomic Time

5. BIPM, *Circular T* (monthly). Comparison of national time scales against UTC. Available: [https://www.bipm.org/en/time-fre/circular-t](https://www.bipm.org/en/time-fre/circular-t)

6. W. Lewandowski and C. Thomas, "GPS time transfer," *Proceedings of the IEEE* **79**, 991–1000 (1991). DOI: [10.1109/5.84975](https://doi.org/10.1109/5.84975)

7. Leo Bodnar Electronics, *LBE-1420 GPSDO Datasheet*, v1.1, 2025. Available: [https://leobodnar.com/files/datasheets/LBE-1420-Datasheet-DRAFT-17-01-2025.pdf](https://leobodnar.com/files/datasheets/LBE-1420-Datasheet-DRAFT-17-01-2025.pdf)

### Psychoacoustics and Beat Perception

8. W. M. Hartmann, *Signals, Sound, and Sensation*, Springer, 1997. Chapter 14: Beats. (Textbook; institutional access.)

9. H. Fastl and E. Zwicker, *Psychoacoustics: Facts and Models*, 3rd ed., Springer, 2007. Sections on roughness and beating. (Textbook; institutional access.)

10. R. Plomp, "Beats of mistuned consonances," *Journal of the Acoustical Society of America* **42**, 462–474 (1967). DOI: [10.1121/1.1910602](https://doi.org/10.1121/1.1910602)

### Oscillator Circuits and Components

11. Exar Corporation, *XR2206 Monolithic Function Generator Datasheet*. Available: [https://www.alldatasheet.com/datasheet-pdf/view/48088/EXAR/XR2206.html](https://www.alldatasheet.com/datasheet-pdf/view/48088/EXAR/XR2206.html)

12. Texas Instruments, *CD4046B CMOS Micropower Phase-Locked Loop Datasheet*, SCHS027C. Available: [https://www.ti.com/product/CD4046B](https://www.ti.com/product/CD4046B)

13. Analog Devices, *AD9833 Programmable Waveform Generator Datasheet*, Rev. E. Available: [https://www.analog.com/en/products/ad9833.html](https://www.analog.com/en/products/ad9833.html)

### Safety

14. European Parliament, *Directive 2003/10/EC on the minimum health and safety requirements regarding the exposure of workers to the risks arising from physical agents (noise)*, 2003. Available: [https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32003L0010](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32003L0010)

### Clock School Framework

15. U. Warring, *Causal Clock Unification Framework*, Zenodo v1.0.0. DOI: [10.5281/zenodo.17948436](https://doi.org/10.5281/zenodo.17948436)

---

*Clock School — What Is a Clock?*
*Council-Amended Concept Note · v0.2 · March 2026*
*CC BY-SA 4.0 · Ulrich Warring and contributors*
