# Testing Strategy & QA Verification: FINAL BOARDING

---

## 1. Overview & Quality Standards

To maintain airport-grade precision, **FINAL BOARDING** relies on strict static analysis, unit arithmetic validation, manual edge-case testing, and production build verification.

---

## 2. Test Verification Matrix

### A. Static Type Safety & Build Verification
- **Command:** `npm run build` (`tsc -b && vite build`)
- **Verification Criteria:**
  - Zero TypeScript compiler warnings or errors.
  - Strict checking on unused locals (`noUnusedLocals: true`) and unused parameters (`noUnusedParameters: true`).
  - Production bundle compilation completes under 10 seconds.

### B. Countdown & Timezone Arithmetic Testing
- **Test Scenarios:**
  1. **Standard Countdown:** Set target deadline 5 days into future; verify days, hours, minutes, and seconds decrement smoothly every 1000ms.
  2. **Zero Boundary / Elapsed Time:** Set deadline to a past date; verify that timer does not display negative numbers and immediately renders the *"FLIGHT HAS DEPARTED"* state.
  3. **Daylight Saving / Timezone Transition:** Verify ISO-8601 timestamp parsing handles local device offsets without drift.

### C. State Persistence Testing
- **Test Scenarios:**
  1. Add 3 new crew mission tasks and mark 1 complete.
  2. Reload page (`F5`); verify task list and progress bar preserve identical state.
  3. Edit a milestone title and reschedule date; reload page and verify persistence in `fb_milestones`.
  4. Trigger **Reset Defaults** in Settings; verify local storage re-seeds default data.

### D. Recovery Radar Diagnostic Verification
- **Test Scenarios:**
  1. Mark Milestone 2 as `DELAYED`; verify dashboard immediately surfaces the red flight alert banner.
  2. Navigate to **Recovery Radar**; verify Milestone 2 is quarantined with a direct **Reschedule Flight** button.
  3. Reschedule the milestone; verify status changes to `REBOOKED` and the alert banner clears.

### E. Web Audio Synthesizer Verification
- **Test Scenarios:**
  1. Verify two-tone chime triggers on milestone completion and sound toggle.
  2. Verify audio cleanly respects the mute toggle state without console exceptions.
  3. Verify audio handles browser autoplay restrictions gracefully prior to initial user click.
