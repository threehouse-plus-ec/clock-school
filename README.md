# What Is a Clock?

**An Open Science School on Time, Comparison, and Measurement**

---

Every civilisation has built clocks.
Every clock is a comparison.
This school teaches how to make those comparisons carefully.

---

## Start Here

- **Tier 0 — Observe:** [`site/observe/experiment-01.html`](site/observe/experiment-01.html) — Three Clocks That Disagree. A stick, a string, a clock, and a notebook.
- **Project blueprint:** [`docs/blueprint.md`](docs/blueprint.md) — The full programme design (v0.3).
- **Starter Kit:** [`docs/clock-school-starter-kit-concept.md`](docs/clock-school-starter-kit-concept.md) — Hardware specification for Tier 1C field deployment (GPSDO, VCXO, oscilloscope).
- **Equipment Inventory:** [`docs/clock-school-prototype-inventory.md`](docs/clock-school-prototype-inventory.md) — Full parts list for the Prototype v0.3 kit.
- **Local Data Guide:** [`docs/local-data-collection-guide.md`](docs/local-data-collection-guide.md) — Environmental noise characterisation with open data and smartphone sensors.
- **Homepage:** [`site/index.html`](site/index.html) — The public-facing entry point.

---

## About

This is an open-source, freely available teaching programme on the physics of timekeeping. No institutional credit, no fees, no prerequisites beyond curiosity and a notebook.

The programme is organised around a single invariant principle: **a clock is an operational comparison between periodic processes that yields information about timing, offset, and relative stability.** A sundial compared to a pendulum and a caesium standard compared to a pulsar instantiate the same operational question under different precision regimes. They require the same kind of scientific reasoning.

## Structure

The programme has four tiers. Each preserves the same question while changing scale, tools, and precision.

| Tier | Name | What You Compare | Access Level |
|------|------|-----------------|--------------|
| **0** | **Observe** | Sun, Moon, pendulum, household clock | Universal — no cost, no electronics |
| **1** | **Build** | Electronic oscillators (tone generators, DDS, VCO) | Portable kit — €10–150 |
| **2** | **Simulate** | Numerical clock networks | Laptop with Python |
| **3** | **Explore** | GPS atomic time, UT1, pulsar timing | Public datasets |

**Start here:** [Tier 0 — Three Clocks That Disagree](site/observe/experiment-01.html)

## Current Status

- **Blueprint:** Published (v0.3). See [`docs/blueprint.md`](docs/blueprint.md).
- **Tier 0:** Seed material in development.
- **Tier 1:** Constrained-access prototype (Tier 1A) in design. Starter Kit (Tier 1C field deployment) published — see [`docs/clock-school-starter-kit-concept.md`](docs/clock-school-starter-kit-concept.md). Local environmental characterisation guide published — see [`docs/local-data-collection-guide.md`](docs/local-data-collection-guide.md). First deployment to AIMS-Cameroon in preparation.
- **Tier 2:** Based on the [Numerical Clock Networks](https://github.com/adv-labs-ufr/numerical_clock_networks) lab (University of Freiburg). Adaptation underway.
- **Tier 3:** Planned.

## Licensing

- Text, documentation, worksheets, 3D designs: **CC BY-SA 4.0**
- Code: **MIT Licence**
- Public datasets in Tier 3: original licences apply

See [LICENSE-TEXT.md](LICENSE-TEXT.md) and [LICENSE-CODE.md](LICENSE-CODE.md).

## Contributing

Contributions of all kinds are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Framework Attribution

The causal-geometry framework that organises this programme is developed in:

> U. Warring, *Causal Clock Unification Framework*, Zenodo v1.0.0, DOI: [10.5281/zenodo.17948436](https://doi.org/10.5281/zenodo.17948436).

This framework is under local stewardship. It has not received broad community endorsement. It serves as the organising principle because it is internally consistent, falsifiable, and pedagogically productive. Students and teachers are encouraged to test it, challenge it, and report where it breaks.

---

*Ulrich Warring · Physikalisches Institut · Albert-Ludwigs-Universität Freiburg*
