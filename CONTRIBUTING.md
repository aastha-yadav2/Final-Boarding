# Contributing to FINAL BOARDING

Thank you for your interest in contributing to **FINAL BOARDING**! We welcome contributions to help improve this airport-terminal-inspired project execution platform.

---

## Code of Conduct

All contributors are expected to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md). Please read it before participating in discussions or submitting pull requests.

---

## How Can I Contribute?

### 1. Reporting Bugs
- Check the [existing issues](https://github.com/aastha-yadav2/Final-Boarding/issues) to ensure the bug has not already been reported.
- Use our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md).
- Include detailed steps to reproduce, browser version, expected behavior, and console logs or screenshots.

### 2. Suggesting Features
- Propose feature suggestions using the [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md).
- Outline the user problem, proposed departure-board solution, and UX considerations.

### 3. Code Contributions

#### Branch Naming Conventions
- `feat/feature-name` (e.g., `feat/flagsmith-sdk-integration`)
- `fix/bug-name` (e.g., `fix/countdown-timezone-offset`)
- `docs/documentation-update` (e.g., `docs/update-architecture-flow`)
- `refactor/component-name` (e.g., `refactor/split-flap-display`)

#### Commit Message Guidelines (Conventional Commits)
We adhere to [Conventional Commits](https://www.conventionalcommits.org/):
- `feat: add sound synthesis volume slider`
- `fix: prevent negative countdown tick when deadline passes`
- `docs: update system architecture diagram`
- `refactor: extract countdown calculation into custom hook`
- `style: adjust airport amber contrast for accessibility`

---

## Local Development Workflow

1. **Fork & Clone:**
   ```bash
   git clone https://github.com/aastha-yadav2/Final-Boarding.git
   cd Final-Boarding
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Verify Type Safety & Build:**
   ```bash
   npm run build
   ```
   *Ensure `tsc -b` passes with zero TypeScript warnings or errors.*

---

## Pull Request Process

1. Create a pull request against the `main` branch.
2. Fill out all sections of the [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md).
3. Ensure no unnecessary dependencies are introduced.
4. Verify cross-browser and mobile responsive styling.
5. Once submitted, project maintainers will review your PR and provide constructive feedback.
