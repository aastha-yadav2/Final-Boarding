# Security Policy

## Supported Versions

Only the latest release on the `main` branch of FINAL BOARDING is currently supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Architecture & Threat Model

FINAL BOARDING is a client-side single-page application (SPA):
1. **Local Storage Isolation:** All project settings, milestones, and daily mission tasks are stored locally in the user's browser `window.localStorage`.
2. **No Remote Data Exfiltration:** The current application does not transmit tasks, titles, or dates to any external backend server or third-party tracking service.
3. **No Credential Ingestion:** The application does not require or store user passwords, tokens, or private API keys.

## Reporting a Vulnerability

If you discover a security vulnerability or potential data leak in FINAL BOARDING:

1. **Do not create a public issue.**
2. Report the vulnerability privately to the repository maintainer through GitHub Security Advisories or by contacting the repository owner at `https://github.com/aastha-yadav2/Final-Boarding`.
3. Include:
   - A description of the vulnerability and its potential impact.
   - Exact steps or code snippet to reproduce.
   - Any recommended remediation steps.

Maintainers will review the submission, reproduce the issue, and release a fix as soon as possible.

