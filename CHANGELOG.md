# Changelog

All notable changes to **FINAL BOARDING** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-11-16

### Added
- **Control Tower Dashboard:**
  - Live split-flap style countdown timer displaying days, hours, minutes, and seconds.
  - Project telemetry metrics for overall flight completion, gate clearance, and daily mission completion.
  - Spotlight card for immediate upcoming milestone departure.
  - Gate departure snapshot table showing all 5 flight schedules.
- **Flight Board (Milestones Management):**
  - Interactive runway timeline connecting the 5 hackathon milestones.
  - Support for milestone lifecycle states: `ON TIME`, `IN PROGRESS`, `DELAYED`, `DONE`, and `REBOOKED`.
  - Gate edit modal for customizing titles, deliverables, descriptions, gates, and dates.
  - Dedicated flight rebooking modal to reschedule delayed milestones with documented rationale.
- **Crew Missions (Daily Tasks):**
  - Full CRUD task management for pre-flight, avionics, payload, quality, and final runway categories.
  - Real-time task completion progress gauge.
  - Priority flags (`CRITICAL`, `STANDARD`, `ROUTINE`).
  - Empty states with guided action triggers.
- **Recovery Radar:**
  - Automatic detection of overdue gates and delayed milestones.
  - Immediate unblocking directive recommendation.
  - Overdue task triage list preventing silent work loss.
- **Avionics Settings & Feature Flags Architecture:**
  - Editable project title, tagline, callsign, hackathon event name, and deadline.
  - Factory reset to defaults with confirmation dialog.
  - Client-side feature flag abstraction prepared for future Flagsmith remote experimentation.
- **Audio Synthesizer Engine:**
  - Web Audio API synthesizer generating airport two-tone announcement chimes, flip clicks, and celebration tones with zero external audio assets.
- **Visual Design Identity:**
  - Custom glassmorphism aesthetic using Midnight Black (`#0B0C0E`), Airport Amber (`#FFB000`), Warm Cream (`#EDE8DC`), and Muted Slate (`#8E929B`).

