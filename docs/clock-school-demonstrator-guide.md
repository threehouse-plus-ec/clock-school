# Clock School 10-MHz Demonstrator — Lab Guide

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

## Digital twin

Before the hardware arrives — or after your first measurements — you can run
every experiment in this inventory as a numerical simulation. The
[Digital Twin notebook](../notebooks/digital-twin-10mhz-prototype.ipynb)
models each component in the kit:

| Hardware | Digital counterpart |
|---|---|
| LBE-1420 GPSDO | Oscillator with white noise at 10⁻¹² level |
| 3× OCXO modules (two suppliers) | Oscillators with flicker + random-walk noise, per-unit offsets |
| FNIRSI 2C53P oscilloscope | Phase-difference time series and simulated waveform snapshots |
| NTC thermistors + room | 24-hour diurnal temperature profile with oven suppression model |

The notebook generates synthetic frequency data, computes Allan deviation,
tests triangular closure across all three OCXOs, and builds a noise budget
that decomposes stability by source. It uses the same invariant as the
physical experiment: every measurement is a comparison between two oscillators,
never a reading from one in isolation.

**Use it to:**

- Predict what you will see on the oscilloscope before powering on the kit
- Identify which noise source limits your measurement at each averaging time
- Compare your real data against the model — discrepancies reveal physics
  the model doesn't yet capture (cable reflections, power-supply noise,
  building vibrations)

**Run it now — no installation required:**

[![Launch Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/threehouse-plus-ec/clock-school/main?labpath=notebooks%2Fdigital-twin-10mhz-prototype.ipynb)

Click the badge to open the notebook in a free JupyterLab session in your
browser. All dependencies are pre-installed. Nothing to download, nothing to
configure — just run the cells.

To run locally instead, install Python with `numpy`, `scipy`, `matplotlib`,
and `allantools`.

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

## References and further reading

All resources below are open access — free PDFs, no paywall, no login. They are ordered by reading sequence: start at the top if you are new to the subject, skip to the section you need if you are not.

### Where to start

These three documents cover the full breadth of the prototype experiments. Read them in this order.

1. **D. W. Allan, N. Ashby, C. C. Hodge, *The Science of Timekeeping*, HP Application Note 1289, 1997.**
   Broad tutorial: oscillator physics, quartz and atomic clocks, Allan variance, GPS time transfer. The single best starting point for everything in this kit.
   [PDF](http://allanstime.com/Publications/DWA/Science_Timekeeping/TheScienceOfTimekeeping.pdf) · [Mirror](http://www.leapsecond.com/hpan/an1289.pdf)

2. **M. A. Lombardi, *Fundamentals of Time and Frequency*, NIST, 2002.**
   Accessible overview of oscillators, frequency standards, time transfer, and stability analysis. Covers the full Clock School curriculum in 40 pages.
   [PDF](https://tf.nist.gov/general/pdf/1498.pdf)

3. **J. R. Vig, *Quartz Crystal Resonators and Oscillators — A Tutorial*, US Army CECOM.**
   The standard reference on quartz crystal physics, resonator design, OCXO construction, ageing, and temperature sensitivity. Explains why the oven is there and what limits its performance.
   [PDF](https://www.am1.us/wp-content/uploads/Documents/U11625_VIG-TUTORIAL.pdf)

### Allan deviation and frequency stability

These cover the measurement and analysis tools you will use in the digital twin notebook and with real data from the oscilloscope.

4. **W. J. Riley, *Handbook of Frequency Stability Analysis*, NIST SP 1065, 2008.**
   The definitive practical guide: Allan deviation, modified Allan deviation, noise identification, confidence intervals, and data processing. 136 pages.
   [PDF](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication1065.pdf)

5. **D. W. Allan, *Time and Frequency (Time-Domain) Characterization, Estimation, and Prediction of Precision Clocks and Oscillators*, IEEE Trans. UFFC, 1987.**
   Allan's own tutorial on the variance he invented. Covers noise identification from the slope of σ_y(τ).
   [PDF](https://tf.nist.gov/general/pdf/752.pdf)

6. **E. Rubiola and F. Vernotte, *The Companion of Enrico's Chart for Phase Noise and Two-Sample Variances*, arXiv:2201.07109, 2023.**
   Comprehensive reference relating phase noise PSD, frequency noise PSD, and all two-sample variances (Allan, modified, Hadamard) with conversion formulas. The chart itself is a one-page visual summary worth printing.
   [arXiv](https://arxiv.org/abs/2201.07109)

7. **D. A. Howe, D. W. Allan, J. A. Barnes, *Properties of Signal Sources and Measurement Methods*, NIST, 1981.**
   Power spectral density of frequency fluctuations and the relationship between time-domain and frequency-domain stability. Bridges the gap between the PSD plot and the Allan deviation plot in the digital twin.
   [PDF](https://tf.nist.gov/general/pdf/1558.pdf)

### GPS-disciplined oscillators

The LBE-1420 GPSDO is the atomic reference in this kit. These explain how it works and what its limits are.

8. **M. A. Lombardi, *The Use of GPS Disciplined Oscillators as Primary Frequency Standards for Calibration and Metrology Laboratories*, NIST, 2008.**
   Practical guidance on GPSDO performance, limitations, and calibration use. Explains why the GPSDO is stable to 10⁻¹² and where that number comes from.
   [PDF](https://tf.nist.gov/general/pdf/2297.pdf)

9. **Leo Bodnar Electronics, *LBE-1420 GPSDO Datasheet*, v1.1, 2025.**
   Technical specifications for the reference oscillator in this kit.
   [PDF](https://leobodnar.com/files/datasheets/LBE-1420-Datasheet-DRAFT-17-01-2025.pdf)

### Clock comparison and networks

The three-OCXO triangular closure test in this kit uses the same logic as international clock comparisons. These explain the broader context.

10. **J. Levine, *Measuring Time and Comparing Clocks*, NIST, 2016.**
    Clock comparison methods, Allan variance characterisation, and time transfer including closure analysis. Directly relevant to the triangular closure section of the digital twin.
    [PDF](https://tf.nist.gov/general/pdf/2718.pdf)

11. **BIPM, *Annual Report on Time Activities*.**
    Documents how international clock comparisons are performed and how UTC is computed. Reports up to 2020 are downloadable as PDFs; later data is in an online database.
    [Reports](https://www.bipm.org/en/time-ftp/annual-reports) · [Database](https://webtai.bipm.org/database/)

### Phase noise (advanced)

For students who want to go deeper into the spectral analysis in the digital twin notebook.

12. **E. Rubiola, *Phase Noise and Frequency Stability in Oscillators*, lecture series, Université de Franche-Comté / FEMTO-ST.**
    15 hours of PhD-level lectures: phase noise spectra, Leeson effect, oscillator noise models. Freely downloadable slides and lecture notes.
    [Lectures](https://rubiola.org/pdf-lectures/) · [Slides](https://rubiola.org/pdf-slides/)

13. **IEEE Std 1139-2008 (draft), *Standard Definitions of Physical Quantities for Fundamental Frequency and Time Metrology*.**
    Defines the spectral densities S_φ(f) and S_y(f), Allan variance, and noise type classification. The NIST draft covers the essential definitions.
    [NIST draft PDF](https://tf.nist.gov/general/pdf/1206.pdf)

### Frontiers

Where this field is going — portable optical clocks that outperform the GPSDO by orders of magnitude.

14. **Various authors, *International comparison of optical frequencies with transportable optical lattice clocks*, arXiv:2410.22973, 2024.**
    State-of-the-art international clock comparisons using transportable optical lattice clocks.
    [arXiv](https://arxiv.org/abs/2410.22973)

15. **Various authors, *The SWaP plot: Visualising the performance of portable atomic clocks as a function of their size, weight and power*, arXiv:2409.08484, 2024.**
    Review of Allan deviation performance versus size/weight/power for portable clocks. Useful context for where the GPSDO and OCXO sit in the landscape.
    [arXiv](https://arxiv.org/abs/2409.08484)

### Software

16. **A. E. Wallin et al., *allantools* — Allan deviation and related time/frequency statistics in Python.** LGPL v3+.
    The computational engine used in the digital twin notebook.
    [GitHub](https://github.com/aewallin/allantools) · [Docs](https://allantools.readthedocs.io/) · [PyPI](https://pypi.org/project/AllanTools/)

### Quick-reference glossary

17. **NIST, *Time and Frequency from A to Z*.**
    Accessible glossary of time and frequency terms. Look up anything unfamiliar.
    [Web](https://www.nist.gov/pml/time-and-frequency-division/popular-links/time-frequency-z)

---

*[Clock School — What Is a Clock?](https://threehouse-plus-ec.github.io/clock-school/) · 10-MHz Demonstrator Lab Guide · April 2026*
