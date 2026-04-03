# Getting Started with Local Environmental Data Collection

**Clock School Handbook · March 2026**

**Endorsement Marker:** Handbook (practical workflow) under local stewardship. Not a coastline document. Epistemic claims are bounded by the measurement-to-inference invariant stated below; the workflow itself is replaceable as better tools or data sources become available.

**Companion document:** This note accompanies the [Clock School Starter Kit](clock-school-starter-kit-concept.md), which specifies the hardware (GPSDO, VCXO, oscilloscope) used in Tier 1 exercises. The present document covers the *environmental characterisation* that precedes and supports clock deployment: understanding the local noise landscape before connecting instruments.

---

## A guidance note for essay-level clock-noise analysis

This note has three aims: to enforce disciplined record-keeping, to encourage direct engagement with local environmental data, and to practise translating environmental variability into clock-relevant quantities.

Precise timekeeping infrastructure is not evenly distributed around the world. Many regions — including most of sub-Saharan Africa — currently depend entirely on satellite-derived time signals and have no local primary frequency standard. Understanding what it would take to operate such a standard in a specific location begins with understanding the local environment: its temperature behaviour, its magnetic landscape, its pressure patterns. This note is a first step toward that understanding. The data you collect and analyse here is not an academic exercise performed for a distant laboratory. You are characterising *your* environment — producing measurement results that do not yet exist in the scientific record for your specific location.

---

## Why self-maintenance of work principles matters

Research is not only about producing correct results — it is about building the capacity to produce them independently, reliably, and honestly over time.

In any scientific project, but especially in one that bridges theory and practical deployment, the researcher's most important asset is not access to equipment or data: it is the disciplined habit of questioning one's own assumptions, recording what was actually done (not what was planned), and distinguishing between what was measured and what was inferred. These habits must be actively maintained — without attention, they erode.

Self-maintenance means:

- **Keeping a logbook** that records not only results but also the conditions, choices, and doubts that accompanied them.
- **Stating limitations honestly**, including in writing that will be read by others.
- **Returning to primary sources** rather than relying on summaries or memory.
- **Treating every measurement — even a rough one — as a commitment** to understand what the number means before using it.

A thesis that demonstrates these habits, even with modest equipment, is more valuable than one that reproduces sophisticated results without understanding their origin. Good experimental practice does not depend on expensive apparatus. Careful observation, consistent recording, and critical comparison are sufficient to begin meaningful scientific work — and these skills transfer to any future research environment.

---

## The motivation: why collect your own data?

Open-access databases provide excellent reference data for environmental conditions in Cameroon (see below). They are essential for benchmarking and for literature-based noise estimates. But they cannot replace the experience of collecting, inspecting, and interpreting data yourself.

Here is why:

1. **Intuition comes from contact with real data.** When you download a year of hourly temperature records, you see numbers. When you record the temperature in your own room every hour for a week, you begin to connect those numbers to what you already know from daily life — how quickly the air heats after sunrise, how a concrete building holds warmth long after sunset, how a room with a metal roof behaves differently from one under thatch or tile, how the temperature drops suddenly when rain arrives. That physical intuition is what allows you to judge whether a published dataset is plausible, whether your noise model captures the right timescales, and whether a proposed mitigation strategy makes physical sense.

2. **Comparison sharpens understanding.** The most instructive exercise is not collecting data *or* downloading data — it is doing both and comparing them. Where do they agree? Where do they disagree? Why? The answers to these questions teach more about environmental noise than any textbook section.

3. **Data analysis is a skill learned by doing.** Plotting a time series, computing a standard deviation, fitting a trend, identifying an outlier — these operations become second nature only through practice on data you understand. Starting with your own measurements, where you know the context, makes the learning curve far gentler than starting with a large unfamiliar dataset.

---

## Open-access environmental data sources

The following databases provide freely downloadable data relevant to clock-noise analysis. All cover Cameroon.

### Hourly station observations

| Source | What it provides | Resolution | Access |
|--------|-----------------|------------|--------|
| NOAA Integrated Surface Database (ISD) | Temperature, dew point, pressure, wind, visibility | Hourly | [ncei.noaa.gov/products/land-based-station/integrated-surface-database](https://www.ncei.noaa.gov/products/land-based-station/integrated-surface-database) |
| ISD-Lite (simplified subset) | 8 core parameters in fixed-width format | Hourly | Same site, under "ISD-Lite" |
| ISD on AWS Open Data | Same data, cloud-hosted for bulk download | Hourly | [registry.opendata.aws/noaa-isd](https://registry.opendata.aws/noaa-isd/) |

Cameroon stations in ISD include Douala, Yaoundé, Garoua, Maroua, and Ngaoundéré. Start by identifying the station nearest to your location and downloading one recent calendar year.

### Gridded reanalysis and climate data

| Source | What it provides | Resolution | Access |
|--------|-----------------|------------|--------|
| ERA5 via World Bank CCKP | Temperature, humidity, precipitation, derived indicators | 0.25° (~25 km), daily | [climateknowledgeportal.worldbank.org](https://climateknowledgeportal.worldbank.org/country/cameroon/era5-historical) |
| CRU TS (Univ. of East Anglia) | Monthly temperature and precipitation, station-based | 0.5° (~50 km), monthly | [crudata.uea.ac.uk](https://crudata.uea.ac.uk/~timo/climgen/national/web/Cameroon/obs.htm) |

ERA5 is particularly useful because it provides humidity and pressure fields that feed into second-order systematic corrections for clock comparisons.

### Geomagnetic field data

| Source | What it provides | Access |
|--------|-----------------|--------|
| INTERMAGNET | Definitive and quasi-definitive geomagnetic observatory data | [intermagnet.org](https://www.intermagnet.org/) |
| NOAA NCEI Geomagnetic Data | Historical and near-real-time geomagnetic indices (Kp, Dst) | [ngdc.noaa.gov/geomag](https://www.ngdc.noaa.gov/geomag/) |
| IGRF model (via NOAA calculator) | Reference field values for any location and date | [ngdc.noaa.gov/geomag/calculators/magcalc.shtml](https://www.ngdc.noaa.gov/geomag/calculators/magcalc.shtml) |

Note: Cameroon does not host an INTERMAGNET observatory, so the nearest reference stations are at Bangui (Central African Republic) and Tamanrasset (Algeria). The IGRF calculator gives the expected static field at your location; local measurements (see below) capture the deviations that matter for clock systematics.

---

## Collecting your own data with a mobile phone

Modern smartphones contain sensors that are directly relevant to environmental noise characterisation. The free app **phyphox** (Physical Phone Experiments), developed at RWTH Aachen University, provides convenient access to these sensors and allows data export in standard formats.

**Download:** [phyphox.org](https://phyphox.org/) — available for Android and iOS.

### What you can measure

| Sensor | Relevant quantity | Clock-noise connection |
|--------|------------------|----------------------|
| Magnetometer | Local magnetic field (3-axis, in µT) | Zeeman shift of clock transition |
| Barometer | Atmospheric pressure (hPa) | Pressure-dependent collisional shifts |
| Thermometer | Device temperature (°C) | Proxy for ambient temperature; blackbody radiation shift |
| Accelerometer | Vibration environment | Mechanical noise floor for optical components |
| Light sensor | Ambient light level (lux) | Stray-light and photoelectric effects |

> **Instrument limitations — read before interpreting results.**
>
> Smartphone sensors are not calibrated instruments. Their value lies in revealing *relative changes*, *timescales*, and *correlations* — not in providing accurate absolute numbers.
>
> - **Magnetometer:** Contains internal offsets from the phone's own ferromagnetic components (speaker magnets, inductive charging coils). These can shift the baseline by tens of µT. Before trusting indoor readings, take the phone outdoors to an open area away from buildings and vehicles, record a reference value, and compare it to the IGRF prediction. The difference is the phone's approximate hardware offset.
> - **Temperature:** The phone reports the temperature of its battery or processor, not the surrounding air. When the screen is on or an app is running intensively, internal heat dissipation can raise the reading by several kelvin above ambient. If temperature is the target quantity, switch the screen off and minimise background processes, or — better — use an inexpensive external sensor (e.g. a digital thermocouple or a USB environmental logger).
> - **Barometer:** Typically the most reliable smartphone sensor for environmental work. Calibration drift is slow and small. Absolute accuracy is usually within 1–2 hPa; relative changes (which matter most for noise analysis) are reliable.
> - **Accelerometer:** Records the motion of the phone chassis, not of the surface it sits on. A phone in a rubber case on a wooden desk will show a different vibration spectrum than the same phone placed rigidly on a metal optical table. Record the mounting conditions.
>
> **Rule of thumb:** Trust the *shape* of your time series (periods, amplitudes, correlations). Treat the *absolute scale* with scepticism until you have checked it against an independent reference.

### Getting started: a first measurement exercise

**Goal:** Record 24 hours of magnetic field data in the place where the measurement equipment would be set up — this may be a laboratory, a classroom, or a quiet room — and compare to the IGRF reference value for that location.

**Steps:**

1. Install phyphox and open the "Magnetometer" experiment.
2. Place the phone in a fixed position on a stable surface, away from motors, speakers, power supplies, generators, inverters, and large metal objects (including metal furniture, reinforced concrete pillars, and metal roofing). Do not move it during the measurement.
3. Use the "Remote Access" feature in phyphox to monitor the measurement from another device without disturbing the phone.
4. Record for at least 24 hours. Export the data as CSV.
5. Look up the IGRF reference field for your coordinates and date using the NOAA calculator linked above.
6. Compare: What is the mean measured field? How large are the fluctuations? Is the mean close to the IGRF prediction, or is there a significant offset (indicating local magnetic contamination)?

**What to record in your logbook:**

- Date, time, and duration of measurement.
- Exact position of the phone in the room.
- Nearby equipment that was running (computers, fans, generators, inverters, phone chargers).
- Any events during the measurement (doors opening, people walking past, power cuts, generator switching on or off).
- The phone model (different phones have different magnetometer quality).

### Extending the exercise

Once you have magnetic field data, repeat with the barometer and temperature sensors. The same comparison logic applies: download the nearest ISD station data for the same 24-hour period and compare your room measurements to the outdoor station values.

Note: **disagreement between your local data and the station data is expected and often more informative than agreement.** Station data records outdoor conditions at a specific site that may be 10–50 km away. Your room has walls, a roof, electrical equipment, and thermal mass that filter and delay the outdoor signal. Documenting *how* and *why* the two datasets differ is the core of the exercise.

Questions to investigate:

- How much does the indoor temperature lag behind the outdoor temperature? Does a concrete building respond differently from a lighter structure?
- After rain, how quickly does the temperature drop indoors? Does the pressure change appear in your barometer data before or during the rain?
- Is the magnetic field in the room stable, or are there periodic disturbances — for example, from a generator cycling on and off, from nearby electrical wiring, or from vehicles passing on a nearby road?
- How large is the pressure variation over 24 hours, and does it correlate with the station data?

---

## Connecting measurements to your everyday experience

Before analysing your data formally, take a moment to connect it to what you already know from daily life:

- When during the day does your room feel hottest? Is it when the sun is highest, or later in the afternoon when the walls have absorbed heat?
- After rain, how quickly does it cool down? Can you observe the pressure change in your barometer data before the rain arrives?
- Are there times when electrical equipment nearby switches on or off — a generator starting, a refrigerator compressor cycling, lights turning on at dusk?
- During the Harmattan, does the air feel different from the humid season — not just in temperature, but in how quickly things heat and cool?

Your measurements should reflect these patterns. If they do, your data is capturing real environmental physics. If they do not — if the temperature trace looks flat when you know the room was getting hotter, or if the magnetic field shows no disturbance when the generator was running — that is not a failure. It is a question worth investigating: is the sensor not sensitive enough, was the phone in the wrong position, or is the effect smaller than you expected?

This step matters because the goal of the entire exercise is to translate lived experience into quantitative physics. You already carry a great deal of environmental knowledge. The measurement makes it precise, comparable, and usable for clock-noise estimation.

---

## From measurements to clock-noise estimates

The point of these measurements is not precision metrology — it is building physical intuition and practising the translation from environmental fluctuations to frequency shifts.

### The measurement-to-inference invariant

> **Invariant:** Never report an inferred quantity (e.g. a frequency shift) without explicitly stating (a) the measured input, (b) its uncertainty, and (c) the model used to make the translation.

Without this, it is easy to produce numbers that look precise but whose origin cannot be traced.

### The workflow

For each noise source, the exercise is:

1. **Measure** the environmental parameter (or obtain it from open data).
2. **Quantify** its variability: mean, standard deviation, peak-to-peak range, dominant timescale (see below).
3. **Apply** the known sensitivity coefficient from the literature.
4. **Propagate uncertainties**: report the uncertainty on the environmental measurement and on the sensitivity coefficient. The resulting frequency-shift estimate inherits both.
5. **Express** the result as a fractional frequency shift or instability contribution.
6. **Compare** contributions and identify which dominates.

### A worked example: magnetic field fluctuations

Suppose you measure the magnetic field in your room over 24 hours and find:

- Mean total field: B₀ ≈ 33 µT = 0.33 G (consistent with the IGRF prediction for your location)
- Fluctuations: ΔB ≈ 0.5 µT = 0.005 G (standard deviation), with a ≈ 1 µT peak-to-peak diurnal variation

For a ¹³³Cs microwave clock transition (F = 3, mF = 0 → F = 4, mF = 0 at 9.192… GHz), the dominant magnetic sensitivity is the *quadratic* Zeeman shift:

- Coefficient: Δν = K × B², with K ≈ 427.45 Hz/G² (see Steck, "Cesium D Line Data," or Vanier & Audoin). Note the units: the field must be in gauss (1 G = 10⁻⁴ T = 100 µT).
- At B₀ = 0.33 G: the quadratic shift is K × B₀² ≈ 427.45 × (0.33)² ≈ 427.45 × 0.109 ≈ 46.6 Hz
- A fluctuation ΔB = 0.005 G around B₀ produces a shift variation of ≈ 2 × K × B₀ × ΔB = 2 × 427.45 × 0.33 × 0.005 ≈ 1.4 Hz
- Fractional frequency variation due to ΔB: δν/ν₀ ≈ 1.4 / 9.19 × 10⁹ ≈ 1.5 × 10⁻¹⁰

This is a rough order-of-magnitude estimate — which is exactly the level appropriate for the thesis. Note that this is a large fractional effect (parts in 10¹⁰), which is why real cesium clocks operate inside multi-layer magnetic shields that reduce the ambient field to well below 1 µT. For an unshielded setup in the Earth's field, the quadratic Zeeman shift is the dominant systematic — and this is precisely the kind of conclusion the noise-budget exercise should produce.

To be clear: the thesis contribution is *characterising* the unshielded local environment and identifying its dominant noise sources — not solving the shielding problem. Stating that magnetic shielding would be required, and estimating the suppression factor needed, is a strong and complete conclusion for this section.

The key point is that every number in the chain is traceable: you know what was measured (ΔB), what model was used (quadratic Zeeman formula), what coefficient was taken from the literature (K = 427.45 Hz/G²), and what assumption was made (that ΔB is small enough for linearisation around B₀). Notice also how easy it is to make a unit error here: if you accidentally use µT where G is expected, you are off by a factor of 10⁴ in B (or 10⁸ in B²). Always state your units explicitly and check the dimensions of every intermediate result.

> **Species warning.** The coefficient K = 427.45 Hz/G² is specific to the ¹³³Cs ground-state hyperfine clock transition. If you are working with a different atom (e.g. ⁸⁷Rb, or an optical clock species such as Sr or Yb), the relevant Zeeman coefficient will be different — potentially by orders of magnitude — and the dominant term may be linear rather than quadratic. Always look up the coefficient for your specific transition before inserting numbers.

### Caution: linearity and separability

The worked example above uses a linearised approximation (small ΔB around a known B₀). This is a common and often valid simplification, but it rests on assumptions that should be stated explicitly:

- **Nonlinear responses exist.** The blackbody radiation shift scales as T⁴, not linearly in T. The quadratic Zeeman shift scales as B². When fluctuations are not small compared to the operating point, the linear approximation breaks down and higher-order terms matter.
- **Noise sources are not independent.** Temperature changes can alter the magnetic environment (through thermal expansion of shielding materials or changes in current flow). Pressure and humidity are correlated with temperature. A full noise budget would account for these cross-correlations, but at essay level, identifying and *naming* them is sufficient — quantifying them is a more advanced exercise.
- **Superposition is an approximation.** Adding individual noise contributions in quadrature assumes they are uncorrelated. State this assumption when you use it.

### Timescales matter

When you write "dominant timescale," be specific about what you mean. Environmental noise operates on many timescales simultaneously, and different timescales affect the clock differently:

- **Fast noise** (seconds to minutes): vibrations from nearby roads or construction, generator switching events, fans or compressors cycling on and off. These contribute to short-term instability, visible in Allan-deviation analysis at short averaging times.
- **Slow drift** (hours to days): diurnal temperature swings (sunrise heating, evening cooling, rain events), barometric pressure tides, seasonal transitions between dry and wet seasons. These limit accuracy (the systematic offset of the clock from the true frequency) and affect long-term stability.

For the thesis, distinguishing these two regimes — and identifying which noise sources contribute to each — is more important than computing precise Allan deviations. A useful exercise: plot your 24-hour time series and ask which features repeat daily (slow/systematic) and which appear random on short timescales (fast/stochastic).

### What can go wrong (failure modes)

Awareness of common failure modes is part of the self-maintenance discipline:

- **Phone moved during measurement.** Even a small displacement changes the magnetometer reading (the field gradient in a room is steep near metal objects). Check the logbook timestamp against any discontinuities in the data.
- **Hidden magnetic sources.** Phone chargers, laptop power supplies, generators, inverters, desk lamps with transformers, reinforced concrete (the steel rebar is magnetised), and even metal roofing all produce local magnetic fields. A "quiet" desk may not be quiet magnetically. Map the field at several positions to reveal gradients.
- **Missing timestamps or gaps.** If the phone enters sleep mode or the app is interrupted (for example during a power cut that also switches off the charger), the data will have gaps. These gaps bias statistics (e.g. if the phone always sleeps at night, the diurnal amplitude is underestimated). Record the intended measurement window and verify continuity in the exported CSV.
- **Unit confusion.** Phyphox reports the magnetic field in µT; the IGRF calculator may report in nT. ISD temperature is in tenths of °C in some formats. Always check units before comparing datasets.
- **Correlation vs. causation.** If indoor temperature and magnetic field both show a diurnal cycle, it is tempting to conclude that one causes the other. More likely, both are driven by a common external cause (solar heating, building occupancy patterns, generator schedules). Note correlations, but do not infer causal relationships without a physical mechanism.

A summary table is an effective way to present this analysis in a thesis. Here is a minimal template:

| Noise source | Environmental parameter | Measured amplitude | Sensitivity coefficient (with reference) | Fractional frequency effect (δν/ν₀) | Dominant timescale | Notes |
|---|---|---|---|---|---|---|
| Quadratic Zeeman | Magnetic field B | ΔB = … G | K = 427.45 Hz/G² (Steck) | … | … | Unshielded; linearised around B₀ |
| Blackbody radiation | Temperature T | ΔT = … K | β(T) ∝ T⁴ (literature value for species) | … | Diurnal / seasonal | Nonlinear; state T₀ explicitly |
| Collisional shift | Pressure p | Δp = … hPa | Literature value for species | … | Diurnal (pressure tides) | |
| Local oscillator noise | — | From datasheet or measurement | — | … | Short-term | May require separate analysis |

Each row must be independently traceable: state the measured input, its uncertainty, the model, and the source of the coefficient. Do not aggregate rows into a single "total noise" figure without stating and justifying the assumption that the sources are uncorrelated.

---

## Recommended workflow

1. **Week 1:** Download one year of ISD hourly data for the nearest station. Plot the temperature time series. Compute basic statistics (mean, standard deviation, diurnal range, seasonal range).
2. **Week 1–2:** Set up phyphox measurements in your room. Start with the magnetometer (24 hours), then barometer and temperature.
3. **Week 2–3:** Compare your local measurements to the station data and to reference models (IGRF for magnetic field, ERA5 for pressure/humidity). Document agreements and discrepancies.
4. **Week 3–4:** Translate environmental amplitudes into frequency-shift estimates using literature values for the clock transition of interest. Build the summary table.

This workflow can run in parallel with the theoretical sections of the thesis and does not require any specialised laboratory equipment.

---

## Summary of key links

- **NOAA ISD:** <https://www.ncei.noaa.gov/products/land-based-station/integrated-surface-database>
- **ISD on AWS:** <https://registry.opendata.aws/noaa-isd/>
- **ERA5 / World Bank CCKP:** <https://climateknowledgeportal.worldbank.org/country/cameroon/era5-historical>
- **CRU TS:** <https://crudata.uea.ac.uk/~timo/climgen/national/web/Cameroon/obs.htm>
- **IGRF calculator:** <https://www.ngdc.noaa.gov/geomag/calculators/magcalc.shtml>
- **INTERMAGNET:** <https://www.intermagnet.org/>
- **phyphox app:** <https://phyphox.org/>

---

*This document provides general guidance for essay-level environmental noise analysis. It is intended to support autonomous research practice and may be adapted to local conditions and available resources.*

---

**See also:**

- [Clock School Starter Kit](clock-school-starter-kit-concept.md) — Hardware specification (GPSDO, VCXO, oscilloscope)
- [Clock School Blueprint](blueprint.md) — Full programme design (v0.3)
- [Clock School README](../README.md) — Programme overview and entry points

---

*Clock School — What Is a Clock?*
*Local Data Collection Guide v1.0 · March 2026*
*CC BY-NC-SA 4.0*
