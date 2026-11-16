# Frequently Asked Questions (FAQ)

---

### 1. Where is my project data stored?
All data (milestones, daily tasks, settings, and flags) is saved directly in your web browser's `window.localStorage`. It never leaves your device and requires no backend server.

---

### 2. What happens if I refresh or close my browser?
Your state is automatically preserved. The next time you open the application in the same browser, your exact milestones, checklist tasks, and countdown targets will reload seamlessly.

---

### 3. How does the countdown handle different timezones?
Dates and deadlines are stored as standardized ISO-8601 strings (e.g., `2026-11-29T23:59:00`). When calculating the remaining duration, the countdown compares the absolute epoch timestamp against `Date.now()`, ensuring accurate millisecond precision regardless of your local timezone.

---

### 4. Can I change the milestone titles, dates, or add more milestones?
- **Editing:** Yes! Click the pencil edit icon on any milestone card to customize its title, scheduled date/time, deliverable, and gate number.
- **Adding more:** In the current v1.0 release, the UI is optimized for a 5-phase delivery lifecycle. You can re-purpose any of the 5 gates for your specific project needs.

---

### 5. How do I mute or unmute the audio effects?
Click the speaker icon in the top header. You can also permanently toggle audio chimes inside the **Avionics Config** modal.

---

### 6. What does Recovery Radar do?
Recovery Radar scans your project for any milestones that have slipped past their scheduled date or are marked `DELAYED`. It prevents silent failure by isolating disrupted gates and providing a dedicated **Flight Rebooking Desk** where you must set a revised departure date with a clear mitigation rationale.

---

### 7. Is Flagsmith connected to a live server right now?
In version 1.0.0, the feature flag architecture is implemented as an integration-ready client-side layer (`useFeatureFlags.ts`). It simulates and supports local flag toggles in the settings panel and is designed for drop-in connection to the official Flagsmith SDK in the upcoming release.

---

### 8. How do I reset the application back to the default hackathon data?
Open **Avionics Config** (via the header button or Settings tab), scroll to the bottom, and click **Reset Defaults**. Confirm the prompt in the modal to restore the original hackathon milestones and tasks.
