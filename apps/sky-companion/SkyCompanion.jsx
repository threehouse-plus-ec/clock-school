import { useState, useMemo, useCallback } from "react";

// ─── Color tokens (T[h]ree +EC corporate design) ───
const C = {
  bg: "#f5f0e8",
  panel: "#faf8f4",
  panelBorder: "#e0dbd2",
  surface: "#e0dbd2",
  slate900: "#1a1a1a",
  slate800: "#1a1a1a",
  slate700: "#1a1a1a",
  slate600: "#6b6b6b",
  slate400: "#6b6b6b",
  text: "#1a1a1a",
  textSecondary: "#6b6b6b",
  textDim: "#6b6b6b",
  amber: "#2c5f7c",
  amberLight: "#2c5f7c",
  amberDim: "rgba(44,95,124,0.12)",
  green: "#0d9668",
  greenLight: "#d1fae5",
  blue: "#2c5f7c",
  blueLight: "rgba(44,95,124,0.12)",
  purple: "#6b6b6b",
  purpleLight: "#e0dbd2",
  red: "#c0392b",
};

// ─── Astronomical calculations (simplified but real) ───

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

// Equation of Time in minutes (Spencer, 1971 approximation)
function equationOfTime(date) {
  const d = dayOfYear(date);
  const B = ((360 / 365) * (d - 81)) * (Math.PI / 180);
  return 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
}

// Solar noon in decimal hours (local clock time)
function solarNoon(date, longitude, tzOffset) {
  const eot = equationOfTime(date);
  // Solar noon = 12:00 - EoT - (longitude - tzMeridian)/15
  const tzMeridian = tzOffset * 15;
  const correction = (tzMeridian - longitude) / 15; // hours
  return 12 - eot / 60 + correction;
}

// Solar declination (approximate)
function solarDeclination(date) {
  const d = dayOfYear(date);
  return -23.44 * Math.cos((360 / 365) * (d + 10) * (Math.PI / 180));
}

// Day length in hours
function dayLength(date, latitude) {
  const decl = solarDeclination(date) * (Math.PI / 180);
  const lat = latitude * (Math.PI / 180);
  const cosHA = -Math.tan(lat) * Math.tan(decl);
  if (cosHA < -1) return 24; // polar day
  if (cosHA > 1) return 0;   // polar night
  const ha = Math.acos(cosHA) * (180 / Math.PI);
  return (2 * ha) / 15;
}

// Moon phase (0–1, 0=new, 0.5=full) — synodic month approximation
function moonPhase(date) {
  // Known new moon: Jan 6, 2000 18:14 UTC
  const known = new Date(2000, 0, 6, 18, 14, 0);
  const diff = (date - known) / 86400000;
  const synodic = 29.53058770576;
  const phase = ((diff % synodic) + synodic) % synodic;
  return phase / synodic;
}

function moonPhaseName(phase) {
  if (phase < 0.0625) return "New Moon";
  if (phase < 0.1875) return "Waxing Crescent";
  if (phase < 0.3125) return "First Quarter";
  if (phase < 0.4375) return "Waxing Gibbous";
  if (phase < 0.5625) return "Full Moon";
  if (phase < 0.6875) return "Waning Gibbous";
  if (phase < 0.8125) return "Last Quarter";
  if (phase < 0.9375) return "Waning Crescent";
  return "New Moon";
}

// Moon phase SVG
function MoonIcon({ phase, size = 48 }) {
  const r = size / 2 - 2;
  const cx = size / 2;
  const cy = size / 2;
  // illumination fraction
  const illum = phase <= 0.5 ? phase * 2 : (1 - phase) * 2;
  const isWaxing = phase <= 0.5;
  // Approximate crescent using overlapping circles
  const k = (1 - 2 * Math.abs(illum - 0.5)) * r;
  const sweep = illum > 0.5 ? 1 : 0;
  const lightSide = isWaxing ? "right" : "left";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="#1a1a1a" />
      {illum > 0.02 && (
        <path
          d={lightSide === "right"
            ? `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${k} ${r} 0 0 ${sweep} ${cx} ${cy - r}`
            : `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${k} ${r} 0 0 ${1 - sweep} ${cx} ${cy - r}`
          }
          fill="#f5f0e8"
        />
      )}
    </svg>
  );
}

function formatTime(decimalHours) {
  const h = Math.floor(decimalHours);
  const m = Math.round((decimalHours - h) * 60);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

// ─── Known cities ───
const CITIES = [
  { name: "Freiburg", lat: 48.0, lon: 7.85, tz: 1 },
  { name: "London", lat: 51.5, lon: -0.13, tz: 0 },
  { name: "Nairobi", lat: -1.29, lon: 36.82, tz: 3 },
  { name: "Accra", lat: 5.56, lon: -0.19, tz: 0 },
  { name: "Addis Ababa", lat: 9.02, lon: 38.75, tz: 3 },
  { name: "Lagos", lat: 6.45, lon: 3.40, tz: 1 },
  { name: "Cape Town", lat: -33.93, lon: 18.42, tz: 2 },
  { name: "Dar es Salaam", lat: -6.79, lon: 39.28, tz: 3 },
  { name: "Mumbai", lat: 19.08, lon: 72.88, tz: 5.5 },
  { name: "Tokyo", lat: 35.68, lon: 139.69, tz: 9 },
  { name: "New York", lat: 40.71, lon: -74.01, tz: -5 },
  { name: "São Paulo", lat: -23.55, lon: -46.63, tz: -3 },
  { name: "Sydney", lat: -33.87, lon: 151.21, tz: 10 },
  { name: "Boulder", lat: 40.01, lon: -105.27, tz: -7 },
  { name: "Paris", lat: 48.86, lon: 2.35, tz: 1 },
  { name: "Dakar", lat: 14.69, lon: -17.44, tz: 0 },
  { name: "Kampala", lat: 0.35, lon: 32.58, tz: 3 },
  { name: "Custom…", lat: null, lon: null, tz: null },
];

// ─── Observation entry ───
function ObservationEntry({ onSave, existingEntries }) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [solarNoonObs, setSolarNoonObs] = useState("");
  const [pendulumCount, setPendulumCount] = useState("");
  const [moonObs, setMoonObs] = useState("");
  const [notes, setNotes] = useState("");

  const moonOptions = ["Did not observe", "New / not visible", "Thin crescent", "Half moon", "Gibbous (mostly lit)", "Full", "Unsure"];

  const save = () => {
    if (!solarNoonObs && !pendulumCount && !moonObs) return;
    onSave({ date, solarNoonObs, pendulumCount, moonObs, notes, savedAt: new Date().toISOString() });
    setSolarNoonObs("");
    setPendulumCount("");
    setMoonObs("");
    setNotes("");
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    fontSize: 14,
    fontFamily: "'IBM Plex Mono', monospace",
    border: `1px solid ${C.panelBorder}`,
    borderRadius: 4,
    background: C.bg,
    color: C.text,
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: 11,
    fontFamily: "'IBM Plex Mono', monospace",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: C.textDim,
    marginBottom: 4,
    marginTop: 14,
  };

  return (
    <div>
      <label style={labelStyle}>Date</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>Solar noon — clock time when shadow was shortest</label>
      <input type="text" placeholder="e.g. 12:34 or 12h 34m" value={solarNoonObs} onChange={(e) => setSolarNoonObs(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>Pendulum count in 60 seconds</label>
      <input type="text" placeholder="e.g. 58" value={pendulumCount} onChange={(e) => setPendulumCount(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>Moon appearance (evening)</label>
      <select value={moonObs} onChange={(e) => setMoonObs(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
        <option value="">— select —</option>
        {moonOptions.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>

      <label style={labelStyle}>Notes (weather, conditions, anything unusual)</label>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} style={{ ...inputStyle, resize: "vertical", fontFamily: "'Crimson Pro', Georgia, serif" }} placeholder="Cloudy, shadow edge unclear…" />

      <button onClick={save} style={{
        marginTop: 16, width: "100%", padding: "10px", fontSize: 12,
        fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600,
        textTransform: "uppercase", letterSpacing: "0.06em",
        background: C.amber, color: "#fff", border: "none", borderRadius: 4, cursor: "pointer",
      }}>
        Save Observation
      </button>

      {existingEntries.length > 0 && (
        <div style={{ marginTop: 16, fontSize: 12, color: C.textDim }}>
          {existingEntries.length} observation{existingEntries.length !== 1 ? "s" : ""} recorded in this session.
        </div>
      )}
    </div>
  );
}

// ─── Expected Sky pane ───
function ExpectedSky({ date, lat, lon, tz, hasObserved }) {
  const d = useMemo(() => new Date(date + "T12:00:00"), [date]);
  const eot = useMemo(() => equationOfTime(d), [d]);
  const noon = useMemo(() => solarNoon(d, lon, tz), [d, lon, tz]);
  const decl = useMemo(() => solarDeclination(d), [d]);
  const dayLen = useMemo(() => dayLength(d, lat), [d, lat]);
  const phase = useMemo(() => moonPhase(d), [d]);
  const phaseName = useMemo(() => moonPhaseName(phase), [phase]);

  if (!hasObserved) {
    return (
      <div style={{ padding: 24, textAlign: "center", color: C.textDim, fontStyle: "italic", lineHeight: 1.7 }}>
        <div style={{ fontSize: 28, marginBottom: 12, opacity: 0.3 }}>☀</div>
        <p>Enter your observation first.</p>
        <p style={{ fontSize: 13 }}>The expected sky will appear here after you save at least one measurement — so you can compare what you observed with what the model predicts.</p>
      </div>
    );
  }

  const row = (label, value, unit, note) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0", borderBottom: `1px solid ${C.surface}` }}>
      <div>
        <div style={{ fontSize: 13, color: C.textSecondary }}>{label}</div>
        {note && <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{note}</div>}
      </div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 16, fontWeight: 600, color: C.text }}>
        {value} <span style={{ fontSize: 11, fontWeight: 400, color: C.textDim }}>{unit}</span>
      </div>
    </div>
  );

  return (
    <div>
      {row("Solar noon (clock time)", formatTime(noon), "", "When the shadow should be shortest")}
      {row("Equation of time", (eot >= 0 ? "+" : "") + eot.toFixed(1), "min", "How much sundial time leads or lags clock time")}
      {row("Solar declination", (decl >= 0 ? "+" : "") + decl.toFixed(1), "°", decl > 0 ? "Sun is north of equator" : "Sun is south of equator")}
      {row("Daylight duration", dayLen.toFixed(1), "hours", "")}

      <div style={{ padding: "16px 0", borderBottom: `1px solid ${C.surface}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, color: C.textSecondary }}>Moon phase</div>
          <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>
            {phaseName} ({(phase * 100).toFixed(0)}% through cycle)
          </div>
        </div>
        <MoonIcon phase={phase} size={44} />
      </div>

      <div style={{ marginTop: 16, padding: 12, background: C.amberDim, borderRadius: 4, fontSize: 12, lineHeight: 1.6, color: C.textSecondary }}>
        <strong style={{ color: C.amber }}>Compare:</strong> Does your observed solar noon match {formatTime(noon)}? If it differs by a few minutes, that's normal — your measurement has uncertainty. If it differs by much more, check your gnomon alignment, your clock accuracy, or your longitude.
      </div>
    </div>
  );
}

// ─── Bigger Clock Network pane ───
function BiggerNetwork({ date, hasObserved }) {
  if (!hasObserved) {
    return (
      <div style={{ padding: 24, textAlign: "center", color: C.textDim, fontStyle: "italic", lineHeight: 1.7 }}>
        <div style={{ fontSize: 28, marginBottom: 12, opacity: 0.3 }}>🌍</div>
        <p>Available after you save your first observation.</p>
      </div>
    );
  }

  const card = (icon, title, body, color, bgColor) => (
    <div style={{ padding: 16, background: bgColor, border: `1px solid ${C.panelBorder}`, borderRadius: 6, marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, color }}>{title}</span>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.65, color: C.textSecondary }}>{body}</div>
    </div>
  );

  return (
    <div>
      <p style={{ fontSize: 13, lineHeight: 1.65, color: C.textSecondary, marginBottom: 16 }}>
        Your shadow measurement connects to the same Earth–Sun system that scientists track with extraordinary precision. Here is how your observation fits into the bigger picture.
      </p>

      {card("🌐", "Earth rotation and UT1", "Earth's rotation is not perfectly steady. Scientists measure its actual orientation using a quantity called UT1 — Universal Time based on Earth's angle. Your solar-noon measurement is, in essence, a local estimate of the same thing. The difference between UT1 and the atomic clock time UTC is currently tracked to microsecond precision by international observatories.", C.green, C.greenLight)}

      {card("📡", "How scientists track Earth rotation", "Very Long Baseline Interferometry (VLBI) uses radio telescopes separated by thousands of kilometres to observe distant quasars. By comparing the arrival times of signals at different telescopes — which is itself a clock comparison — scientists determine Earth's orientation and rotation speed. The International Earth Rotation and Reference Systems Service (IERS) publishes these results daily.", C.blue, C.blueLight)}

      {card("⏱", "Leap seconds and clock disagreement", "Because Earth's rotation is slightly irregular, atomic clocks and Earth clocks slowly disagree. Historically, leap seconds have been inserted to keep UTC within 0.9 seconds of UT1. This is a planetary-scale version of the same problem you encounter in Tier 0: two clocks that drift apart and need to be compared.", C.purple, C.purpleLight)}

      {card("🌙", "Lunar motion and ephemerides", "The Moon's orbit is predicted by mathematical models called ephemerides, computed from centuries of observations and gravitational theory. Your Moon-phase estimate by eye is a coarse version of the same measurement — and historically, lunar observations were one of humanity's first methods for long-period timekeeping.", C.amber, C.panel)}

      <div style={{ marginTop: 8, fontSize: 11, color: C.textDim, lineHeight: 1.6 }}>
        <strong>Sources:</strong> IERS Bulletin A/B (<a href="https://www.iers.org" style={{ color: C.blue }}>iers.org</a>), USNO Earth Orientation Parameters, JPL Horizons ephemeris system.
      </div>
    </div>
  );
}

// ─── Compare Cities ───
function CompareCity({ date, myCity, myLat, myLon, myTz }) {
  const [compareCity, setCompareCity] = useState(null);

  const d = useMemo(() => new Date(date + "T12:00:00"), [date]);
  const myNoon = useMemo(() => solarNoon(d, myLon, myTz), [d, myLon, myTz]);

  const otherCities = CITIES.filter((c) => c.name !== myCity && c.lat !== null);

  const otherNoon = useMemo(() => {
    if (!compareCity) return null;
    return solarNoon(d, compareCity.lon, compareCity.tz);
  }, [d, compareCity]);

  const otherDayLen = useMemo(() => {
    if (!compareCity) return null;
    return dayLength(d, compareCity.lat);
  }, [d, compareCity]);

  return (
    <div style={{ marginTop: 16, padding: 14, background: C.blueLight, border: `1px solid ${C.panelBorder}`, borderRadius: 6 }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: C.blue, marginBottom: 8 }}>Compare with another city</div>
      <select
        value={compareCity ? compareCity.name : ""}
        onChange={(e) => { const c = otherCities.find((x) => x.name === e.target.value); setCompareCity(c || null); }}
        style={{ width: "100%", padding: "6px 8px", fontSize: 13, border: `1px solid ${C.panelBorder}`, borderRadius: 4, background: "#fff" }}
      >
        <option value="">— select a city —</option>
        {otherCities.map((c) => <option key={c.name} value={c.name}>{c.name} ({c.lat.toFixed(1)}°, {c.lon.toFixed(1)}°)</option>)}
      </select>
      {compareCity && otherNoon !== null && (
        <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.65, color: C.textSecondary }}>
          <div>Solar noon in <strong>{compareCity.name}</strong>: <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{formatTime(otherNoon)}</span> (local clock)</div>
          <div>Daylight: <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{otherDayLen.toFixed(1)} h</span> vs your <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{dayLength(d, myLat).toFixed(1)} h</span></div>
          <div style={{ marginTop: 6, fontSize: 12, color: C.textDim }}>
            The difference in solar noon comes from longitude (east–west position) and time zone. The difference in daylight comes from latitude (north–south position) and season.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main App ───
export default function SkyCompanion() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]); // Freiburg default
  const [customLat, setCustomLat] = useState("");
  const [customLon, setCustomLon] = useState("");
  const [customTz, setCustomTz] = useState("");
  const [entries, setEntries] = useState([]);
  const [activePane, setActivePane] = useState(0);

  const isCustom = selectedCity.name === "Custom…";
  const lat = isCustom ? parseFloat(customLat) || 0 : selectedCity.lat;
  const lon = isCustom ? parseFloat(customLon) || 0 : selectedCity.lon;
  const tz = isCustom ? parseFloat(customTz) || 0 : selectedCity.tz;
  const cityName = isCustom ? "Custom" : selectedCity.name;

  const today = new Date().toISOString().slice(0, 10);
  const hasObserved = entries.length > 0;
  // Use the most recent observation date for model comparison, not always today
  const displayDate = hasObserved ? entries[entries.length - 1].date : today;

  const addEntry = useCallback((entry) => {
    setEntries((prev) => [...prev, { ...entry, city: cityName, lat, lon }]);
    setActivePane(1); // reveal Expected Sky after first observation
  }, [cityName, lat, lon]);

  const exportCSV = () => {
    if (entries.length === 0) return;
    const esc = (s) => '"' + String(s || "").replace(/"/g, '""') + '"';
    const header = "date,solar_noon_observed,pendulum_count,moon_observed,notes,city,latitude,longitude\n";
    const rows = entries.map((e) =>
      `${e.date},${esc(e.solarNoonObs)},${esc(e.pendulumCount)},${esc(e.moonObs)},${esc(e.notes)},${esc(e.city)},${e.lat},${e.lon}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sky-companion-log.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const panes = [
    { label: "My Notebook", icon: "📓", color: C.amber },
    { label: "Expected Sky", icon: "☀", color: C.green },
    { label: "Bigger Network", icon: "🌍", color: C.blue },
  ];

  const tabStyle = (i) => ({
    flex: 1, padding: "10px 8px", fontSize: 12,
    fontFamily: "'IBM Plex Mono', monospace", fontWeight: activePane === i ? 600 : 400,
    textTransform: "uppercase", letterSpacing: "0.04em", textAlign: "center",
    background: activePane === i ? C.panel : "transparent",
    color: activePane === i ? panes[i].color : C.textDim,
    border: "none", borderBottom: activePane === i ? `2px solid ${panes[i].color}` : "2px solid transparent",
    cursor: "pointer", transition: "all 0.15s",
  });

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Crimson Pro', Georgia, serif", color: C.text }}>
      {/* Nav */}
      <div style={{ background: "#1a1a1a", padding: "6px 20px", display: "flex", gap: 16, fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}>
        <a href="../index.html" style={{ color: C.slate400, textDecoration: "none" }}>Home</a>
        <a href="index.html" style={{ color: C.slate400, textDecoration: "none" }}>Observe</a>
        <a href="../build/index.html" style={{ color: C.slate400, textDecoration: "none" }}>Build</a>
        <a href="../simulate/index.html" style={{ color: C.slate400, textDecoration: "none" }}>Simulate</a>
        <a href="../explore/index.html" style={{ color: C.slate400, textDecoration: "none" }}>Explore</a>
        <a href="../teachers/index.html" style={{ color: C.slate400, textDecoration: "none" }}>Teachers</a>
      </div>

      {/* Header */}
      <div style={{ background: C.slate900, color: "#fff", padding: "16px 20px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: C.amberLight, marginBottom: 4 }}>Tier 0 · Clock School</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Sky Companion</h1>
          <p style={{ fontSize: 13, color: C.slate400, margin: "4px 0 0", lineHeight: 1.5 }}>
            A field notebook for comparing your observations with the expected sky.
          </p>
        </div>
      </div>

      {/* Location selector */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.panelBorder}`, padding: "10px 20px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.textDim }}>Location:</span>
          <select
            value={selectedCity.name}
            onChange={(e) => setSelectedCity(CITIES.find((c) => c.name === e.target.value))}
            style={{ padding: "5px 8px", fontSize: 13, border: `1px solid ${C.panelBorder}`, borderRadius: 4, background: "#fff" }}
          >
            {CITIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
          {isCustom && (
            <>
              <input type="number" placeholder="Lat" value={customLat} onChange={(e) => setCustomLat(e.target.value)} style={{ width: 70, padding: "5px 6px", fontSize: 12, border: `1px solid ${C.panelBorder}`, borderRadius: 4 }} />
              <input type="number" placeholder="Lon" value={customLon} onChange={(e) => setCustomLon(e.target.value)} style={{ width: 70, padding: "5px 6px", fontSize: 12, border: `1px solid ${C.panelBorder}`, borderRadius: 4 }} />
              <input type="number" placeholder="TZ ±h" value={customTz} onChange={(e) => setCustomTz(e.target.value)} style={{ width: 60, padding: "5px 6px", fontSize: 12, border: `1px solid ${C.panelBorder}`, borderRadius: 4 }} />
            </>
          )}
          {!isCustom && (
            <span style={{ fontSize: 11, color: C.textDim, fontFamily: "'IBM Plex Mono', monospace" }}>
              {Math.abs(lat).toFixed(1)}{"\u00B0"}{lat >= 0 ? "N" : "S"}, {Math.abs(lon).toFixed(1)}{"\u00B0"}{lon >= 0 ? "E" : "W"}, UTC{tz >= 0 ? "+" : ""}{tz}
            </span>
          )}
        </div>
        <div style={{ maxWidth: 600, margin: "2px auto 0", fontSize: 10, color: C.textDim, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.02em" }}>
          Timezone offsets are fixed approximations. Daylight saving time is not included.
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", borderBottom: `1px solid ${C.panelBorder}`, background: C.bg }}>
        {panes.map((p, i) => (
          <button key={i} onClick={() => setActivePane(i)} style={tabStyle(i)}>
            {p.icon} {p.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 20px 40px" }}>
        <div style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 6, padding: 20, minHeight: 300 }}>
          {activePane === 0 && (
            <>
              <ObservationEntry onSave={addEntry} existingEntries={entries} />
              {entries.length > 0 && (
                <div style={{ marginTop: 20, borderTop: `1px solid ${C.surface}`, paddingTop: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, textTransform: "uppercase", color: C.textDim }}>Saved observations</span>
                    <button onClick={exportCSV} style={{ padding: "4px 10px", fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", background: C.surface, color: C.textDim, border: `1px solid ${C.panelBorder}`, borderRadius: 3, cursor: "pointer" }}>Export CSV</button>
                  </div>
                  {entries.map((e, i) => (
                    <div key={i} style={{ padding: "8px 0", borderBottom: `1px solid ${C.surface}`, fontSize: 13 }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: C.textDim }}>{e.date}</span>
                      {e.solarNoonObs && <span style={{ marginLeft: 12 }}>☀ {e.solarNoonObs}</span>}
                      {e.pendulumCount && <span style={{ marginLeft: 12 }}>🔔 {e.pendulumCount} swings</span>}
                      {e.moonObs && e.moonObs !== "Did not observe" && <span style={{ marginLeft: 12 }}>🌙 {e.moonObs}</span>}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activePane === 1 && (
            <>
              <ExpectedSky date={displayDate} lat={lat} lon={lon} tz={tz} hasObserved={hasObserved} />
              {hasObserved && <CompareCity date={displayDate} myCity={cityName} myLat={lat} myLon={lon} myTz={tz} />}
            </>
          )}

          {activePane === 2 && (
            <BiggerNetwork date={displayDate} hasObserved={hasObserved} />
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.panelBorder}`, padding: "12px 20px", fontSize: 11, color: C.textDim, textAlign: "center", fontFamily: "'IBM Plex Mono', monospace" }}>
        <a href="../index.html" style={{ color: C.textDim, textDecoration: "none" }}>Clock School</a> — What Is a Clock? · Sky Companion v0.1 · Astronomical calculations are approximate (Spencer 1971, synodic month) · Not a precision ephemeris
      </div>
    </div>
  );
}
