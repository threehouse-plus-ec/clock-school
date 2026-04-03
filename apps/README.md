# Browser Apps

This directory contains the browser-based companion tools for Clock School.

## Architecture

Each app is a self-contained React component. The static site (`site/`) links to built versions of these apps. During development, they can be run standalone with any React environment (Vite, Create React App, etc.).

The apps are designed to be the **enduring comparison interface** across tiers, not disposable demos. Tier 1B hardware will feed signals into the same Beat Lab interface.

## Apps

### Sky Companion (`sky-companion/`)

**Tier 0 — Observe**

A field notebook for comparing student observations with the expected sky.

Three panes:
- **My Notebook** — Enter date, solar noon, pendulum count, Moon phase, notes
- **Expected Sky** — Computed solar noon, equation of time, daylight, Moon phase (revealed only after first observation)
- **Bigger Network** — UT1, VLBI, leap seconds, ephemerides (advanced context)

Key design principle: observation first, model second. The Expected Sky pane is gated — students must record an observation before seeing predictions.

### Beat Lab (`beat-lab/`)

**Tier 1A — Build**

A browser oscillator comparison lab.

Two modes:
- **Internal** — Generate two tones, observe beating, measure frequency difference
- **Microphone** — Analyse audio from the device microphone (real signals from speakers, tuning forks, or external generators)

Features: time-domain waveform with envelope, FFT spectrum, beat frequency estimator, measurement log with CSV export.

Key design principle: the browser app is the front end for both Tier 1A (internal/mic signals) and future Tier 1B (external hardware via line-in).

## Technical Notes

- Both apps use the Web Audio API
- Sample rate is read from the live AudioContext (not hardcoded)
- Beat Lab: "Not metrology-grade timing" — stated explicitly in the footer
- Sky Companion: astronomical calculations use Spencer (1971) for equation of time and synodic month approximation for Moon phase — educational accuracy, not ephemeris precision
- Sky Companion: timezone offsets are fixed approximations; DST is not included
- Both apps export CSV with proper field escaping

## Dependencies

- React (hooks: useState, useRef, useEffect, useCallback, useMemo)
- No external libraries required
- Fonts: Crimson Pro, IBM Plex Mono (loaded from Google Fonts in the host page)
