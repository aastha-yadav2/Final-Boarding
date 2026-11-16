# User Guide: FINAL BOARDING Control Interface

Welcome to **FINAL BOARDING**. This operational guide details every user interaction, control, and workflow supported in the application.

---

## 1. Opening the Dashboard (Control Tower)

1. Launch the application in your browser (default local address: `http://localhost:5173/`).
2. The **Airport Ticker** at the top displays the live UTC clock and operational telemetry.
3. The **Control Tower** tab opens by default, featuring the live split-flap countdown.

---

## 2. Reading the Live Countdown & Telemetry

- **Countdown Digits:** Ticking split-flap displays show **DAYS**, **HOURS**, **MINUTES**, and **SECONDS** until the scheduled deadline.
- **Flight Departed State:** When the deadline passes, the timer switches to an alert state reading *"FLIGHT HAS DEPARTED"*, instructing you to review Recovery Mode or extend the deadline in Settings.
- **Flight Progress (%):** Displays overall progress derived from departed milestones (`DONE`).
- **Gate Clearance:** Shows the ratio of completed milestones versus total milestones (e.g., `1 / 5`).
- **Crew Missions (%):** Tracks daily task completion rate.
- **Control Status:** Visual summary indicator displaying `ON SCHEDULE` (green), `NOW BOARDING` (amber), or `FLIGHT(S) DELAYED` (red).

---

## 3. Managing Milestone Gates (Flight Board)

1. Click on the **FLIGHT BOARD** tab in the navigation bar.
2. **Visual Runway Timeline:** View all 5 milestone nodes. Completed gates glow cyan, delayed gates pulse red, and active gates glow amber.
3. **Filtering Gates:** Click filter pills (`ALL`, `ON TIME`, `IN PROGRESS`, `DELAYED`, `DONE`, `REBOOKED`) to isolate specific gates.
4. **Marking a Gate Complete (Departed):**
   - Click **BOARD & DEPART (DONE)** on any milestone card.
   - The status updates to `DONE`, an airport celebration chime plays, and celebratory confetti bursts across the screen.
5. **Editing Milestone Details:**
   - Click the **pencil icon** on the milestone card to open the **Gate Modification Modal**.
   - Modify the title, flight callsign, departure date/time, status, gate ID, terminal, description, or required deliverable.
   - Click **Save Changes**.
6. **Rescheduling a Delayed Flight:**
   - Click the **RESCHEDULE** button on any delayed milestone card.
   - Select the new departure date and input a brief rebooking rationale.
   - Click **Confirm Rebooking**. The milestone updates to `REBOOKED` status with the prior departure date preserved for reference.

---

## 4. Executing Daily Missions (Crew Directives)

1. Navigate to the **DAILY MISSIONS** tab.
2. **Dispatching a New Mission:**
   - Click the **New Mission Task** button.
   - Enter the task directive (e.g., *"Perform cross-browser check"*).
   - Select a Flight Category (`PRE-FLIGHT`, `AVIONICS`, `PAYLOAD`, `QUALITY`, `FINAL RUNWAY`).
   - Assign a Priority Tier (`CRITICAL`, `STANDARD`, `ROUTINE`).
   - Set an optional target completion date and time.
   - Click **Log Mission**.
3. **Completing a Directive:**
   - Click the square checkbox or title of any task.
   - The task strikes through, plays a tactile flip-click sound, and increases the daily crew completion rate.
4. **Editing or Deleting a Task:**
   - Click the **pencil icon** to update task details.
   - Click the **trash icon** to trigger the confirmation modal and remove the task.

---

## 5. Navigating Recovery Radar (Disruption Mitigation)

1. Click on the **RECOVERY RADAR** tab (or click the red alert banner on the dashboard if delays exist).
2. **Radar Sweep:** The radar automatically displays:
   - Total number of delayed gates.
   - Total number of missed/overdue tasks.
3. **Immediate Unblocking Directive:** Spotlights the highest-priority critical task to tackle immediately to clear runway friction.
4. **Disrupted Flight Triage:** Lists all delayed milestones with direct access to the **Reschedule Flight** desk.
5. **Overdue Mission Tasks:** Displays all incomplete tasks past their due date to ensure no missed item is lost.

---

## 6. Configuring Avionics & Settings

1. Click the **AVIONICS CONFIG** button in the header (or select **GATE SETTINGS** in the navigation bar).
2. **Project Identity:** Edit Project Title, Callsign, Tagline, and Hackathon Event Name.
3. **Deadline Target:** Adjust the final wheels-up departure date and time. The countdown immediately recalculates.
4. **Feature Toggles:** Enable or disable audio chimes, split-flap display styles, or strict recovery mode.
5. **Factory Reset:** Click **Reset Defaults** and confirm in the safety modal to restore default mock data.

---

## 7. Audio Controls

- Toggle the speaker icon button in the header at any time to mute or unmute terminal audio chimes.

