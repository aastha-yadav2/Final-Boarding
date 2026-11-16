# Known Limitations: FINAL BOARDING v1.0.0

The following technical limitations exist in the current v1.0.0 client release:

---

## 1. Single-Device Local Storage (No Cross-Device Sync)
- **Description:** Application data is stored solely in browser `window.localStorage`. Tasks or milestones created on a desktop browser will not automatically synchronize to a mobile browser or team member's device.
- **Future Solution:** A backend synchronization layer with end-to-end encryption or lightweight sync tokens is planned for v2.0.

---

## 2. Fixed 5-Milestone Structure
- **Description:** The current UI and flight board layout are optimized specifically for the 5-phase delivery model (Flight Plan, System Ready, MVP Departure, Quality Check, Final Departure). Users cannot currently dynamically add a 6th or 7th milestone gate without modifying the source code.
- **Workaround:** Users can customize the titles, descriptions, and dates of the existing 5 gates to represent any project phase.

---

## 3. Web Audio Autoplay Policy
- **Description:** Modern browsers (Chrome, Safari, Firefox) prevent web audio from playing automatically without prior user interaction.
- **Impact:** The airport announcement chime will not play on initial page load until the user clicks anywhere on the page (e.g., clicking the audio toggle or switching tabs).

---

## 4. LocalStorage Quota Bounds
- **Description:** Browsers typically restrict `localStorage` to approximately 5MB per domain.
- **Impact:** While FINAL BOARDING's state requires only a few kilobytes, users cannot attach large binary files or images directly to milestone deliverables. Deliverables are recorded as text descriptors or external URLs.

---

## 5. Flagsmith Remote Connection
- **Description:** The feature flags interface is implemented as a local client-side abstraction (`useFeatureFlags.ts`). It is prepared for Flagsmith integration, but does not yet connect to an active remote Flagsmith cloud instance.

