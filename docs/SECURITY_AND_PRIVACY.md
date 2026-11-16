# Security & Privacy Policy: FINAL BOARDING

---

## 1. Data Privacy & Local-First Model

FINAL BOARDING v1.0.0 is an offline-first single-page application. We respect user privacy by minimizing external data collection:

- **No Remote Telemetry or Tracking:** Your task titles, project deadlines, milestone deliverables, and notes are never sent to external servers, analytics engines, or third-party trackers.
- **Client-Side Storage:** All user data is stored exclusively in your browser's `window.localStorage` under the origin where the app is hosted.
- **No Third-Party Cookies:** The application uses zero marketing cookies, zero advertising trackers, and zero third-party session beacons.

---

## 2. Stored Data Inventory

The following items are persisted locally on your device:

1. **`fb_project_settings`:** Project title, tagline, hackathon event name, departure deadline, and sound preferences.
2. **`fb_milestones`:** The 5 milestone flight codes, titles, dates, descriptions, deliverables, and statuses.
3. **`fb_crew_tasks`:** Daily task directives, categories, priorities, due dates, and completion timestamps.
4. **`fb_feature_flags`:** Client-side feature flag preference overrides.

---

## 3. Data Cleansing & Reset

You have full control over your data at all times:
- **Factory Reset:** Inside **Avionics Config**, click **Reset Defaults** to clear all stored data and re-initialize the application with default mock data.
- **Manual Purge:** You can completely clear your stored data by clearing site data in your browser developer tools (`Application > Local Storage > Clear`).

---

## 4. Responsible Disclosure

If you believe you have discovered a security defect or potential client-side vulnerability in FINAL BOARDING, please report it via private disclosure as outlined in [SECURITY.md](../SECURITY.md).
