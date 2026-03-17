# What Is a Clock?

**An Open Science School on Time, Comparison, and Measurement**

Project Blueprint · v0.3 · March 2026

---

Every civilisation has built clocks.
Every clock is a comparison.
This school teaches how to make those comparisons carefully.

---

## Mission

This is an open-source, freely available teaching programme on the physics of timekeeping. It carries no institutional credit, no fees, and no prerequisites beyond curiosity and a notebook. Its purpose is to teach honest science with minimal borders.

The programme is designed so that its entry tier remains scientifically serious under extreme resource constraints. Every tier uses the same organising question. Every tier produces real measurements, real uncertainties, and real scientific reasoning.

---

## Invariant Principle

The programme is organised around a single claim:

> **A clock is not a thing that oscillates. A clock is an operational comparison between periodic processes that yields information about timing, offset, and relative stability.**

A sundial compared to a pendulum, a quartz oscillator compared to a GPS reference, a caesium standard compared to a millisecond pulsar — these instantiate the same operational question under different precision regimes. They differ in scale, in tools, and in mathematical form. They require the same kind of scientific reasoning.

This framing has deep roots. Einstein (1905) defined time operationally through synchronisation procedures. Allan (1966) formalised clock stability through pairwise comparisons rather than absolute measures. Modern time scales such as TAI are constructed from ensembles of clock comparisons. The invariant principle of this programme sits within that tradition.

This principle is the backbone: every tier preserves it, and no tier collapses it.

---

## A Geometric Constraint on Comparison

Before entering the tier structure, one physical idea needs to be stated plainly, because it organises everything that follows.

When two clocks are separated in space, information about one clock reaches the other only after a finite propagation time. A shadow cast in Freiburg cannot be compared to a shadow cast in Nairobi without waiting for a signal — a letter, an electrical pulse, a beam of light — to cross the distance between them. This means that every comparison between spatially separated clocks is subject to a geometric constraint: the comparison cannot be faster than the signal that carries the information.

This is not a deep or controversial claim. It is a consequence of the finite speed of light. But it has a consequence that is less obvious: as clocks become more precise and as the distances between them grow, this geometric constraint begins to matter. It sets a boundary on what comparisons are physically possible.

In Tier 0, this constraint is invisible — the Sun and the pendulum are in the same garden, so η ≈ 0 and the geometric boundary plays no role. It is not absent; it is trivially satisfied. In Tier 1, it is negligible — electronic signals cross a bench in nanoseconds. In Tier 2, we formalise it: for two clocks separated by distance L, compared over averaging time τ, we define the ratio

> η(τ) = L_comparison / (c · τ)

which ranges from 0 (local comparison, unlimited averaging) to 1 (comparison at the causal limit). This parameter is not a figure of merit; it is an architectural control variable that tells you where in the design space a given comparison sits. In Tier 3, η(τ) confronts real data — and the places where it fails to describe the physics are the most interesting places in the programme.

The full development of η(τ), including its falsifiable predictions, belongs in Tier 2. Here it is introduced only so that the reader knows what the tiers are building towards.

---

## Four-Tier Structure

### Tier 0 — Celestial and Mechanical Clocks

*Universal access · Age 10+ · No cost · No electronics*

**What you compare:** The Sun's shadow, the Moon's phase, a pendulum, a household clock.

**What you build or use:** A gnomon (a stick and a flat surface), a plumb line, a pendulum (string and a stone or bolt), any clock on a wall or phone, and a notebook.

**What you measure:** The time of solar noon by shadow. The number of pendulum swings per minute. The reading on the household clock at the same moments. Discrepancies between these three, recorded daily over 7–14 days.

**What can go wrong:** The gnomon is not vertical. The pendulum length changes with temperature. The observer's reaction time introduces scatter. The equation of time creates a systematic drift between solar and clock noon that looks like an error but is a real physical effect.

**What this teaches that survives into the next tier:** A clock is defined by its comparison to another clock, not by its mechanism. Disagreement between clocks is data, not failure. Systematic deviations are distinguishable from random scatter if you have enough observations. No clock establishes its own correctness in isolation.

#### A Note on What Tier 0 Is Doing

Structurally, Tier 0 combines two distinct operations that later tiers will separate. First, the student observes causal periodic processes — the Sun moves, the pendulum swings, the clock ticks. Second, the student *compares* them by acting as the message-passing medium: walking between the gnomon and the clock, writing down times, tabulating differences. The notebook itself functions as a rudimentary coordination system — an event log that links observations made at different moments.

In later tiers, these roles are handled by different instruments (oscillators produce the periodicity; mixers and networks handle the comparison). In Tier 0, the student does both. This compression is pedagogically productive — it makes the act of comparison viscerally clear — but teachers should be aware that Tier 0 is richer than it looks: it quietly introduces both the physics of periodic processes and the logic of coordinated observation.

#### Canonical First Experiment

**Experiment 0.1 — Three Clocks That Disagree**

Equipment: gnomon, pendulum, household or phone clock, notebook.

Protocol:
Each day at approximately the same time, record three numbers: (1) the moment the gnomon shadow is shortest (solar noon), (2) the pendulum count over a fixed interval timed by the household clock, (3) the household clock reading at solar noon.

Core questions for the notebook:
- When does each clock define "noon"?
- Are the discrepancies stable, or do they drift over the observation period?
- Which discrepancies come from the world (the equation of time), which from the instrument (pendulum length, clock battery), and which from the observer (timing uncertainty)?

Duration: 7–14 days of daily observations, followed by tabulation and discussion.

This experiment alone — a stick, a string, a clock, and a notebook — produces a genuine stability analysis. It is not a toy introduction. It is the empirical foundation of the entire programme.


### Tier 1 — Electronic Oscillator Comparison

*Portable kit · Global shipping · Budget: €10–150 depending on pathway*

**What you compare:** A digitally synthesised frequency (DDS), a voltage-controlled oscillator (VCO), and optionally a GPS-disciplined 10 MHz reference (GPSDO). Or, at the simplest level, two audio tone generators.

**What you build or use:** At minimum, two sources of periodic signals and a way to combine and record them. At maximum, a DDS evaluation board, a VCO module, a GPSDO, a mixer, and a USB oscilloscope. Optionally, 3D-printed enclosures and mounting brackets (STL files provided).

**What you measure:** Beat frequencies between pairs of oscillators. Drift of one oscillator relative to another over minutes to hours. The effect of changing a control parameter (voltage for VCO, frequency word for DDS) on the beat note. Short-term phase noise where equipment allows.

**What can go wrong:** Impedance mismatch at the mixer. Ground loops introducing 50/60 Hz artefacts. The GPSDO losing lock (indoors, poor antenna placement). Aliasing if the beat frequency exceeds the digitiser bandwidth. Temperature drift of the VCO. DC-blocking capacitors in the sound card suppressing low-frequency signals (see below).

**What this teaches that survives into the next tier:** The distinction between a free-running oscillator (VCO), a digitally programmed oscillator (DDS), and a disciplined oscillator (GPSDO). That "locking" is not magic — it is a comparison loop with feedback. That short-term and long-term stability are governed by different noise processes. That the comparison topology (which oscillator is mixed with which) determines what you can learn.

#### Hardware Pathways

The programme provides four kit variants to accommodate different resource levels:

**Audio pathway (~€10–20):** Two audio tone generators (software-based on a phone or laptop, or cheap hardware signal generators), a simple resistor summing network, and a laptop microphone input. The two tones are set a few hertz apart; the student hears and records the beat note. This is the absolute minimum viable comparison experiment with electronic oscillators: two frequencies, one interference, one notebook. No RF electronics, no soldering, no oscilloscope.

**Minimal RF pathway (~€30–50):** DDS board (e.g. AD9833), VCO module, passive diode-ring mixer, audio cable to laptop sound card. The DDS and VCO are set to produce a beat frequency in the range 100 Hz – 10 kHz, safely above the high-pass filter of standard laptop sound cards (which typically cut below 20–80 Hz due to DC-blocking capacitors on the audio input). The laptop sound card serves as the digitiser. No bench oscilloscope required.

**Standard pathway (~€80–120):** As above, plus a low-cost USB oscilloscope (e.g. Hantek 6022BE or equivalent). Allows direct observation of RF waveforms and higher beat frequencies.

**Extended pathway (~€150+):** As above, plus a GPSDO module with 10 MHz output. Enables disciplined-reference measurements and long-term stability analysis.

All four pathways lead to the same core exercises. The audio pathway sacrifices frequency range for near-zero cost. The minimal RF pathway sacrifices oscilloscope visualisation for portability. The extended pathway adds a reference anchor. A student completing the audio pathway has done real phase comparison with real electronic oscillators.

#### Sound-Card Digitiser: Technical Note

Most consumer laptop sound cards include DC-blocking capacitors on the audio input, which act as a high-pass filter typically cutting frequencies below 20–80 Hz. This means that very slow beat notes — corresponding to very small frequency differences between oscillators — will be attenuated or invisible.

The programme addresses this in two ways. First, the exercises are designed so that the frequency offset between oscillators produces beat notes in the 100 Hz – 10 kHz range, well above the high-pass cutoff. Second, the assembly guide includes instructions for verifying the sound card's frequency response with a known test tone, so students can characterise this limitation and understand it as a systematic effect of their measurement apparatus — which is itself a lesson in clock comparison.

Students with access to a USB oscilloscope or a sound card with DC-coupled input bypass this constraint entirely.

#### Conceptual Bridge from Tier 0

In Tier 0, the pendulum is free-running, the mechanical clock is regulated (steerable), and the Sun is the reference you compare against. In Tier 1, the VCO is free-running, the DDS is programmable (steerable), and the GPSDO is the reference disciplined to an atomic standard via satellite. Same logic, higher bandwidth, electronic rather than mechanical.


### Tier 2 — Numerical Clock Networks

*Simulation · Laptop with Python · Based on existing lab material*

**What you compare:** Numerically simulated oscillators with controllable noise models, connected in networks of varying topology.

**What you build or use:** Python with NumPy, SciPy, Matplotlib, allantools, NetworkX, and optionally PyMC or emcee for Bayesian inference.

**What you measure:** Allan deviation and its variants. Power spectral density of frequency fluctuations. Triangular closure residuals. The η(τ) control parameter and the location of η_opt — the point where averaging gains are balanced against propagation-induced decorrelation.

**What can go wrong:** Numerical artefacts from finite sample length or FFT edge effects. Incorrect noise generation (wrong spectral slope). MCMC non-convergence. Overfitting noise models. Misidentifying the noise floor.

**What this teaches that survives into the next tier:** The mathematical framework — frequentist and Bayesian — for characterising clocks quantitatively. The causal-geometry perspective: clocks unified by comparison geometry, not oscillator physics. The η(τ) parameter as an architectural control variable, now fully formalised and computationally tested. The power of network topology (closure, redundancy, over-constraint) for detecting systematics.

#### Relationship to Existing Material

This tier is built from the *Numerical Clock Networks* lab developed for the M.Sc. Applied Physics programme at the University of Freiburg (Module 07LE33K-MLAB). The existing material — Framework, Tutorial, Lab, and Rulebook — forms the core. For the open programme, the assessment and institutional framing are removed; the physics and the computational exercises remain intact.

#### Conceptual Bridge from Tier 1

In Tier 1 you physically mixed two signals and observed a beat note. In Tier 2 you simulate that same comparison numerically, with full control over the noise model. Everything you measured in hardware — beat frequency, drift, short-term jitter — now becomes a computable quantity with known ground truth. The framework generalises: from two oscillators on a bench to N oscillators in an arbitrary graph.


### Tier 3 — Timing Frontiers

*Research level · Public datasets · Predominantly for researchers and advanced students*

At this scale, clocks are compared across planetary and astronomical distances. Timekeeping becomes a network problem linking atomic standards, Earth rotation, and astrophysical oscillators. The comparison baselines span continents and light-years; the "oscillators" are caesium atoms, the rotating Earth, and spinning neutron stars; and the noise processes include the ionosphere, the interstellar medium, and tidal deceleration. The same operational question — what can we learn from comparing periodic processes? — now operates at the frontier of physics.

**What you compare:** GPS atomic time (UTC(k) and GPS system time), UT1 from the International Earth Rotation and Reference Systems Service (IERS), and millisecond pulsar timing residuals from public timing array data.

**What you build or use:** Public datasets: BIPM Circular T, IERS Bulletin A/B, and pulsar timing data from IPTA/NANOGrav/EPTA data releases. Analysis in Python, building on Tier 2 tools. Optionally, TEMPO2 or PINT for pulsar timing.

**What you measure:** Stability of UTC(k) realisations relative to TAI. UT1–UTC residuals and their spectral content. Pulsar timing residuals and their noise characterisation (red noise, white noise, dispersion measure variations). Cross-tier η(τ) values spanning laboratory to continental to interstellar baselines.

**What can go wrong:** Misinterpreting coordinate-time vs proper-time corrections. Confusing clock noise with propagation-medium noise (ionosphere for GPS, interstellar medium for pulsars). Treating non-stationary processes (pulsar spin-down, tidal deceleration) as noise rather than signal. Overgeneralising the η framework to regimes where τ is not freely choosable (orbital mechanics, pulsar spin period).

**What this teaches:** That the same comparison logic from Tier 0 operates at planetary and interstellar scale. That the causal-geometry framework has limits — and that identifying those limits is itself a research result. That "time" as a physical observable is always a comparison, never an absolute, at every scale from a stick in the ground to a neutron star.

#### Claim Discipline at the Research Frontier

Tier 3 is where the programme meets open research questions. When a student or researcher proposes a novel noise model for pulsar residuals, or claims that η(τ) breaks down at interstellar scales, or argues that a particular comparison geometry is optimal — these are claims that require careful handling.

The programme provides a dedicated "Breakwater" page on the site — subtitled *Claim Discipline for Research-Level Questions* — that establishes a simple, transparent discipline for research-level claims:

1. **State the claim precisely.** What is being predicted? Under what conditions?
2. **State the constraints.** What established physics (GR, Standard Model, thermodynamics) must be respected?
3. **Classify the outcome.** Does the data support, refute, or leave underdetermined the claim?

This discipline ensures that Tier 3 exploration maintains the epistemic modesty that protects the lower tiers from overreach. A student's finding at Tier 3 is a data point, not a verdict. The claim analysis produces descriptions, not rankings.

For research claims entering formal scientific discourse beyond the school, the full Claim Analysis Ledger schema (CL-XXXX format, with intake modes, constraint rules, and discriminant conditions) applies. The Breakwater protocol serves as the pedagogical interface to that discipline; it does not replace it.

#### Conceptual Bridge from Tier 2

In Tier 2 you simulated clock networks with synthetic noise. In Tier 3 the noise is real, the baselines are continental or interstellar, and the "oscillators" are atoms and neutron stars. The η(τ) map you computed numerically now confronts real data — and the places where it breaks are the most interesting places in the programme.

---

## Shared Concepts (Cross-Tier)

The following concepts appear in every tier. Each tier engages them at a level appropriate to its tools and precision. A dedicated "Concepts" page on the site will link each concept to its appearance in all four tiers.

**Periodicity.** What repeats, and how reliably? (Shadow → oscillation → atomic transition → pulsar rotation.)

**Reference vs free-running systems.** Which clock do you trust, and why? (Sun vs pendulum → GPSDO vs VCO → TAI vs UT1.)

**Synchronisation.** How are clocks aligned initially, and what does "aligned" mean operationally? This concept crosses tiers with changing character: at Tier 0, synchronisation is notebook-mediated (the student carries information between the sundial and the pendulum); at Tier 1, it is signal-mediated (PPS pulse from GPS); at Tier 2, it is algorithmic (ensemble time-scale computation). The progression from human coordination to electronic to mathematical reflects the shift from logical to metrological synchronisation.

**Stability vs accuracy.** A clock can be stable (repeatable) without being accurate (correct), and vice versa. This distinction is central to metrology and appears in every tier: the pendulum is stable but drifts with temperature; the GPS PPS is accurate but jittery at the nanosecond level.

**Drift and noise.** What changes slowly, and what fluctuates? (Equation of time → VCO temperature drift → flicker frequency noise → pulsar spin-down.)

**Systematic vs random deviation.** Can you tell them apart with your data? (Observer reaction time → ground loops → numerical artefacts → interstellar medium.)

**Comparison networks.** What does a third clock add that two clocks cannot provide? (Three clocks that disagree → triangular closure → network topology.)

**Local vs distant comparison.** How does distance constrain what you can learn? (Bench-top → fibre link → satellite → light-years.)

**Causal baselines and geometry.** The boundary condition L ≤ cτ, introduced gently in the "Geometric Constraint" section above, implicit in Tier 0 (why does comparing the Sun to a pendulum require waiting for the shadow to move?), formalised in Tier 2 as η(τ), and tested against real data in Tier 3.

---

## Access Philosophy

The programme is not attached to any university, any degree, or any credentialing body. It is freely available under open licence.

It is designed so that scientific seriousness does not require expensive equipment. Tier 0 requires nothing that cannot be found in any household. Tier 1 begins at approximately €10. Tier 2 runs on any laptop. Tier 3 uses public data.

The programme does not target any region. It is built for everyone. It is built with particular care that it works for everyone — including those for whom a €300 oscilloscope or a university subscription database is not available. This is not charity. It is good engineering: a programme that works under tight constraints is a better programme for everyone.

---

## Licensing

All text and documentation: **CC BY-SA 4.0** (Creative Commons Attribution-ShareAlike).

All code: **MIT Licence**.

All 3D-printable designs (STL files): **CC BY-SA 4.0**.

All public datasets used in Tier 3 retain their original licences and are cited accordingly.

Attribution: "What Is a Clock? — An Open Science School" by Ulrich Warring and contributors.

A **CONTRIBUTING.md** file is included in the repository from the outset, establishing contribution guidelines, code of conduct, and the expectation that all contributions respect the programme's open licence and epistemic standards.

---

## Site Structure

The programme lives as a static website (GitHub Pages) with the following sections:

1. **Home: "What Is a Clock?"** — The invariant principle. One page, short, warm, inviting. No jargon. A twelve-year-old and a professor should both find it useful.

2. **Observe (Tier 0)** — Celestial and mechanical clocks. The one-week observation notebook. Printable worksheets. Teacher notes for schools and science clubs.

3. **Build (Tier 1)** — Hardware kit. Bill of materials for each pathway. Assembly guides with photographs. 3D-print files. Exercise booklet. Sound-card digitiser instructions (including frequency-response verification).

4. **Simulate (Tier 2)** — Numerical clock networks. Framework, Tutorial, Lab pages (adapted from existing material). Jupyter notebooks. Computational exercises.

5. **Explore (Tier 3)** — Timing frontiers. Data sources. Analysis guides. Research-level exercises. Links to BIPM, IERS, IPTA.

6. **Breakwater: Claim Discipline for Research-Level Questions** — A transparent protocol for handling research-level claims. Intake, constraints, classification. Ensures that Tier 3 exploration maintains epistemic modesty. Links to the full Claim Analysis Ledger for formal research contexts.

7. **Concepts** — Cross-tier glossary. Each concept linked to its appearance in every tier. The causal-geometry framework presented as a dedicated page with full citation and endorsement scope.

8. **For Teachers** — Guidance for schools, universities, science clubs, and self-learners. Suggested timelines. Assessment ideas (optional, non-prescriptive). How to run Tier 0 with a class of thirty. How to supervise Tier 1 remotely.

9. **About / Licence / Contribute** — Mission statement. Licensing. How to contribute (CONTRIBUTING.md). Code of conduct. Version history.

---

## Repository Architecture

A single GitHub organisation (`clock-school` or `what-is-a-clock`, to be decided) hosts the programme:

```
clock-school/
├── site/                          ← Static website (GitHub Pages source)
│   ├── index.html                 ← Home: "What Is a Clock?"
│   ├── observe/                   ← Tier 0
│   │   ├── index.html
│   │   ├── experiment-01.html     ← Three Clocks That Disagree
│   │   ├── worksheets/            ← Printable observation logs (PDF)
│   │   └── teacher-notes.html
│   ├── build/                     ← Tier 1
│   │   ├── index.html
│   │   ├── kit-bom.html           ← Bill of materials (four pathways)
│   │   ├── assembly/              ← Assembly guides with photos
│   │   ├── exercises/             ← Exercise booklet
│   │   └── sound-card-guide.html  ← Includes frequency-response test
│   ├── simulate/                  ← Tier 2 (adapted from existing lab)
│   │   ├── index.html
│   │   ├── framework.html
│   │   ├── tutorial.html
│   │   ├── lab.html
│   │   └── style.css
│   ├── explore/                   ← Tier 3
│   │   ├── index.html
│   │   ├── gps-atomic.html
│   │   ├── ut1-earth.html
│   │   └── pulsar-timing.html
│   ├── breakwater/                ← Tier 3 claim discipline
│   │   └── index.html
│   ├── concepts/                  ← Cross-tier glossary
│   │   └── index.html
│   ├── teachers/                  ← For teachers and facilitators
│   │   └── index.html
│   └── about.html                 ← Mission, licence, contribute
├── concepts/                      ← Shared concept source files
│   ├── periodicity.md
│   ├── drift-and-noise.md
│   ├── stability-vs-accuracy.md
│   ├── synchronisation.md
│   ├── comparison-networks.md
│   ├── systematic-vs-random.md
│   ├── local-vs-distant.md
│   └── causal-baselines.md
├── hardware/                      ← Tier 1 hardware resources
│   ├── bom/                       ← Bills of materials (CSV, Markdown)
│   ├── stl/                       ← 3D-printable parts
│   ├── schematics/                ← Circuit diagrams (KiCad or SVG)
│   └── firmware/                  ← Any microcontroller code (if needed)
├── notebooks/                     ← Tier 2 Jupyter notebooks
├── data/                          ← Tier 3 public datasets or download scripts
├── worksheets/                    ← Tier 0 printable materials (source)
├── examples/                      ← Contributed experiments and projects
│   ├── sundial-variants/
│   ├── pendulum-measurements/
│   └── student-projects/
├── CONTRIBUTING.md                ← Contribution guidelines and code of conduct
├── LICENSE-TEXT.md                 ← CC BY-SA 4.0
├── LICENSE-CODE.md                ← MIT
└── README.md                      ← Programme overview (condensed blueprint)
```

The existing `numerical_clock_networks` repository content maps into `site/simulate/` with minimal adaptation: remove institutional framing (module number, ECTS, enrolment requirements), retain all physics and exercises, add cross-links to Tier 0/1/3.

---

## Relationship to the M.Sc. Lab Module

The Freiburg M.Sc. Applied Physics module (07LE33K-MLAB) continues to exist independently. It uses the Tier 2 material with its own assessment structure (short report, seminar presentation, ECTS). The open programme draws on the same physics but operates without institutional attachment.

The two are not in conflict. The open programme is the coastline; the M.Sc. module is one implementation that sails along it.

---

## Framework Attribution

The causal-geometry framework that organises the programme — clocks unified by comparison geometry, the three-length separation (L_source, L_apparatus, L_comparison), the clock metric η(τ), and the falsifiable prediction at η_opt — is developed in:

> U. Warring, *Causal Clock Unification Framework*, Zenodo v1.0.0, DOI: 10.5281/zenodo.17948436.

This framework is a coastline under local stewardship. It has not received broad community endorsement. It serves as the organising principle for this programme because it is internally consistent, falsifiable, and pedagogically productive. Students and teachers are encouraged to test it, challenge it, and report where it breaks. That is how science works.

---

## First Implementation Steps

**Immediate (can begin now):**

1. Create the GitHub organisation and seed repository with directory structure, licences, and CONTRIBUTING.md.
2. Write the Home page ("What Is a Clock?") — short, warm, one page.
3. Write and test Experiment 0.1 (Three Clocks That Disagree) with printable worksheet.
4. Adapt the existing Tier 2 site pages: remove institutional framing, add cross-tier navigation.
5. Choose the programme name and domain.

**Near-term (weeks):**

6. Draft the Tier 1 bill of materials for the audio and minimal RF pathways.
7. Prototype the audio pathway: two tone generators, resistor summing network, laptop microphone. Verify beat note is recordable and that frequency can be extracted.
8. Prototype the minimal RF pathway: DDS + VCO + mixer + sound card. Verify that beat frequencies in the 100 Hz – 10 kHz range are cleanly captured. Characterise the sound card's high-pass behaviour.
9. Write the Concepts page (cross-tier glossary), drawing on the `/concepts/` source files.
10. Write "For Teachers" guidance for Tier 0.

**Medium-term (months):**

11. Source and test GPSDO modules for the extended Tier 1 pathway.
12. Design and test 3D-printed enclosures. Publish STL files.
13. Write Tier 3 analysis guides using BIPM Circular T and IERS data.
14. Write the Breakwater page: claim discipline protocol for Tier 3.
15. Identify and contact potential partners for pilot testing (schools, universities, science clubs — initially in Freiburg and, when ready, internationally).

**Ongoing:**

16. Collect feedback from every tier. Iterate.
17. Maintain version control and changelog on all material.
18. Build a contributor community around the repository.

---

## Name

Working title: **What Is a Clock? — An Open Science School**

Short form for public use: **Clock School**

Academic descriptor: **Comparative Clocking Programme** (for use in research or institutional contexts where the warm name would be out of place).

The name should be decided before the site goes live. It should be warm enough for a teenager, precise enough for a physicist, and translatable.

---

## Changelog

**v0.3 (March 2026):** Frozen as publishable blueprint. Broadened invariant principle to include timing and offset alongside stability. Shortened Einstein–Allan–TAI paragraph for rhythm. Added local-limit note (η ≈ 0) for Tier 0 in the geometric constraint section. Sharpened Tier 0 phrasing ("No clock establishes its own correctness in isolation"). Added Breakwater subtitle ("Claim Discipline for Research-Level Questions") and Ledger boundary language for formal research contexts. Enriched Synchronisation concept with tier-crossing progression (notebook → signal → algorithmic). Micro-edits throughout for stylistic economy.

**v0.2-draft (March 2026):** Incorporated Council-3 review. Added epigraph. Refined invariant principle to emphasise operational information about relative stability. Added "Geometric Constraint on Comparison" section for gentler η(τ) introduction. Added audio pathway (~€10) to Tier 1. Added Tier 3 framing paragraph. Added "Synchronisation" and "Stability vs Accuracy" to Shared Concepts. Acknowledged Tier 0 / T0+T1a structural compression. Added Breakwater page for Tier 3 claim discipline. Added `/concepts/` and `/examples/` directories to repository. Added CONTRIBUTING.md. Added sound-card DC-blocking technical note. Phrasing refinements throughout.

**v0.1-draft (March 2026):** Initial blueprint.

---

*Ulrich Warring · Physikalisches Institut · Albert-Ludwigs-Universität Freiburg*
*Draft v0.3 · March 2026*
